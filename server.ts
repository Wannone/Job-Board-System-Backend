import express from "express";
import { errorMiddleware } from "./middlewares/error-middleware";

const app = express();
const port = 5001;
var cors = require('cors')

app.use(express.json())
app.use(cors())

// route
const jobRoute = require('./routes/job');
const authRoute = require('./routes/user');
const applyRoute = require('./routes/apply');

// use route
app.use('/api/job', jobRoute);
app.use('/api/user', authRoute);
app.use('/api/apply', applyRoute);

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});