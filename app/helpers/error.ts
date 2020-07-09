class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function handleError(err, res): void {
  const { statusCode, message } = err;
  console.log(res);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
}

export default ErrorHandler;
