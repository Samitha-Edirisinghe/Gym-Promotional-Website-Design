import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { validate, signupValidation, loginValidation } from '../middleware/validation.js';

const router = express.Router();

// Signup
router.post('/signup', validate(signupValidation), async (req, res) => {
  const { fullName, email, password, phone, dateOfBirth, gender, fitnessGoal } = req.body;

  try {
    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      `INSERT INTO users (full_name, email, password, phone, date_of_birth, gender, fitness_goal) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fullName, email, hashedPassword, phone || null, dateOfBirth || null, gender || null, fitnessGoal || null]
    );

    const userId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Get the created user
    const [users] = await pool.query(
      'SELECT id, full_name, email, phone, date_of_birth, gender, fitness_goal, created_at FROM users WHERE id = ?',
      [userId]
    );

    const user = users[0];

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user.id.toString(),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        fitnessGoal: user.fitness_goal,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account. Please try again.'
    });
  }
});

// Login
router.post('/login', validate(loginValidation), async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id.toString(),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        fitnessGoal: user.fitness_goal,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  // Since we're using JWT, logout is handled on the client side
  // This endpoint is here for consistency and future extensibility
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, full_name, email, phone, date_of_birth, gender, fitness_goal, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    res.json({
      success: true,
      user: {
        id: user.id.toString(),
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        fitnessGoal: user.fitness_goal,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
});

// Forgot password (placeholder)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // In a real application, you would:
  // 1. Verify the email exists
  // 2. Generate a password reset token
  // 3. Send an email with the reset link
  // For this demo, we'll just return a success message

  res.json({
    success: true,
    message: 'If an account exists with this email, you will receive password reset instructions.'
  });
});

export default router;
