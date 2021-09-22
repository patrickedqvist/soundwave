class HTTPResponseError extends Error {
  response: Response | null = null;

  constructor(response: Response, ...args: []) {
    super(
      `HTTP Error Response: ${response.status} ${response.statusText}`,
      ...args
    );
    this.response = response;
  }
}

const checkStatus = (response: Response) => {
  if (response.ok && response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new HTTPResponseError(response);
  }
};

export default checkStatus;
