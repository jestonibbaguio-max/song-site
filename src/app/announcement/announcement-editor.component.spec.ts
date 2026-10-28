import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionService } from '../auth/session.service';
import { AnnouncementPageContent, AnnouncementService, ContentVersion } from './announcement.service';
import { AnnouncementEditorComponent } from './announcement-editor.component';

describe('AnnouncementEditorComponent', () => {
  let fixture: ComponentFixture<AnnouncementEditorComponent>;
  let service: {
    getDraft: ReturnType<typeof vi.fn>;
    getVersions: ReturnType<typeof vi.fn>;
    saveDraft: ReturnType<typeof vi.fn>;
    preview: ReturnType<typeof vi.fn>;
    publish: ReturnType<typeof vi.fn>;
    discard: ReturnType<typeof vi.fn>;
    restore: ReturnType<typeof vi.fn>;
  };

  const payload: AnnouncementPageContent = {
    schemaVersion: 1,
    hero: { title: 'Announcements', body: 'Demo body' },
    carousel: [],
    trainings: [],
    notices: [],
    reminder: { title: 'Reminder', body: 'Demo reminder' },
  };
  const published: ContentVersion = {
    id: 1,
    version: 1,
    state: 'published',
    payload,
    authoredBy: 'demo',
    createdAt: '2026-10-28T00:00:00.000Z',
  };
  const draft: ContentVersion = {
    ...published,
    id: 2,
    version: 2,
    state: 'draft',
  };

  beforeEach(async () => {
    service = {
      getDraft: vi.fn(async () => null),
      getVersions: vi.fn(async () => [published]),
      saveDraft: vi.fn(),
      preview: vi.fn(),
      publish: vi.fn(),
      discard: vi.fn(),
      restore: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AnnouncementEditorComponent],
      providers: [
        { provide: SessionService, useValue: { session: signal({
          mode: 'development',
          authenticated: true,
          identity: {
            displayName: 'Local Administrator',
            role: 'administrator',
            permissions: ['content:announcement-page:publish'],
          },
        }).asReadonly() } },
        { provide: AnnouncementService, useValue: service },
      ],
    }).compileComponents();
  });

  async function createComponent(): Promise<void> {
    fixture = TestBed.createComponent(AnnouncementEditorComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('disables Publish until an unpublished draft has been saved', async () => {
    await createComponent();

    const publishButton = fixture.nativeElement.querySelector('.publish') as HTMLButtonElement;
    expect(publishButton.disabled).toBe(true);
    expect(service.publish).not.toHaveBeenCalled();
  });

  it('allows an authorized publisher to publish an existing saved draft', async () => {
    service.getDraft.mockResolvedValue(draft);
    service.getVersions.mockResolvedValue([published, draft]);
    await createComponent();
    await vi.waitFor(() => expect(fixture.componentInstance.hasSavedDraft()).toBe(true));
    fixture.detectChanges();

    expect(fixture.componentInstance.canPublish()).toBe(true);
    const publishButton = fixture.nativeElement.querySelector('.publish') as HTMLButtonElement;
    expect(publishButton.disabled).toBe(false);
  });
});
