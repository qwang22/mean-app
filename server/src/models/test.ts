import mongoose from 'mongoose';

const subDoc = new mongoose.Schema<any>({
  name: { type: String }
}, { _id: false })

const test = new mongoose.Schema<any>({
  name: { type: String, required: true },
  items: { type: [subDoc] }
},
{ collection: 'test',
  timestamps: { createdAt: true, updatedAt: true }
});

test.statics.deleteById = function(_id) {
  return this.deleteOne({ _id });
}

const model = mongoose.model('Test', test);

export { model };