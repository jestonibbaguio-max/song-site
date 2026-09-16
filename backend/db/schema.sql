CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id VARCHAR(255) UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  task_type VARCHAR(30) NOT NULL CHECK (task_type IN ('journey', 'training')),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(500),
  status VARCHAR(30) NOT NULL DEFAULT 'Not Started'
    CHECK (status IN ('Not Started', 'Pending', 'In Progress', 'Completed')),
  progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  start_date DATE,
  end_date DATE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  actual_duration_minutes INTEGER CHECK (actual_duration_minutes >= 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_type_order
  ON tasks (task_type, sort_order);

CREATE UNIQUE INDEX IF NOT EXISTS uq_tasks_type_order
  ON tasks (task_type, sort_order);

CREATE TABLE IF NOT EXISTS task_links (
  id BIGSERIAL PRIMARY KEY,
  task_id BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  link_text VARCHAR(255) NOT NULL,
  url VARCHAR(1000) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (task_id, sort_order)
);

CREATE INDEX IF NOT EXISTS idx_task_links_task
  ON task_links (task_id, sort_order);

CREATE TABLE IF NOT EXISTS user_task_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  task_id BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'Not Started'
    CHECK (status IN ('Not Started', 'Pending', 'In Progress', 'Completed')),
  progress SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  start_date DATE,
  end_date DATE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  actual_duration_minutes INTEGER CHECK (actual_duration_minutes >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, task_id)
);

CREATE INDEX IF NOT EXISTS idx_user_task_progress_user
  ON user_task_progress (user_id);

CREATE INDEX IF NOT EXISTS idx_user_task_progress_user_status
  ON user_task_progress (user_id, status);