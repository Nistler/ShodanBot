import { bot, openAi } from './entities/index.js';
import { updateContext } from './shared/utils/updateContext.js';

const definedMessages = ['/about'];

const conversationContext = {};

bot.on('message', async (ctx) => {
  const userMessage = ctx.update.message.text;

  if (!definedMessages.includes(userMessage)) {
    const messageText = userMessage;

    console.log(userMessage);
    try {
      const userId = ctx.update.message.from.id;
      const requestMessage = {content: messageText, role: 'user'};

      updateContext(conversationContext, userId, requestMessage);

      const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationContext[userId],
      })

      const responseText  = response.data.choices[0].message.content;
      const responseMessage = {content: responseText, role: 'assistant'};

      updateContext(conversationContext, userId, responseMessage);

      console.log(conversationContext);

      await ctx.reply(responseText);
    } catch (error) {
      console.log('error', error);
      await ctx.reply('Ooooops, something went wrong!');
    }
  }
});

bot.launch();