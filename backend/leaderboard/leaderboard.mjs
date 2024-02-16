import express from 'express';
import User from '../data/users.mjs';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/leaderboard', async (req, res) => {
  try {
    // Fetch top 10 users sorted by points in descending order
    const leaderboard = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select('name points');
    res.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default leaderboardRouter;
