const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const notesRoute = require('./routes/notes');

app.use(notesRoute);

app.listen(PORT, ()=>{
  console.log(`Server running on Port: ${PORT}`);
});