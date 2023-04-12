import {Markup} from 'telegraf';
import {bot, openAi} from './entities/index.js';
import {updateContext} from './shared/utils/updateContext.js';
import {definedMessages} from './shared/constants/definedMessages.js';
import {CONFIGURATION_MESSAGES, SYSTEM_MESSAGES} from "./shared/constants/messages.js";

const conversationContext = {};
const configuration = {};

bot.command('settings', async (ctx) => {
  return await ctx.reply('Configure', Markup
      .keyboard([
        ['Context', 'Temperature', 'Top_p'],
        ['Cancel'],
      ])
      .oneTime()
      .resize()
  );
})

bot.hears('Context', (ctx) => {
  ctx.reply(CONFIGURATION_MESSAGES.CONTEXT, Markup
      .keyboard([
        ['⬅️ Back'],
      ])
      .oneTime()
      .resize()
  );
});

bot.hears('⬅️ Back', (ctx) => {
  ctx.reply('Configure', Markup
      .keyboard([
        ['Context', 'Temperature', 'Top_p'],
        ['Cancel'],
      ])
      .oneTime()
      .resize()
  );
});

bot.hears('Temperature', (ctx) => {
  ctx.reply(CONFIGURATION_MESSAGES.TEMPERATURE, Markup
      .keyboard([
        ['⬅️ Back'],
      ])
      .oneTime()
      .resize()
  );
});

bot.hears('Top_p', (ctx) => {
  ctx.reply(CONFIGURATION_MESSAGES.TOP_P, Markup
      .keyboard([
        ['⬅️ Back'],
      ])
      .oneTime()
      .resize()
  );
});

bot.on('message', async (ctx) => {
  const userMessage = ctx.update.message.text;

  if (!definedMessages.includes(userMessage)) {
      try {
      const userId = ctx.update.message.from.id;
      const requestMessage = { content: userMessage, role: 'user' };

      updateContext(conversationContext, userId, requestMessage);

      const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationContext[userId],
      })

      const responseText  = response.data.choices[0].message.content;
      const botResponseMessage = { content: responseText, role: 'assistant' };

      updateContext(conversationContext, userId, botResponseMessage);

      console.log(conversationContext);

      await ctx.reply(responseText);
    } catch (error) {
      console.log('error', error);
      await ctx.reply(SYSTEM_MESSAGES.SOMETHING_WRONG);
    }
  }
});

bot.launch();