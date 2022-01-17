function errorHandler(err, req, res, next) {
  console.log(err);
  switch (err.constraint) {
      case "users_email_key":
        res.status(400).json({
          status: 400,
          message: "Email already taken"
        });
  }

  if (err.status) {
    res.status(err.status).json(err);
    return;
  }
  
  res.status(500).json({
    status: 500,
    message: "Internal server error"
  });
}

module.exports = errorHandler;