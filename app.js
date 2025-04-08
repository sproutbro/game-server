import 'dotenv/config'
import app from './server/index.js';

const PORT = process.env.PORT || 3014;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
