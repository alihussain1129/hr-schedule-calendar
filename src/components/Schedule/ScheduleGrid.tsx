import type { ScheduleEvent, ViewMode } from '../../types/schedule';
import {
  END_HOUR,
  HOUR_HEIGHT,
  START_HOUR,
  eventHeight,
  eventTop,
  formatDayLabel,
  getMonthDays,
  getWeekDays,
  getYearsRange,
  isSameDay,
} from '../../utils/dateUtils';
import { ScheduleEventCard } from './ScheduleEventCard';

interface ScheduleGridProps {
  currentDate: Date;
  viewMode: ViewMode;
  events: ScheduleEvent[];
  onSlotClick?: (date: Date) => void;
}

function formatHour(hour: number): string {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

const hours = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => START_HOUR + i,
);

export function ScheduleGrid({
  currentDate,
  viewMode,
  events,
  onSlotClick,
}: ScheduleGridProps) {
  if (viewMode === 'years') {
    const years = getYearsRange(currentDate);
    return (
      <div className="schedule-years">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            className={`schedule-years__item ${year === currentDate.getFullYear() ? 'schedule-years__item--active' : ''}`}
          >
            {year}
          </button>
        ))}
      </div>
    );
  }

  if (viewMode === 'month') {
    const days = getMonthDays(currentDate);
    const monthName = currentDate.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="schedule-month">
        <h2 className="schedule-month__title">{monthName}</h2>
        <div className="schedule-month__grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="schedule-month__weekday">
              {d}
            </div>
          ))}
          {Array.from({ length: (days[0].getDay() + 6) % 7 }).map((_, i) => (
            <div key={`empty-${i}`} className="schedule-month__cell schedule-month__cell--empty" />
          ))}
          {days.map((day) => {
            const dayEvents = events.filter((e) => isSameDay(e.start, day));
            const isToday = isSameDay(day, currentDate);
            return (
              <button
                key={day.toISOString()}
                type="button"
                className={`schedule-month__cell ${isToday ? 'schedule-month__cell--today' : ''}`}
                onClick={() => onSlotClick?.(day)}
              >
                <span className="schedule-month__day-num">{day.getDate()}</span>
                {dayEvents.slice(0, 2).map((ev) => (
                  <span key={ev.id} className="schedule-month__event-dot">
                    {ev.title}
                  </span>
                ))}
                {dayEvents.length > 2 && (
                  <span className="schedule-month__more">
                    +{dayEvents.length - 2} more
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const days =
    viewMode === 'day' ? [currentDate] : getWeekDays(currentDate);
  const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;

  return (
    <div className="schedule-grid-wrapper">
      <div
        className="schedule-grid"
        style={{
          gridTemplateColumns: `64px repeat(${days.length}, minmax(140px, 1fr))`,
        }}
      >
        <div className="schedule-grid__corner">
          <span className="schedule-grid__timezone">UTC +1</span>
        </div>

        {days.map((day) => {
          const { weekday, date } = formatDayLabel(day);
          const isToday = isSameDay(day, currentDate);
          return (
            <div
              key={day.toISOString()}
              className={`schedule-grid__day-header ${isToday ? 'schedule-grid__day-header--today' : ''}`}
            >
              <span className="schedule-grid__weekday">{weekday}</span>
              <span className="schedule-grid__date">{date}</span>
            </div>
          );
        })}

        <div className="schedule-grid__time-col">
          {hours.map((hour) => (
            <div
              key={hour}
              className="schedule-grid__time-label"
              style={{ height: HOUR_HEIGHT }}
            >
              {formatHour(hour)}
            </div>
          ))}
        </div>

        {days.map((day) => (
          <div
            key={`col-${day.toISOString()}`}
            className="schedule-grid__day-col"
            style={{ height: totalHeight }}
          >
            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                className="schedule-grid__slot"
                style={{ height: HOUR_HEIGHT }}
                aria-label={`Add event on ${formatDayLabel(day).date} at ${formatHour(hour)}`}
                onClick={() => {
                  const slotDate = new Date(day);
                  slotDate.setHours(hour, 0, 0, 0);
                  onSlotClick?.(slotDate);
                }}
              />
            ))}

            {events
              .filter((e) => isSameDay(e.start, day))
              .map((event) => {
                const durationHours =
                  (event.end.getTime() - event.start.getTime()) /
                  (1000 * 60 * 60);
                return (
                  <ScheduleEventCard
                    key={event.id}
                    event={event}
                    compact={durationHours < 1.5}
                    style={{
                      top: eventTop(event.start),
                      height: eventHeight(event.start, event.end),
                    }}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
