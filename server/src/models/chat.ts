import mongoose from 'mongoose';

const messages = new mongoose.Schema<any>({
  message: { type: String },
  user: { type: String }
}, { timestamps: { createdAt: true, updatedAt: false }});

const participant = new mongoose.Schema<any>({
  user: { type: [String] }
});

const chat = new mongoose.Schema<any>({
  roomName: { type: String, required: true },
  messages: { type: [messages] },
  participants: { type: [participant]}
},
{ collection: 'chat',
  timestamps: { createdAt: true, updatedAt: true }
});

const model = mongoose.model('Chat', chat);

export { model };