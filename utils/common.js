module.exports = (req, res, data, message, status) => {
  let statusCode = status ? status : 200;
  res.status(statusCode).send({ data: data, msg: message });
};