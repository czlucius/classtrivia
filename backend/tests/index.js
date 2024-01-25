const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB 🍃');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const express = require('express');
const bodyParser = require('body-parser');
const { authRouter } = require('./auth/users');
const quizRouter = require('./quizcreation/quizController');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);

const PORT = process.env.PORT || 9109;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} 🚀`);
});
