// // import mongoose from 'mongoose';

// // const userSchema = new mongoose.Schema({
// //     name: { type: String, required: true },
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String, required: true },
// //     role: { type: String, enum: ['borrower', 'librarian'], default: 'borrower' }
// // });

// // export default mongoose.model('User', userSchema);





// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['borrower', 'librarian'], default: 'borrower' }
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['borrower', 'librarian'],
        default: 'borrower',
        required: true
    },
    profileImage:{
        type: String,
        default:""
    }
}, { timestamps: true });

// const User = mongoose.model('User', userSchema);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

