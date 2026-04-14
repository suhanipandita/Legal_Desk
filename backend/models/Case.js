import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['Active', 'Pending', 'Urgent', 'Closed'], default: 'Active' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lawyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nextHearingDate: Date,
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);