// // import mongoose from 'mongoose';

// // const borrowSchema = new mongoose.Schema({
// //     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //     bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
// //     borrowDate: { type: Date, default: Date.now },
// //     returnDate: { type: Date, default: null }
// // });

// // export default mongoose.model('Borrow', borrowSchema);



// import mongoose from "mongoose";

// const borrowSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
//   borrowDate: { type: Date, default: Date.now },
//   dueDate: { type: Date }, // NEW FIELD
//   returnDate: { type: Date, default: null }
// });

// // Auto-set dueDate = borrowDate + 14 days
// borrowSchema.pre("save", function (next) {
//   if (!this.dueDate) {
//     this.dueDate = new Date(this.borrowDate);
//     this.dueDate.setDate(this.dueDate.getDate() + 14);
//   }
//   next();
// });

// export default mongoose.model("Borrow", borrowSchema);


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
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Middleware: set dueDate = borrowDate + 14 days if not already set
borrowSchema.pre("save", function (next) {
  if (!this.dueDate) {
    const due = new Date(this.borrowDate);
    due.setDate(due.getDate() + 14);
    this.dueDate = due;
  }
  next();
});

export default model("Borrow", borrowSchema);
