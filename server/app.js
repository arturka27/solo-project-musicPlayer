require('dotenv').config();
const express = require('express');

const serviceConfig = require('./config/serverConfig');
const indexRouter = require('./routes/index.routes')

const app = express();

const PORT = process.env.PORT || 3000

serviceConfig(app);

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})