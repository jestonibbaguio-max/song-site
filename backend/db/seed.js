const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const sources = [
  { type: 'journey', file: 'tasks.json' },
  { type: 'training', file: 'training-tasks.json' },
];

function nullable(value) {
  return value === '' || value === undefined ? null : value;
}

async function seed() {
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    await client.query('BEGIN');

    for (const source of sources) {
      const tasks = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', source.file), 'utf8'),
      );

      for (const [index, task] of tasks.entries()) {
        await client.query(
          `INSERT INTO tasks (
             task_type, title, description, url, status, progress,
             start_date, end_date, started_at, completed_at,
             actual_duration_minutes, sort_order
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             ON CONFLICT (task_type, sort_order) DO NOTHING`,
          [
            source.type,
            task.title,
            nullable(task.description),
            nullable(task.url),
            task.status || 'Not Started',
            task.progress || 0,
            nullable(task.startDate),
            nullable(task.endDate),
            nullable(task.startedAt),
            nullable(task.completedAt),
            nullable(task.actualDuration),
            index + 1,
          ],
        );

        const taskResult = await client.query(
          `SELECT id
             FROM tasks
            WHERE task_type = $1 AND sort_order = $2`,
          [source.type, index + 1],
        );
        const taskId = taskResult.rows[0]?.id;

        if (!taskId) {
          throw new Error(`Unable to find seeded ${source.type} task ${index + 1}`);
        }

        for (const [linkIndex, link] of (task.externalLinks || []).entries()) {
          await client.query(
            `INSERT INTO task_links (task_id, link_text, url, sort_order)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (task_id, sort_order) DO NOTHING`,
            [taskId, link.text, link.url, linkIndex + 1],
          );
        }
      }
    }

    await client.query(
      `INSERT INTO user_task_progress (user_id, task_id, status, progress)
       SELECT users.id, tasks.id, tasks.status, tasks.progress
         FROM users
         CROSS JOIN tasks
       ON CONFLICT (user_id, task_id) DO NOTHING`,
    );

    await client.query('COMMIT');
    console.log('Seeded tasks, task links, and user task progress.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});