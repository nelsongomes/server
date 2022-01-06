export class ApplicationError extends Error {
  public status: number;
  public message: string;
  public initialError?: Error;

  constructor(status: number, message: string, error?: Error) {
    super(message);

    this.status = status;
    this.message = message;
    if (error) {
      this.initialError = error;
    }
  }
}

export function wrapApplicationError(
  status: number,
  message: string,
  error?: Error
) {
  if (error instanceof ApplicationError) {
    error.message =
      message +
      " -> " +
      (error.initialError ? error.initialError.message : error.message);
    return error;
  }

  return new ApplicationError(status, message, error);
}
