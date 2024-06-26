import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const AnswerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  question1: {
    type: QuestionSchema,
    required: true,
  },
  question2: {
    type: QuestionSchema,
    required: true,
  },
  question3: {
    type: QuestionSchema,
    required: true,
  },
}, { timestamps: true });

const AnswerModel = mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
export default AnswerModel;
