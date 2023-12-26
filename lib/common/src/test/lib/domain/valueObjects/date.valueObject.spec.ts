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

  it(`
      GIVEN an invalid date data with bad day
      WHEN I create a new Date
      THEN the Date value object is not created      
      `, () => {
    // GIVEN
    const invalidDate = '0/1/2020';
    // WHEN
    const invalidDateCreation = () => new DateVO(invalidDate);
    // THEN
    expect(invalidDateCreation).toThrowError('Day is invalid');
  });

  it(`
      GIVEN an invalid date data with bad month
      WHEN I create a new Date
      THEN the Date value object is not created      
      `, () => {
    // GIVEN
    const invalidDate = '1/13/2020';
    // WHEN
    const invalidDateCreation = () => new DateVO(invalidDate);
    // THEN
    expect(invalidDateCreation).toThrowError('Month is invalid');
  });

  it(`
      GIVEN an incomplete date data 
      WHEN I create a new Date
      THEN the Date value object is not created      
      `, () => {
    // GIVEN
    const invalidDate = '1/12';
    // WHEN
    const invalidDateCreation = () => new DateVO(invalidDate);
    // THEN
    expect(invalidDateCreation).toThrowError('Date is incomplete');
  });

  it(`
      GIVEN an empty date data
      WHEN I create a new Date
      THEN the Date value object is not created      
      `, () => {
    // GIVEN
    const invalidDate = '';
    // WHEN
    const invalidDateCreation = () => new DateVO(invalidDate);
    // THEN
    expect(invalidDateCreation).toThrowError('Date is required');
  });

  it(`
      GIVEN an invalid date data with an incorrect day in February
      WHEN I create a new Date
      THEN the Date value object is not created      
      `, () => {
    // GIVEN
    const invalidDate = '30/02/2023';
    // WHEN
    const invalidDateCreation = () => new DateVO(invalidDate);
    // THEN
    expect(invalidDateCreation).toThrowError('Date is invalid');
  });
});
