import mongoose from "mongoose";

const { Schema, model } = mongoose;

const borrowSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } 
);

borrowSchema.pre("save", function (next) {
  if (!this.dueDate) {
    const due = new Date(this.borrowDate);
    due.setDate(due.getDate() + 14);
    this.dueDate = due;
  }
  next();
});

export default model("Borrow", borrowSchema);
