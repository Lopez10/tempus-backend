import { ExceptionBase } from '@common';

export class InvalidBookingHours extends ExceptionBase {
  static readonly message = 'Invalid booking hours';
  constructor(message = InvalidBookingHours.message) {
    super(message);
  }
  readonly code = 'INVALID_BOOKING_HOURS';
}

export class InvalidHoursPerBooking extends ExceptionBase {
  static readonly message = 'Invalid hours per booking';
  constructor(message = InvalidHoursPerBooking.message) {
    super(message);
  }
  readonly code = 'INVALID_HOURS_PER_BOOKING';
}

export class InvalidBookingAvailable extends ExceptionBase {
  static readonly message = 'There is no availability for this booking';
  constructor(message = InvalidBookingAvailable.message) {
    super(message);
  }
  readonly code = 'INVALID_BOOKING_AVAILABLE';
}

export class CreateBookingError extends ExceptionBase {
  static readonly message = 'Error creating booking';
  constructor(message = CreateBookingError.message) {
    super(message);
  }
  readonly code = 'CREATE_BOOKING_ERROR';
}
