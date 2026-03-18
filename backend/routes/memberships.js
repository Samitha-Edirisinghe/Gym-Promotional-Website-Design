import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all membership plans
router.get('/plans', async (req, res) => {
  try {
    const [plans] = await pool.query('SELECT * FROM membership_plans ORDER BY monthly_price ASC');

    // Parse JSON features
    const parsedPlans = plans.map(plan => ({
      ...plan,
      features: typeof plan.features === 'string' ? JSON.parse(plan.features) : plan.features
    }));

    res.json({
      success: true,
      data: parsedPlans
    });
  } catch (error) {
    console.error('Get plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get membership plans'
    });
  }
});

// Subscribe to a plan
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId, billingCycle } = req.body;
    const userId = req.user.id;

    // Validate billing cycle
    if (!['monthly', 'yearly'].includes(billingCycle)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid billing cycle'
      });
    }

    // Check if plan exists
    const [plans] = await pool.query('SELECT * FROM membership_plans WHERE id = ?', [planId]);

    if (plans.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Membership plan not found'
      });
    }

    const plan = plans[0];

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    
    if (billingCycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Cancel any existing active memberships
    await pool.query(
      'UPDATE user_memberships SET status = ? WHERE user_id = ? AND status = ?',
      ['cancelled', userId, 'active']
    );

    // Create new membership
    const [result] = await pool.query(
      `INSERT INTO user_memberships (user_id, plan_id, billing_cycle, start_date, end_date, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, planId, billingCycle, startDate, endDate, 'active']
    );

    res.json({
      success: true,
      message: 'Successfully subscribed to membership plan',
      data: {
        membershipId: result.insertId,
        planName: plan.name,
        billingCycle,
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to membership plan'
    });
  }
});

// Get user's active membership
router.get('/my-membership', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [memberships] = await pool.query(
      `SELECT um.*, mp.name, mp.description, mp.monthly_price, mp.yearly_price, mp.features
       FROM user_memberships um
       JOIN membership_plans mp ON um.plan_id = mp.id
       WHERE um.user_id = ? AND um.status = ?
       ORDER BY um.created_at DESC
       LIMIT 1`,
      [userId, 'active']
    );

    if (memberships.length === 0) {
      return res.json({
        success: true,
        data: null,
        message: 'No active membership found'
      });
    }

    const membership = memberships[0];

    res.json({
      success: true,
      data: {
        ...membership,
        features: typeof membership.features === 'string' ? JSON.parse(membership.features) : membership.features
      }
    });
  } catch (error) {
    console.error('Get my membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get membership information'
    });
  }
});

export default router;
