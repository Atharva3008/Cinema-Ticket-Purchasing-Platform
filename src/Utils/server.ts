import express from 'express';
import { Sequelize } from 'sequelize';
import { CinemaController } from '../Controllers/CinemaController';
import { cinemaRoutes } from '../Routes/CinemaRoutes';


export const app = express();
const PORT = 3000;

// app.use(express.json());

const cinemaController = new CinemaController(app);

app.use('/cinemas', cinemaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});