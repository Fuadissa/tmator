import { Schema, model, models } from "mongoose";

const miniAppSchema = new Schema(
  {
    appName: { type: String, required: true, unique: true },
    appDomain: { type: String, required: true, unique: true },
    appImage: { type: String },
    appDescription: { type: String },
    botUrl: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tg_id: { type: String, required: true },
    templateUrl: { type: String, required: true },
    templateType: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MiniApp = models.MiniApp || model("MiniApp", miniAppSchema);

export default MiniApp;
