const Joi = require('joi');

const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

exports.Validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key', escapeHtml: false } })
    .validate(object, { abortEarly: false });

  if (error) {
    return res.status(400).json({ error: error.details })
  }
  Object.assign(req, value);
  return next();
}