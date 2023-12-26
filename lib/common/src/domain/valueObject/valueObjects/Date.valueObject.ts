import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class DateVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.validate({ value });
    this.props.value = value;
  }

  get value(): string {
    return this.props.value;
  }

  get day(): number {
    return parseInt(this.props.value.split('/')[0]);
  }

  get month(): number {
    return parseInt(this.props.value.split('/')[1]);
  }

  get year(): number {
    return parseInt(this.props.value.split('/')[2]);
  }

  isBefore(date: DateVO): boolean {
    return (
      this.year < date.year ||
      (this.year === date.year && this.month < date.month) ||
      (this.year === date.year &&
        this.month === date.month &&
        this.day < date.day)
    );
  }

  isAfter(date: DateVO): boolean {
    return (
      this.year > date.year ||
      (this.year === date.year && this.month > date.month) ||
      (this.year === date.year &&
        this.month === date.month &&
        this.day > date.day)
    );
  }

  private validateDate(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  protected validate(props: DomainPrimitive<string>): void {
    if (!props.value) {
      throw new Error(`${props.value} Date is required`);
    }

    const [day, month, year] = props.value.split('/');

    if (!day || !month || !year) {
      throw new Error(`${props.value} Date is incomplete`);
    }

    const dayNumber = parseInt(day);

    if (dayNumber < 1 || dayNumber > 31) {
      throw new Error('Day is invalid');
    }

    const monthNumber = parseInt(month);

    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error('Month is invalid');
    }

    const yearNumber = parseInt(year);

    if (yearNumber < 2021) {
      throw new Error('Year is invalid');
    }

    if (!this.validateDate(dayNumber, monthNumber, yearNumber)) {
      throw new Error('Date is invalid');
    }
  }
}
