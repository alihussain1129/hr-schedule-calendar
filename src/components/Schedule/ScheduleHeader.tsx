import type { ViewMode } from '../../types/schedule';
import { formatHeaderDate } from '../../utils/dateUtils';

interface ScheduleHeaderProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onDateChange: (date: Date) => void;
  onCreateClick: () => void;
  onNavigate: (direction: -1 | 1) => void;
}

const views: { id: ViewMode; label: string }[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'years', label: 'Years' },
];

export function ScheduleHeader({
  currentDate,
  viewMode,
  onViewChange,
  onDateChange,
  onCreateClick,
  onNavigate,
}: ScheduleHeaderProps) {
  return (
    <header className="schedule-header">
      <div className="schedule-header__left">
        <button
          type="button"
          className="schedule-header__nav"
          onClick={() => onNavigate(-1)}
          aria-label="Previous"
        >
          ‹
        </button>
        <label className="schedule-header__date">
          <span className="sr-only">Select date</span>
          <input
            type="date"
            value={currentDate.toISOString().split('T')[0]}
            onChange={(e) => onDateChange(new Date(e.target.value + 'T12:00:00'))}
          />
          <span className="schedule-header__date-display">
            {formatHeaderDate(currentDate)}
          </span>
        </label>
        <button
          type="button"
          className="schedule-header__nav"
          onClick={() => onNavigate(1)}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      <div className="schedule-header__views" role="group" aria-label="View mode">
        {views.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`schedule-header__view-btn ${viewMode === id ? 'schedule-header__view-btn--active' : ''}`}
            onClick={() => onViewChange(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="schedule-header__create"
        onClick={onCreateClick}
      >
        + Create schedule
      </button>
    </header>
  );
}
