const express = require('express');
const sequelize = require('./config/db');
const superAdminRoutes = require('./routes/superAdminRoutes');


const app = express();
app.use(express.json());

//Routes
app.use('/api/auth', superAdminRoutes);

//Test DB connection
sequelize.authenticate()
.then(() => {
    console.log('Database connected...');
})
.catch(err => {
    console.log('DB connection error',err);
})

// Health check endpoint to confirm the API is running
app.get('/', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'API is running' });
});

const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});