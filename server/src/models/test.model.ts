import * as mongoose from 'mongoose';

const subDoc = new mongoose.Schema<any>({
  name: { type: String }
}, { timestamps: { createdAt: true, updatedAt: true }})

const test = new mongoose.Schema<any>({
  name: { type: String, required: true },
  items: { type: [subDoc] }
}, { _id: false });

test.statics.deleteById = function(_id) {
  return this.deleteOne({ _id });
}

const model = mongoose.model('Test', test);

export { model };