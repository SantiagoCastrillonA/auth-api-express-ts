import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import registerRoutes from './routes/register';

const app = express();
const PORT = 10101;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/register', registerRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`) ;

export default app;
