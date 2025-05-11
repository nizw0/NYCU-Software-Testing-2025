
// ProgrammedSettings.js

const Period = {
  MORNING: "MORNING",
  DAY: "DAY",
  EVENING: "EVENING",
  NIGHT: "NIGHT"
};

const DayType = {
  WEEKDAY: "WEEKDAY",
  WEEKEND: "WEEKEND"
};

class ProgrammedSettings {
  constructor() {
    this.settings = {};

    for (const period of Object.values(Period)) {
      this.settings[period] = {};
      for (const day of Object.values(DayType)) {
        this.settings[period][day] = 65; // Default value (Fahrenheit)
      }
    }
  }

  setSetting(period, day, temp) {
    if (this.settings[period]) {
      this.settings[period][day] = temp;
    }
  }

  getSetting(period, day) {
    return this.settings[period]?.[day] ?? 65;
  }

  toString() {
    return JSON.stringify(this.settings, null, 2);
  }
}

module.exports = {
  ProgrammedSettings,
  Period,
  DayType
};
