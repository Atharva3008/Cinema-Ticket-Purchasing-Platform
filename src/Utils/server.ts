import express from 'express';
import { Sequelize } from 'sequelize';
import { CinemaController } from '../Controllers/CinemaController';
import { cinemaRoutes } from '../Routes/CinemaRoutes';


export const sequelize = new Sequelize('postgres://username:password@localhost:5432/cinema_booking');
export const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
   res.send('Welcome to the Cinema Ticket Purchasing Platform API');
 });

const cinemaController = new CinemaController(app);

app.use('/cinemas', cinemaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});