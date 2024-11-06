import { Schema, model, models } from "mongoose";

const appDataSchema = new Schema(
  {
    mediaUrl: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    videoUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tg_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AppData = models.AppData || model("AppData", appDataSchema);

export default AppData;
