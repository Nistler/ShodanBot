import { Telegraf } from 'telegraf';
import { API_KEYS } from "../../shared/constants/apiKeys.js";

const token = API_KEYS.TELEGRAM_BOT_TOKEN;

export const bot = new Telegraf(token);