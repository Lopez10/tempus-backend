import { DateTime } from '@common';

describe('DateTime value object test', () => {
  it(`
    GIVEN a valid date data
    WHEN I create a new DateTime
    THEN the DateTime value object is created
    AND the DateTime value object has the correct values
    `, () => {
    // GIVEN
    const date = new Date('Wed Dec 07 2023 10:30:00');

    // WHEN
    const newDateTime = new DateTime(date);

    // THEN
    expect(newDateTime.value).toEqual(date);

    // AND
    expect(newDateTime.hour).toEqual(10);
    expect(newDateTime.minute).toEqual(30);
    expect(newDateTime.day).toEqual(7);
    expect(newDateTime.month).toEqual(11);
    expect(newDateTime.year).toEqual(2023);
  });
});
