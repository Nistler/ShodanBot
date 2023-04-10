import TelegramBot from "node-telegram-bot-api";
import { API_KEYS } from "../../shared/constants/apiKeys.js";

const token = API_KEYS.TELEGRAM_BOT_TOKEN;

export const bot = new TelegramBot(token, { polling: true });