const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const signupRoutes = require('./routes/SignupRoutes');
const loginRoutes = require('./routes/LoginRoutes');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');

const {swaggerUi, swaggerSpec} = require('./swagger/swagger');

// Load environment variables
dotenv.config();
const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/auth', forgotPasswordRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected Successfully..');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

        require('./models/reminderCron');
    })
    .catch(err => console.log('MongoDB Connection Failed', err));
