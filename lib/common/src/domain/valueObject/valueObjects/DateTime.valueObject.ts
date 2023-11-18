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

  protected validate({ value }: { value: Date }): void {
    if (!value) {
      throw new Error('Date is required');
    }
  }
}
