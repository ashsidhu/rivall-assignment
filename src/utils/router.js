export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const sendResponse = (req, res, next) => {
  const { payload } = res;
  if (payload === undefined) return next();
  return res.status(200).json({
    data: payload
  })
};
