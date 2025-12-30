import crypto from "crypto";

export function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

export function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex"); // token secret device
}

export function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (xf) return String(xf).split(",")[0].trim();
  return req.ip;
}

export function getUserAgent(req) {
  return req.headers["user-agent"] ? String(req.headers["user-agent"]) : "";
}

export function getDeviceId(req) {
  return req.headers["x-device-id"] ? String(req.headers["x-device-id"]) : null;
}

export function getDeviceToken(req) {
  return req.headers["x-device-token"] ? String(req.headers["x-device-token"]) : null;
}
