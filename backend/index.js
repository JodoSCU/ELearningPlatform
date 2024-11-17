// backend/index.js
require('dotenv').config();  // Load .env variables
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3000;

// Setup AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

// Sample API route to fetch data
app.get('/', (req, res) => {
  res.send('Welcome to the E-Learning Platform API');
});

// Example route to interact with AWS S3
app.get('/upload', async (req, res) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'your-bucket-name', 
    Key: 'test-file.txt',
    Body: 'Hello, World!',
  };

  try {
    const data = await s3.putObject(params).promise();
    res.json({ message: 'File uploaded successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
