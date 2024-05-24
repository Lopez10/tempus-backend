import { ValueObject } from '../valueObject.base';

export class Time extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  get hour(): number {
    return parseInt(this.props.value.split(':')[0]);
  }

  get minute(): number {
    return parseInt(this.props.value.split(':')[1]);
  }

  addMinutes(minutes: number): Time {
    let hour = this.hour;
    let minute = this.minute + minutes;

    if (minute >= 60) {
      hour += Math.floor(minute / 60);
      minute = minute % 60;
    }

    return new Time(
      `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`,
    );
  }

  isBefore(time: Time): boolean {
    return (
      this.hour < time.hour ||
      (this.hour === time.hour && this.minute < time.minute)
    );
  }

  isEqual(time: Time): boolean {
    return this.hour === time.hour && this.minute === time.minute;
  }

  isBeforeOrEqual(time: Time): boolean {
    return this.isBefore(time) || this.isEqual(time);
  }

  isAfter(time: Time): boolean {
    return (
      this.hour > time.hour ||
      (this.hour === time.hour && this.minute > time.minute)
    );
  }

  isAfterOrEqual(time: Time): boolean {
    return this.isAfter(time) || this.isEqual(time);
  }

  isBetween(start: Time, end: Time): boolean {
    return this.isAfterOrEqual(start) && this.isBeforeOrEqual(end);
  }

  diffInHours(time: Time): number {
    const diffHour = this.hour - time.hour;
    const diffMinute = this.minute - time.minute;

    return (diffHour * 60 + diffMinute) / 60;
  }

  protected validate({ value }: { value: string }): void {
    if (!value) {
      throw new Error('Time is required');
    }

    const [hour, minute] = value.split(':');

    if (!hour || !minute) {
      throw new Error('Time is invalid');
    }

    const hourNumber = parseInt(hour);

    if (hourNumber < 0 || hourNumber > 23) {
      throw new Error('Hour is invalid');
    }

    const minuteNumber = parseInt(minute);

    if (minuteNumber < 0 || minuteNumber > 59) {
      throw new Error('Minute is invalid');
    }
  }
}
