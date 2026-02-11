import { useEffect, useMemo, useRef, useState } from "react";

type CalendarPanelProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type CalendarCell = {
  date: Date;
  isCurrentMonth: boolean;
};

const MIN_YEAR = 1920;
const MAX_YEAR = 2026;

const MIN_MONTH_DATE = new Date(MIN_YEAR, 0, 1);
const MAX_MONTH_DATE = new Date(MAX_YEAR, 11, 1);

const parseBirthDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const parsed = new Date(year, month, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
};

const clampToYearRange = (date: Date) => {
  if (date < MIN_MONTH_DATE) {
    return new Date(MIN_YEAR, 0, 1);
  }
  if (date > MAX_MONTH_DATE) {
    return new Date(MAX_YEAR, 11, 1);
  }
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const toBirthValue = (date: Date) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatBirthDisplay = (value: string) => {
  const parsed = parseBirthDate(value);
  if (!parsed) {
    return "\uC0DD\uB144\uC6D4\uC77C\uC744 \uC120\uD0DD\uD558\uC138\uC694";
  }
  return `${parsed.getFullYear()}\uB144. ${parsed.getMonth() + 1}\uC6D4. ${parsed.getDate()}\uC77C .`;
};

const formatMonthLabel = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long"
  }).format(date);

const isSameDay = (a: Date | null, b: Date) =>
  !!a &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const createCalendarCells = (viewDate: Date): CalendarCell[] => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(year, month, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const cellDate = new Date(start);
    cellDate.setDate(start.getDate() + index);
    return {
      date: cellDate,
      isCurrentMonth: cellDate.getMonth() === month
    };
  });
};

const ensurePanelVisible = (
  trigger: HTMLButtonElement | null,
  panel: HTMLDivElement | null
) => {
  if (!trigger || !panel) {
    return;
  }

  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const margin = 20;

  if (panelRect.bottom > window.innerHeight - margin) {
    window.scrollBy({
      top: panelRect.bottom - window.innerHeight + margin,
      behavior: "smooth"
    });
    return;
  }

  if (triggerRect.top < margin) {
    window.scrollBy({ top: triggerRect.top - margin, behavior: "smooth" });
  }
};

