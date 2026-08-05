export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DaySchedule =
  | { closed: true }
  | { closed?: false; open: string; close: string };

export type BusinessHours = Record<Weekday, DaySchedule>;

export const WEEKDAYS: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** Mon–Sat 09:00–18:00, Sunday closed */
export const DEFAULT_HOURS: BusinessHours = {
  monday: { open: "09:00", close: "18:00" },
  tuesday: { open: "09:00", close: "18:00" },
  wednesday: { open: "09:00", close: "18:00" },
  thursday: { open: "09:00", close: "18:00" },
  friday: { open: "09:00", close: "18:00" },
  saturday: { open: "09:00", close: "18:00" },
  sunday: { closed: true },
};

export function parseHoursJson(json: string | null | undefined): BusinessHours {
  if (!json) return DEFAULT_HOURS;
  try {
    const parsed = JSON.parse(json) as Partial<BusinessHours>;
    const result = { ...DEFAULT_HOURS };
    for (const day of WEEKDAYS) {
      const entry = parsed[day];
      if (!entry || typeof entry !== "object") continue;
      if ("closed" in entry && entry.closed === true) {
        result[day] = { closed: true };
      } else if (
        "open" in entry &&
        "close" in entry &&
        typeof entry.open === "string" &&
        typeof entry.close === "string"
      ) {
        result[day] = {
          open: entry.open.slice(0, 5),
          close: entry.close.slice(0, 5),
        };
      }
    }
    return result;
  } catch {
    return DEFAULT_HOURS;
  }
}

function formatTime(t: string) {
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const m = Number(mStr) || 0;
  if (Number.isNaN(h)) return t;
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/** Compact lines for footer/contact, e.g. "Mon–Sat: 9:00 AM – 6:00 PM" */
export function formatHoursLines(hours: BusinessHours): string[] {
  const groups: { label: string; text: string }[] = [];
  let i = 0;
  while (i < WEEKDAYS.length) {
    const day = WEEKDAYS[i];
    const schedule = hours[day];
    const key = JSON.stringify(schedule);
    let j = i + 1;
    while (j < WEEKDAYS.length && JSON.stringify(hours[WEEKDAYS[j]]) === key) {
      j += 1;
    }
    const start = WEEKDAY_LABELS[WEEKDAYS[i]];
    const end = WEEKDAY_LABELS[WEEKDAYS[j - 1]];
    const label = i === j - 1 ? start.slice(0, 3) : `${start.slice(0, 3)}–${end.slice(0, 3)}`;
    let text: string;
    if ("closed" in schedule && schedule.closed) {
      text = "Closed";
    } else {
      const openClose = schedule as { open: string; close: string };
      text = `${formatTime(openClose.open)} – ${formatTime(openClose.close)}`;
    }
    groups.push({ label, text });
    i = j;
  }
  return groups.map((g) => `${g.label}: ${g.text}`);
}

export function hoursToOpeningHoursSpecification(hours: BusinessHours) {
  const dayMap: Record<Weekday, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };
  return WEEKDAYS.filter((d) => !("closed" in hours[d] && hours[d].closed)).map((d) => {
    const s = hours[d] as { open: string; close: string };
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[d],
      opens: s.open,
      closes: s.close,
    };
  });
}
