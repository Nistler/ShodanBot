export function updateContext(conversationContext, userId, message) {
  conversationContext[userId] = conversationContext[userId] || [];
  conversationContext[userId].push(message);
  if (conversationContext[userId] > 10) {
    conversationContext[userId].shift();
  }
}