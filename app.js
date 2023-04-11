import { bot, openAi } from './entities/index.js';

const definedMessages = ['/about'];

bot.on('message', async (msg) => {
  if (!definedMessages.includes(msg.text)) {
    const messageText = msg.text;

    const chatId = msg.chat.id;

    try {
      const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{content: messageText, role: 'user'}],
      })

      const responseMessage  = response.data.choices[0].message.content;

      await bot.sendMessage(chatId, responseMessage);
    } catch (error) {
      console.log('error', error);
      await bot.sendMessage(chatId, 'Ooooops, something went wrong!');
    }
  }
});

bot.onText(/\/about/, async msg => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, 'I am Shodan, your personal assistant bot.');
});

bot.on("polling_error", console.log);
