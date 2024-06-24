import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    applicationStatus: {
      type: String,
    },
  },
  { collection: "questions" }
);

const QuestionsModel =
  mongoose.models.Questions || mongoose.model("Questions", QuestionsSchema);

export default QuestionsModel;
