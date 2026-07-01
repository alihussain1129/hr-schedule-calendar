import { useCallback, useState } from 'react';
import { initialEvents } from '../../data/scheduleData';
import type { ScheduleEvent, ViewMode } from '../../types/schedule';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
} from '../../utils/dateUtils';
import { ScheduleGrid } from './ScheduleGrid';
import { ScheduleHeader } from './ScheduleHeader';
import './ScheduleCalendar.css';

export function ScheduleCalendar() {
  const [currentDate, setCurrentDate] = useState(
    () => new Date(2025, 1, 12),
  );
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSlot, setDraftSlot] = useState<Date | null>(null);

  const navigate = useCallback(
    (direction: -1 | 1) => {
      setCurrentDate((prev) => {
        switch (viewMode) {
          case 'day':
            return addDays(prev, direction);
          case 'week':
            return addWeeks(prev, direction);
          case 'month':
            return addMonths(prev, direction);
          case 'years':
            return addYears(prev, direction);
        }
      });
    },
    [viewMode],
  );

  const openCreate = (slot?: Date) => {
    setDraftSlot(slot ?? currentDate);
    setDraftTitle('');
    setShowModal(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftSlot) return;

    const start = new Date(draftSlot);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    const newEvent: ScheduleEvent = {
      id: crypto.randomUUID(),
      title: draftTitle.trim(),
      start,
      end,
      dayIndex: (start.getDay() + 6) % 7,
      icon: 'calendar',
      description: 'Newly created schedule event.',
      actionLabel: 'Join Meeting Room',
      actionType: 'meeting',
    };

    setEvents((prev) => [...prev, newEvent]);
    setShowModal(false);
  };

  return (
    <section className="schedule-calendar">
      <ScheduleHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewChange={setViewMode}
        onDateChange={setCurrentDate}
        onCreateClick={() => openCreate()}
        onNavigate={navigate}
      />

      <ScheduleGrid
        currentDate={currentDate}
        viewMode={viewMode}
        events={events}
        onSlotClick={openCreate}
      />

      {showModal && (
        <div
          className="schedule-modal-backdrop"
          onClick={() => setShowModal(false)}
          role="presentation"
        >
          <dialog
            open
            className="schedule-modal"
            onClick={(e) => e.stopPropagation()}
            aria-labelledby="create-schedule-title"
          >
            <h2 id="create-schedule-title">Create schedule</h2>
            <form onSubmit={handleCreate}>
              <label className="schedule-modal__field">
                Title
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="Event title"
                  autoFocus
                  required
                />
              </label>
              {draftSlot && (
                <p className="schedule-modal__slot">
                  {draftSlot.toLocaleString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
              <div className="schedule-modal__actions">
                <button
                  type="button"
                  className="schedule-modal__cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="schedule-modal__submit">
                  Create
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </section>
  );
}
