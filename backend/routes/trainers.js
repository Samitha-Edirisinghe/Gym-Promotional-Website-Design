import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Get all trainers
router.get('/', async (req, res) => {
  try {
    const [trainers] = await pool.query('SELECT * FROM trainers ORDER BY created_at DESC');

    res.json({
      success: true,
      data: trainers
    });
  } catch (error) {
    console.error('Get trainers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trainers'
    });
  }
});

// Get trainer by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [trainers] = await pool.query('SELECT * FROM trainers WHERE id = ?', [id]);

    if (trainers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }

    res.json({
      success: true,
      data: trainers[0]
    });
  } catch (error) {
    console.error('Get trainer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trainer'
    });
  }
});

export default router;
