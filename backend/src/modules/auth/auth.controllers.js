import * as authServices from "./auth.services.js";
import { env } from "../../config/env.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // path: "/", // optionnel (souvent utile)
};

export async function register(req, res, next) {
  try {
    const data = await authServices.register(req.body);
    return res.status(201).json(data);
  } catch (e) {
    next(e);
  }
}

export async function verify(req, res, next) {
  try {
    const data = await authServices.verifyContact(req.body);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function resend(req, res, next) {
  try {
    const data = await authServices.resendCode(req.body);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const data = await authServices.login(req, req.body);

    if (data?.twoFactorRequired) return res.status(202).json(data);

    // cookie refresh token
    res.cookie("refresh_token", data.refreshToken, COOKIE_OPTIONS);

    // ne pas exposer refreshToken
    const { refreshToken, ...safe } = data;
    return res.json(safe);
  } catch (e) {
    next(e);
  }
}

export async function verify2fa(req, res, next) {
  try {
    const data = await authServices.verifyLogin2fa(req, req.body);

    res.cookie("refresh_token", data.refreshToken, COOKIE_OPTIONS);

    const { refreshToken, ...safe } = data;
    return res.json(safe);
  } catch (e) {
    next(e);
  }
}

export async function refresh(req, res, next) {
  try {
    const data = await authServices.refresh(req);

    // ✅ FIX: COOKIE_OPTIONS (pas REFRESH_COOKIE_OPTIONS)
    res.cookie("refresh_token", data.refreshToken, COOKIE_OPTIONS);

    // réponse clean: uniquement accessToken
    return res.json({ accessToken: data.accessToken });
  } catch (e) {
    next(e);
  }
}

export async function logout(req, res, next) {
  try {
    const data = await authServices.logout(req);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      // path: "/", // si tu avais mis path au cookie
    });

    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function logoutAll(req, res, next) {
  try {
    const data = await authServices.logoutAll(req.user.sub);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      // path: "/",
    });

    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function me(req, res, next) {
  try {
    const data = await authServices.me(req.user.sub);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function devices(req, res, next) {
  try {
    const data = await authServices.listDevices(req.user.sub);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function logoutDevice(req, res, next) {
  try {
    const data = await authServices.logoutCurrentDevice(req, req.user.sub);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function deleteDevice(req, res, next) {
  try {
    const data = await authServices.revokeDeviceById(req.user.sub, req.params.id);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}

export async function deleteAllDevices(req, res, next) {
  try {
    const data = await authServices.revokeAllDevices(req.user.sub);
    return res.json(data);
  } catch (e) {
    next(e);
  }
}
