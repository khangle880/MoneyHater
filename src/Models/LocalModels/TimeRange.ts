import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

dayjs.extend(quarterOfYear);

export interface TimeRange {
  label: string;
  from: string;
  to: string;
}

function createTimeRange() {
  const today = dayjs();
  availableTimeRange = [
    {
      label: "This week",
      from: today.startOf("w").toISOString(),
      to: today.endOf("w").toISOString(),
    },
    {
      label: "This month",
      from: today.startOf("M").toISOString(),
      to: today.endOf("M").toISOString(),
    },
    {
      label: "This quarter",
      from: today.startOf("Q").toISOString(),
      to: today.endOf("Q").toISOString(),
    },
    {
      label: "This year",
      from: today.startOf("y").toISOString(),
      to: today.endOf("y").toISOString(),
    },
    {
      label: "Next week",
      from: today.add(1, "w").startOf("w").toISOString(),
      to: today.add(1, "w").endOf("w").toISOString(),
    },
    {
      label: "Next month",
      from: today.add(1, "M").startOf("M").toISOString(),
      to: today.add(1, "M").endOf("M").toISOString(),
    },
    {
      label: "Next quarter",
      from: today.add(1, "Q").startOf("Q").toISOString(),
      to: today.add(1, "Q").endOf("Q").toISOString(),
    },
    {
      label: "Next year",
      from: today.add(1, "y").startOf("y").toISOString(),
      to: today.add(1, "y").endOf("y").toISOString(),
    },
    {
      label: "Custom",
      from: "",
      to: "",
    },
  ];
}

export function initTimeRange() {
  createTimeRange();
  (function loop() {
    var now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      createTimeRange();
    }
    now = new Date(); // allow for time passing
    var delay = 60000 - (now.getTime() % 60000); // exact ms to next minute interval
    setTimeout(loop, delay);
  })();
}

export var availableTimeRange: TimeRange[] = [];
