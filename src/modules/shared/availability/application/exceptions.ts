import { ExceptionBase } from '@common';

export class InvalidBookingHours extends ExceptionBase {
  static readonly message = 'Invalid booking hours';
  constructor(message = InvalidBookingHours.message) {
    super(message);
  }
  readonly code = 'INVALID_BOOKING_HOURS';
}

export class InvalidBookingInterval extends ExceptionBase {
  static readonly message = 'Invalid booking interval';
  constructor(message = InvalidBookingInterval.message) {
    super(message);
  }
  readonly code = 'INVALID_BOOKING_INTERVAL';
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
