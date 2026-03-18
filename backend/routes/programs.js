import express from 'express';
import pool from '../config/database.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Search and filter programs
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const { query, goal, level, duration, page = 1, limit = 10 } = req.query;
    
    let sql = 'SELECT * FROM programs WHERE 1=1';
    const params = [];

    // Text search
    if (query) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm);
    }

    // Filter by goal
    if (goal && goal !== 'all') {
      sql += ' AND goal = ?';
      params.push(goal);
    }

    // Filter by level
    if (level && level !== 'all') {
      sql += ' AND level = ?';
      params.push(level);
    }

    // Filter by duration
    if (duration && duration !== 'all') {
      sql += ' AND duration = ?';
      params.push(duration);
    }

    // Count total results
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    const [countResult] = await pool.query(countSql, params);
    const total = countResult[0].total;

    // Add pagination
    const offset = (page - 1) * limit;
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [programs] = await pool.query(sql, params);

    res.json({
      success: true,
      data: programs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search programs'
    });
  }
});

// Get all programs
router.get('/', async (req, res) => {
  try {
    const [programs] = await pool.query('SELECT * FROM programs ORDER BY created_at DESC');

    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get programs'
    });
  }
});

// Get program by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [programs] = await pool.query('SELECT * FROM programs WHERE id = ?', [id]);

    if (programs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Program not found'
      });
    }

    res.json({
      success: true,
      data: programs[0]
    });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get program'
    });
  }
});

// Get filter options (for dropdown menus)
router.get('/filters/options', async (req, res) => {
  try {
    const [goals] = await pool.query('SELECT DISTINCT goal FROM programs WHERE goal IS NOT NULL');
    const [levels] = await pool.query('SELECT DISTINCT level FROM programs WHERE level IS NOT NULL');
    const [durations] = await pool.query('SELECT DISTINCT duration FROM programs WHERE duration IS NOT NULL');

    res.json({
      success: true,
      data: {
        goals: goals.map(row => row.goal),
        levels: levels.map(row => row.level),
        durations: durations.map(row => row.duration)
      }
    });
  } catch (error) {
    console.error('Get filter options error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get filter options'
    });
  }
});

export default router;
