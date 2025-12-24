import "dotenv/config";
import Joi from "joi";

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().default(3000),

  DATABASE_URL: Joi.string().uri().required(),

  // JWT_SECRET: Joi.string().min(20).required(),
  // JWT_EXPIRES_IN: Joi.string().default("7d"),

  CORS_ORIGIN: Joi.string().default("*"),
}).unknown(true);

const { value, error } = schema.validate(process.env, { abortEarly: false });

if (error) {
  console.error(" Invalid environment variables:", error.details.map(d => d.message));
  process.exit(1);
}

export const env = value;
