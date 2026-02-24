import User from '../models/user.model.js';
import { AppError } from '../middleware/error.middleware.js';
import { asyncHandler } from '../middleware/async.middleware.js';
import { generateCSV } from '../utils/exportCsv.js';

export const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, age, gender, status, address, profile } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    age,
    gender,
    status,
    address,
    profile,
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 });
  const total = await User.countDocuments();

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, age, gender, status, address, profile } = req.body;

  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.age = age || user.age;
  user.gender = gender || user.gender;
  user.status = status || user.status;
  user.address = address || user.address;
  user.profile = profile || user.profile;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

export const searchUsers = asyncHandler(async (req, res, next) => {
  const { query = '', page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let users, total;

  if (process.env.USE_MOCK_DB === 'true') {
    const allUsers = await User.find().skip(0).limit(1000).sort({ createdAt: -1 });
    const searchLower = query.toLowerCase();
    const filtered = allUsers.filter(user =>
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
    total = filtered.length;
    users = filtered.slice(skip, skip + limit);
  } else {
    const searchQuery = {
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    };
    users = await User.find(searchQuery).skip(skip).limit(limit).sort({ createdAt: -1 });
    total = await User.countDocuments(searchQuery);
  }

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
});

export const exportUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select(
    'firstName lastName email phone age gender status address createdAt'
  );

  const csv = generateCSV(users);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="users.csv"');
  res.send(csv);
});
