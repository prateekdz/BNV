import dotenv from 'dotenv';

dotenv.config();

const { connectDB } = await import('./src/config/db.js');
const { default: app } = await import('./src/app.js');

let PORT = parseInt(process.env.PORT, 10) || 5000;

const startServer = async (port = PORT) => {
  try {
    await connectDB();

    const server = app.listen(port, () => {
    });

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        setTimeout(() => startServer(port + 1), 500);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer(PORT);

