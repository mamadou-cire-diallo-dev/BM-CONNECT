import crypto from "crypto";

export function generateOtp6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}
