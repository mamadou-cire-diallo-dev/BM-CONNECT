import * as authServices from "./auth.services.js";

export async function register(req, res, next) {
  try {
    const data = await authServices.register(req.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const data = await authServices.login(req.body);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function me(req, res, next) {
  try {
    const data = await authServices.me(req.user.sub);
    res.json(data);
  } catch (e) {
    next(e);
  }
}
