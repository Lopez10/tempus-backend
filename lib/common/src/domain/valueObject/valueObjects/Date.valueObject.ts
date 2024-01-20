import { DomainPrimitive, ValueObject } from '../valueObject.base';

export class DateVO extends ValueObject<string> {
  constructor(value: string | Date) {
    if (value instanceof Date) {
      value = `${value.getDate()}/${
        value.getMonth() + 1
      }/${value.getFullYear()}`;
    }
    super({ value });
    this.validate({ value });
    this.props.value = this.fixFormat(value);
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

  get daysOfMonth(): DateVO[] {
    const daysOfMonth: DateVO[] = [];
    const monthOfDate = this.month;
    const yearOfDate = this.year;
    const lastDayOfMonth = new Date(yearOfDate, monthOfDate, 0).getDate();

    for (let day = 1; day <= lastDayOfMonth; day++) {
      daysOfMonth.push(new DateVO(`${day}/${monthOfDate}/${yearOfDate}`));
    }

    return daysOfMonth;
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

  fixFormat(value: string): string {
    const [day, month, year] = value.split('/');

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
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
      throw new Error('Date is required');
    }

    const [day, month, year] = props.value.split('/');

    if (!day || !month || !year) {
      throw new Error('Date is incomplete');
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

    if (yearNumber < 2000) {
      throw new Error('Year is invalid');
    }

    if (!this.validateDate(dayNumber, monthNumber, yearNumber)) {
      throw new Error('Date is invalid');
    }
  }
}
