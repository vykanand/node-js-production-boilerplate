const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {res.send({response:'error',message:err});next();});
};

module.exports = catchAsync;
