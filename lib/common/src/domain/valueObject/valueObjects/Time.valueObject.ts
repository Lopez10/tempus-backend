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

    return new Time(`${hour}:${minute}`);
  }

  isBefore(time: Time): boolean {
    return (
      this.hour < time.hour ||
      (this.hour === time.hour && this.minute < time.minute)
    );
  }

  isAfter(time: Time): boolean {
    return (
      this.hour > time.hour ||
      (this.hour === time.hour && this.minute > time.minute)
    );
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
