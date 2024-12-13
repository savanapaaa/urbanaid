const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const AdminModel = require('../models/adminModel');

const AuthController = {
  register: async (request, h) => {
    const { nama, email, password } = request.payload;

    try {
      const existingUser = await UserModel.findByEmail(email);
      const existingAdmin = await AdminModel.findByEmail(email);

      if (existingUser || existingAdmin) {
        return h.response({
          status: 'fail',
          message: 'Email sudah terdaftar',
        }).code(400);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await UserModel.create({
        nama,
        email,
        password: hashedPassword,
      });

      return h.response({
        status: 'success',
        message: 'User berhasil didaftarkan',
        data: {
          user,
        },
      }).code(201);
    } catch (error) {
      console.error('Error in register:', error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

  login: async (request, h) => {
    const { email, password } = request.payload;

    try {
      let user = await UserModel.findByEmail(email);
      let isAdmin = false;

      if (!user) {
        user = await AdminModel.findByEmail(email);
        isAdmin = true;
      }

      if (!user) {
        return h.response({
          status: 'fail',
          message: 'Email atau password salah',
        }).code(401);
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return h.response({
          status: 'fail',
          message: 'Email atau password salah',
        }).code(401);
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return h.response({
        status: 'success',
        message: 'Login berhasil',
        data: {
          token,
          user: {
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
          },
        },
      }).code(200);
    } catch (error) {
      console.error('Error in login:', error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

  createAdmin: async (request, h) => {
    const { nama, email, password, role = 'admin' } = request.payload;
    const { credentials } = request.auth;

    try {
      if (credentials.role !== 'superadmin') {
        return h.response({
          status: 'fail',
          message: 'Unauthorized: Hanya superadmin yang dapat membuat akun admin',
        }).code(403);
      }

      const existingAdmin = await AdminModel.findByEmail(email);
      const existingUser = await UserModel.findByEmail(email);

      if (existingAdmin || existingUser) {
        return h.response({
          status: 'fail',
          message: 'Email sudah terdaftar',
        }).code(400);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const admin = await AdminModel.create({
        nama,
        email,
        password: hashedPassword,
        role,
      });

      return h.response({
        status: 'success',
        message: 'Admin berhasil didaftarkan',
        data: {
          admin,
        },
      }).code(201);
    } catch (error) {
      console.error('Error in createAdmin:', error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },
};

module.exports = AuthController;