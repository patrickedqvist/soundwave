export class ContextMissingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContextMissingError';
  }
}

export class NoSessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoSessionError';
  }
}