import dotenv from 'dotenv';
dotenv.config();

export const API_KEYS = {
  OPEN_AI_TOKEN: process.env.API_KEY_OPENAI,
  ORGANIZATION_TOKEN: process.env.API_KEY_ORGANIZATION,
  TELEGRAM_BOT_TOKEN: process.env.API_KEY_TELEGRAM,
};