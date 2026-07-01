import { useState } from 'react';
import type { EventTab, ScheduleEvent } from '../../types/schedule';
import { formatTimeRange } from '../../utils/dateUtils';

interface ScheduleEventCardProps {
  event: ScheduleEvent;
  compact?: boolean;
  style?: React.CSSProperties;
}

const icons: Record<ScheduleEvent['icon'], string> = {
  video: '📹',
  users: '👥',
  coffee: '☕',
  calendar: '📅',
};

export function ScheduleEventCard({
  event,
  compact = false,
  style,
}: ScheduleEventCardProps) {
  const [tab, setTab] = useState<EventTab>('description');
  const durationHours =
    (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
  const isExpanded = !compact && durationHours >= 1.5;

  return (
    <article
      className={`event-card ${isExpanded ? 'event-card--expanded' : 'event-card--compact'}`}
      style={style}
    >
      <header className="event-card__header">
        <div className="event-card__title-row">
          <span className="event-card__icon" aria-hidden="true">
            {icons[event.icon]}
          </span>
          <div className="event-card__title-block">
            <h3 className="event-card__title">{event.title}</h3>
            <time className="event-card__time">
              {formatTimeRange(event.start, event.end)}
            </time>
          </div>
        </div>
        {event.hasReminder && (
          <button
            type="button"
            className="event-card__bell"
            aria-label="Toggle reminder"
            title="Reminder set"
          >
            🔔
          </button>
        )}
      </header>

      {isExpanded && (
        <>
          <div className="event-card__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'description'}
              className={`event-card__tab ${tab === 'description' ? 'event-card__tab--active' : ''}`}
              onClick={() => setTab('description')}
            >
              Description
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'assigned'}
              className={`event-card__tab ${tab === 'assigned' ? 'event-card__tab--active' : ''}`}
              onClick={() => setTab('assigned')}
            >
              Assigned
            </button>
          </div>

          <div className="event-card__body">
            {tab === 'description' && (
              <div role="tabpanel">
                {event.description && (
                  <p className="event-card__description">{event.description}</p>
                )}
                {event.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="event-card__link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
                {event.attachments?.map((file) => (
                  <div key={file.name} className="event-card__attachment">
                    <span className="event-card__file-icon">📄</span>
                    <div>
                      <span className="event-card__file-name">{file.name}</span>
                      <span className="event-card__file-size">{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'assigned' && (
              <div role="tabpanel">
                <ul className="event-card__participants">
                  {event.participants?.map((p) => (
                    <li key={p.id} className="event-card__participant">
                      <img
                        src={p.avatar}
                        alt=""
                        className="event-card__avatar"
                      />
                      <span className="event-card__participant-name">
                        {p.name}
                      </span>
                      <span
                        className={`event-card__status event-card__status--${p.status}`}
                      >
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
                <button type="button" className="event-card__add-people">
                  + Add people
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {event.actionLabel && isExpanded && (
        <button type="button" className="event-card__action">
          {event.actionLabel}
        </button>
      )}
    </article>
  );
}
