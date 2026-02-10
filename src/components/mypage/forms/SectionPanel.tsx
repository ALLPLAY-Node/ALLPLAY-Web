import { useEffect, useMemo, useRef, useState } from "react";

export type SectionPanelOption = {
  label: string;
  value: string;
};

type SectionPanelProps = {
  value: string;
  options: SectionPanelOption[];
  placeholder: string;
  onChange: (value: string) => void;
  widthClassName?: string;
  panelMaxHeightClassName?: string;
  disabled?: boolean;
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
    const delta = panelRect.bottom - window.innerHeight + margin;
    window.scrollBy({ top: delta, behavior: "smooth" });
    return;
  }

  if (triggerRect.top < margin) {
    window.scrollBy({ top: triggerRect.top - margin, behavior: "smooth" });
  }
};

const SectionPanel = ({
  value,
  options,
  placeholder,
  onChange,
  widthClassName = "w-[222px]",
  panelMaxHeightClassName = "max-h-[320px]",
  disabled = false
}: SectionPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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

  return (
    <div ref={rootRef} className={`relative ${widthClassName}`}>
      <button
        ref={triggerRef}
        type="button"
        className={`flex h-8 w-full items-center justify-between rounded-[8px] bg-[#999999] px-4 text-base font-normal text-white ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <span className={`text-lg leading-none ${isOpen ? "rotate-180" : ""}`}>
          ?
        </span>
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          className={`absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-y-auto rounded-[8px] border border-[#8B8483] bg-[#706765] p-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${panelMaxHeightClassName}`}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className={`flex h-[27px] w-full items-center rounded-[4px] px-3 text-left text-sm font-medium ${
                  isSelected
                    ? "bg-[#568DED] text-white"
                    : "text-[#FFFFFB] hover:bg-[#7D7574]"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default SectionPanel;