const CalendarPanel = ({
  value,
  onChange,
  disabled = false
}: CalendarPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() =>
    clampToYearRange(parseBirthDate(value) ?? new Date())
  );
  const [pendingDate, setPendingDate] = useState<Date | null>(() =>
    parseBirthDate(value)
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const yearListRef = useRef<HTMLDivElement>(null);

  const selectedDate = useMemo(() => parseBirthDate(value), [value]);
  const calendarCells = useMemo(
    () => createCalendarCells(viewDate),
    [viewDate]
  );
  const yearOptions = useMemo(
    () =>
      Array.from(
        { length: MAX_YEAR - MIN_YEAR + 1 },
        (_, index) => MIN_YEAR + index
      ),
    []
  );

  const canGoPrevMonth = viewDate > MIN_MONTH_DATE;
  const canGoNextMonth = viewDate < MAX_MONTH_DATE;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setIsYearPickerOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (isYearPickerOpen) {
        setIsYearPickerOpen(false);
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isYearPickerOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      ensurePanelVisible(triggerRef.current, panelRef.current);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isYearPickerOpen) {
      return;
    }

    const listNode = yearListRef.current;
    if (!listNode) {
      return;
    }

    const targetNode = listNode.querySelector<HTMLButtonElement>(
      `[data-year="${viewDate.getFullYear()}"]`
    );
    if (!targetNode) {
      return;
    }

    targetNode.scrollIntoView({ block: "center" });
  }, [isYearPickerOpen, viewDate]);

  const handleOpen = () => {
    if (disabled) {
      return;
    }

    const baseDate = selectedDate ?? new Date();
    setViewDate(clampToYearRange(baseDate));
    setPendingDate(selectedDate);
    setIsYearPickerOpen(false);
    setIsOpen(true);
  };

  return (
    <div
      ref={rootRef}
      className="relative flex w-full max-w-[425px] flex-col gap-1"
    >
      <span className="text-base font-normal text-black">
        {"\uC0DD\uB144\uC6D4\uC77C"}
      </span>

      <button
        ref={triggerRef}
        type="button"
        className={`flex h-10 w-full items-center justify-center rounded-xl border border-[#999999] bg-white px-[25px] text-base text-black ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        onClick={handleOpen}
        disabled={disabled}
      >
        {formatBirthDisplay(value)}
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          className="absolute left-0 top-[calc(100%+12px)] z-50 w-full rounded-xl bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
        >
          <div className="flex flex-col gap-4">
            <div className="relative flex h-12 items-center justify-between">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md text-2xl text-[#131A29] hover:bg-[#F5F5F5] disabled:opacity-40"
                onClick={() => {
                  if (!canGoPrevMonth) {
                    return;
                  }
                  setViewDate((prev) =>
                    clampToYearRange(
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                    )
                  );
                }}
                disabled={!canGoPrevMonth}
              >
                {"<"}
              </button>

              <div className="flex items-center gap-2 text-xl font-medium text-[#131A29]">
                <span>{formatMonthLabel(viewDate)}</span>
                <button
                  type="button"
                  className="rounded-md px-2 py-1 text-xl font-medium hover:bg-[#F5F5F5]"
                  onClick={() => setIsYearPickerOpen((prev) => !prev)}
                >
                  {viewDate.getFullYear()}
                </button>
              </div>

              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md text-2xl text-[#131A29] hover:bg-[#F5F5F5] disabled:opacity-40"
                onClick={() => {
                  if (!canGoNextMonth) {
                    return;
                  }
                  setViewDate((prev) =>
                    clampToYearRange(
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                    )
                  );
                }}
                disabled={!canGoNextMonth}
              >
                {">"}
              </button>

              {isYearPickerOpen ? (
                <div className="absolute left-1/2 top-[52px] z-10 w-[140px] -translate-x-1/2 rounded-lg border border-[#DADADA] bg-white p-2 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                  <div
                    ref={yearListRef}
                    className="max-h-[220px] overflow-y-auto pr-1"
                  >
                    {yearOptions.map((year) => {
                      const isSelected = year === viewDate.getFullYear();
                      return (
                        <button
                          key={year}
                          data-year={year}
                          type="button"
                          className={`mb-1 flex h-9 w-full items-center justify-center rounded-md text-sm ${
                            isSelected
                              ? "bg-[#1D5EFF] text-white"
                              : "bg-[#F5F5F5] text-[#131A29] hover:bg-[#E8E8E8]"
                          }`}
                          onClick={() => {
                            setViewDate(new Date(year, viewDate.getMonth(), 1));
                            setIsYearPickerOpen(false);
                          }}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarCells.map((cell) => {
                const isSelected = isSameDay(pendingDate, cell.date);
                const dayNumber = cell.date.getDate();

                return (
                  <button
                    key={cell.date.toISOString()}
                    type="button"
                    className={`flex h-12 w-12 items-center justify-center rounded-lg text-lg font-medium ${
                      isSelected
                        ? "bg-[#1D5EFF] text-white"
                        : cell.isCurrentMonth
                          ? "bg-[#F5F5F5] text-[#131A29] hover:bg-[#E8E8E8]"
                          : "bg-white text-[#C4C4C4]"
                    }`}
                    onClick={() => setPendingDate(new Date(cell.date))}
                  >
                    {dayNumber}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#DDDDDD] text-xl font-medium text-[#888888]"
                onClick={() => {
                  setPendingDate(selectedDate);
                  setIsYearPickerOpen(false);
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#1D5EFF] text-xl font-medium text-white"
                onClick={() => {
                  if (pendingDate) {
                    onChange(toBirthValue(pendingDate));
                  }
                  setIsYearPickerOpen(false);
                  setIsOpen(false);
                }}
              >
                Choose Date
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CalendarPanel;
