import { DateVO } from '@common';

describe('Date Value Object test', () => {
  it(`
      GIVEN a valid date data with 2 digits for day and month
      WHEN I create a new Date
      THEN the Date value object is created
      AND the Date value object has the correct values
      `, () => {
    // GIVEN
    const validDate = '01/01/2020';
    // WHEN
    const date = new DateVO(validDate);
    // THEN
    expect(date.value).toEqual(validDate);
    // AND
    expect(date.day).toEqual(1);
    expect(date.month).toEqual(1);
    expect(date.year).toEqual(2020);
  });

  it(`
      GIVEN a valid date data with 1 digit for day and month
      WHEN I create a new Date
      THEN the Date value object is created
      AND the Date value object has the correct values
      `, () => {
    // GIVEN
    const validDateWithOneDigit = '1/1/2020';
    const validDateWithTwoDigit = '01/01/2020';
    // WHEN
    const date = new DateVO(validDateWithOneDigit);
    // THEN
    expect(date.value).toEqual(validDateWithTwoDigit);
    // AND
    expect(date.day).toEqual(1);
    expect(date.month).toEqual(1);
    expect(date.year).toEqual(2020);
  });
});
