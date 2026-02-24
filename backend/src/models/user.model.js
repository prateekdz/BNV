import mongoose from 'mongoose';
import MockUser from './mockUser.model.js';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      match: [/^\d{10}$/, 'Phone must be 10 digits'],
    },
    age: {
      type: Number,
      min: [18, 'Age must be at least 18'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: 'Invalid gender selection',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive'],
        message: 'Invalid status selection',
      },
      default: 'Active',
    },
    address: {
      type: String,
      trim: true,
    },
    profile: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 'text', email: 'text' });

const MongooseUser = mongoose.model('User', userSchema);

export default process.env.USE_MOCK_DB === 'true' ? MockUser : MongooseUser;
