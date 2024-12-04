const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  
const routes = require('./src/routes/routes');  

const connectDB = require('./src/config/db');  
dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/', routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
