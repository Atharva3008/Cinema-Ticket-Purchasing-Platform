import express from 'express';
import { CinemaController } from '../controllers/CinemaController';

const router = express.Router();
const cinemaController = new CinemaController();

router.post('/', cinemaController.createCinema);
router.post('/:cinemaId/purchase/:seatNumber', cinemaController.purchaseSeat);
router.post('/:cinemaId/purchase/consecutive', cinemaController.purchaseConsecutiveSeats);

export { router as cinemaRoutes };