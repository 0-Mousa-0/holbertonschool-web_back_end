import express from 'express';
import router from './routes/index';

const app = express();
const PORT = 1245;

// Attach the unified routing middleware table block
app.use('/', router);

app.listen(PORT);

export default app;