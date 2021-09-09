import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please Enter Your Password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
