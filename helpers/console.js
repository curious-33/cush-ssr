function errorLogger(error, request) {
  if (request && error) {
    console.error(
      `Fail${(request.method, request.url, request.hostname)}`,
      error
    );
  } else if (error) {
    console.error("Failed", error);
  } else {
    console.error("something went wrong");
  }
}

module.exports = {
  errorLogger,
};
