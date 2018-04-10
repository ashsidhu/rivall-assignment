export class BadRequestError extends Error {
  code = 400;
  message = this.message || "Bad Request";
}

export class UnauthorizedError extends Error {
  code = 401;
  message = this.message || "Unauthorized";
}

export class NotFoundError extends Error {
  code = 404;
  message = this.message || "Not Found";
}

export class ServerError extends Error {
  code = 500;
  message = "Internal Server Error";
}
