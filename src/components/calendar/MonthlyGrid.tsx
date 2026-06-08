import { useMemo } from "react";
import { getCalendarDays, isSameDay, formatTime } from "../../lib/dateUtils";
import type { GoogleCalendarEvent } from "../../types/google";

type MonthlyGridProps = {
  year: number;
  month: number;
  events: GoogleCalendarEvent[];
};

export function MonthlyGrid({ year, month, events }: MonthlyGridProps) {
  const days = useMemo(() => getCalendarDays(year, month), [year, month]);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col h-full bg-white border border-gray-300 print:border-none p-4 print:p-8">
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          {year}年 {month + 1}月
        </h2>
        <div className="text-xs text-muted-foreground print:block hidden">
          gcal2paper - Created via Google Calendar
        </div>
      </div>

      <div className="flex flex-col flex-1 border-t border-l border-gray-300">
        <div className="grid grid-cols-7 border-b border-gray-300 bg-gray-50/50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-1.5 text-center text-xs font-bold uppercase tracking-wider text-gray-600 border-r border-gray-300"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1">
          {days.map((day, index) => {
            const dayEvents = events.filter((event) => {
              const start = event.start.dateTime || event.start.date;
              if (!start) return false;
              return isSameDay(new Date(start), day);
            });

            const isCurrentMonth = day.getMonth() === month;
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={index}
                className={`min-h-[80px] border-r border-b border-gray-300 p-1 flex flex-col gap-1 ${
                  !isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center px-1">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                        : ""
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden space-y-1">
                  {dayEvents.slice(0, 5).map((event) => {
                    const isAllDay = !!event.start.date;
                    const startTime =
                      !isAllDay && event.start.dateTime
                        ? formatTime(event.start.dateTime)
                        : null;
                    const bgColor = event.backgroundColor || "#6b7280";

                    return (
                      <div
                        key={event.id}
                        className={`text-[10px] px-1.5 py-0.5 rounded-sm truncate leading-tight flex items-center gap-1.5 border-l-4 ${
                          isAllDay
                            ? "bg-gray-100 font-semibold"
                            : "bg-white border-b border-gray-100"
                        }`}
                        style={{ borderLeftColor: bgColor }}
                      >
                        {startTime && (
                          <span className="font-bold opacity-80 shrink-0 text-[9px]">
                            {startTime}
                          </span>
                        )}
                        <span className="truncate font-medium">
                          {event.summary}
                        </span>
                      </div>
                    );
                  })}
                  {dayEvents.length > 5 && (
                    <div className="text-[9px] text-gray-400 text-center font-bold">
                      +{dayEvents.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
