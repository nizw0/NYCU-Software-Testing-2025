
// Thermostat.js
class Thermostat {
  constructor() {
    this.curTemp = 0;
    this.thresholdDiff = 0;
    this.timeSinceLastRun = 0;
    this.minLag = 0;
    this.override = false;
    this.overTemp = 0;
    this.runTime = 0;
    this.heaterOn = false;
    this.period = null; // e.g., "morning", "day", "evening", "night"
    this.day = null;    // e.g., "weekday", "weekend"
  }

  // Example method structure assuming a ProgrammedSettings object is provided
  turnHeaterOn(programmedSettings) {
    let targetTemp;
    if (this.override) {
      targetTemp = this.overTemp;
    } else {
      targetTemp = programmedSettings.getSetting(this.period, this.day);
    }

    this.heaterOn = (this.curTemp < targetTemp - this.thresholdDiff) &&
                    (this.timeSinceLastRun >= this.minLag);

    this.runTime = this.heaterOn ? 10 : 0; // Just an example run time

    return {
      heaterOn: this.heaterOn,
      runTime: this.runTime
    };
  }

  setCurrentTemp(temp) {
    this.curTemp = temp;
  }

  setOverride(temp) {
    this.override = true;
    this.overTemp = temp;
  }

  clearOverride() {
    this.override = false;
  }
}

module.exports = Thermostat;
