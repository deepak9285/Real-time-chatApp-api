const mongoose=require('mongoose');
const messageSchema = new mongoose.Schema({
    userId: String,
    messages: [{
      role: String,
      content: String,
      timestamp: { type: Date, default: Date.now }
    }]
  });
  
  const AiMessage = mongoose.model('AiMessage', messageSchema);
  
  module.exports = { AiMessage };