import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    summary: {
      type: String,
      default: "",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    messageCount: {
      type: Number,
      default: 0,
    },
    model: {
      type: String,
      default: "gpt-4o-mini",
    },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ user: 1, updatedAt: -1 });

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;
