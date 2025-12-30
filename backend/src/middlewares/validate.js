export function validate({ body, query, params } = {}) {
    return (req, res, next) => {
      try {
        if (body) {
          const { error, value } = body.validate(req.body, { abortEarly: false, stripUnknown: true });
          if (error) return res.status(400).json({ message: "Validation error", errors: error.details });
          req.body = value;
        }
        if (query) {
          const { error, value } = query.validate(req.query, { abortEarly: false, stripUnknown: true });
          if (error) return res.status(400).json({ message: "Validation error", errors: error.details });
          req.query = value;
        }
        if (params) {
          const { error, value } = params.validate(req.params, { abortEarly: false, stripUnknown: true });
          if (error) return res.status(400).json({ message: "Validation error", errors: error.details });
          req.params = value;
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  