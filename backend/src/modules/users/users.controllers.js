import * as usersServices from "./users.services.js";

export async function updateMe(req, res, next) {
  try {
    const user = await usersServices.updateMe(req.user.sub, req.body);
    res.json({ user });
  } catch (e) {
    next(e);
  }
}
