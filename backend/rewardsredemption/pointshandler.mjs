import express from 'express';
import User from '../data/users.mjs';

const pointsHandler = express.Router();

pointsHandler.get('/userPoints', async (req, res) => {
  try {
    
    const username = getUsername(); 
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ userPoints: user.points });
  } catch (error) {
    console.error('Error fetching user points:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

pointsHandler.post('/redeem', async (req, res) => {
  try {
    const { itemName, userId } = req.body; 


    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user has enough points
    const item = rewardsData.find(item => item.name === itemName);
    if (!item || user.points < item.points) {
      return res.status(400).json({ error: 'Insufficient points' });
    }

    // Deduct points from user
    user.points -= item.points;
    await user.save();

    // Return updated user points
    return res.status(200).json({ userPoints: user.points });
  } catch (error) {
    console.error('Error redeeming item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default pointsHandler;
