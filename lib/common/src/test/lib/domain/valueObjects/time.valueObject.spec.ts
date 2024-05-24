import { Time } from '@common/domain';

describe('Time value object test', () => {
  it(`
        GIVEN a valid time data
        WHEN I create a new Time
        THEN the Time value object is created
        AND the Time value object has the correct values
        `, () => {
    // GIVEN
    const time = '10:30';
    // WHEN
    const newTime = new Time(time);

    // THEN
    expect(newTime.value).toEqual(time);

    // AND
    expect(newTime.hour).toEqual(10);
    expect(newTime.minute).toEqual(30);
  });

  it(`
        GIVEN a invalid minute time data
        WHEN I create a new Time
        THEN the Time value object is not created
        AND an error is thrown
    `, () => {
    // GIVEN
    const time = '10:300';

    // WHEN
    const timeCreation = () => new Time(time);

    // THEN
    expect(timeCreation).toThrowError('Minute is invalid');
  });

  it(`
        GIVEN a invalid hour time data
        WHEN I create a new Time
        THEN the Time value object is not created
        AND an error is thrown
    `, () => {
    // GIVEN
    const time = '24:30';

    // WHEN
    const timeCreation = () => new Time(time);

    // THEN
    expect(timeCreation).toThrowError('Hour is invalid');
  });

  it(`
        GIVEN a invalid hour time data without minutes
        WHEN I create a new Time
        THEN the Time value object is not created
        AND an error is thrown
    `, () => {
    // GIVEN
    const time = '12:';

    // WHEN
    const timeCreation = () => new Time(time);

    // THEN
    expect(timeCreation).toThrowError('Time is invalid');
  });

  it(`
        GIVEN a invalid hour time data without minutes
        WHEN I create a new Time
        THEN the Time value object is not created
        AND an error is thrown
    `, () => {
    // GIVEN
    const time = '';

    // WHEN
    const timeCreation = () => new Time(time);

    // THEN
    expect(timeCreation).toThrowError('Time is required');
  });
});
