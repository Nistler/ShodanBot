import { Configuration, OpenAIApi } from "openai";
import { API_KEYS } from "../../shared/constants/apiKeys.js";

const configuration = new Configuration({
  organization: API_KEYS.ORGANIZATION_TOKEN,
  apiKey: API_KEYS.OPEN_AI_TOKEN,
});

export const openAi = new OpenAIApi(configuration);