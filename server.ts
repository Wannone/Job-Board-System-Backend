import express from "express";

const app = express();
const port = 3000;

// route
const jobRoute = require('./routes/job');
const authRoute = require('./routes/auth');
const applyRoute = require('./routes/apply');

app.use(express.json())


// use route
app.use('/job', jobRoute);
app.use('/auth', authRoute);
app.use('/apply', applyRoute);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
