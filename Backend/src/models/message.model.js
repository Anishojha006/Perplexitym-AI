import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    citations: [
      {
        title: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
        snippet: {
          type: String,
          default: "",
        },
      },
    ],
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "file", "link"],
          default: "link",
        },
        url: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          default: "",
        },
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    tokensUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ chat: 1, createdAt: -1 });

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
