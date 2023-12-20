import { ValueObject } from '../valueObject.base';

export class DateTime extends ValueObject<Date> {
  constructor(value: Date) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): Date {
    return this.props.value;
  }

  get hour(): number {
    return this.props.value.getHours();
  }

  get minute(): number {
    return this.props.value.getMinutes();
  }

  get day(): number {
    return this.props.value.getDate();
  }

  get month(): number {
    return this.props.value.getMonth();
  }

  get year(): number {
    return this.props.value.getFullYear();
  }

  createDayDate(): DateTime {
    const dayDate = new Date(this.year, this.month, this.day);
    return new DateTime(dayDate);
  }

  isBefore(date: DateTime): boolean {
    return this.props.value.getTime() < date.value.getTime();
  }

  protected validate({ value }: { value: Date }): void {
    if (!value) {
      throw new Error('Date is required');
    }
  }
}
