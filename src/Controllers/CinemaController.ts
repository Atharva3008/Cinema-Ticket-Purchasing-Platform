import { Request, Response, Express } from 'express';
import { app } from '../Utils/server';
import {Cinema} from '../Models/Cinema';
import { Seat } from '../Models/Seat';
import { sequelize } from '../Utils/server';

export class CinemaController {
   private app: Express;

   constructor(app: Express) {
      this.app = app;
   }

   createCinema = async (req: Request, res: Response) => {
      const { numberOfSeats, cinemaName } = req.params;

      if (!numberOfSeats || isNaN(numberOfSeats)) {
         return res.status(400).json({ error: 'Invalid seats data' });
      }

      var seats : number[] = [];
      for (let index = 0; index < numberOfSeats; index++) {
         seats.push(index);
      }

      try {
         const cinema = await Cinema.create({name:cinemaName});
         await Seat.bulkCreate(seats.map((seatNumber: number) => ({ seatNumber, cinemaId: cinema.id })));

         res.json({ cinemaId: cinema.id });
      } catch (error) {
         console.error('Error creating cinema:', error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   };

   purchaseSeat = async (req: Request, res: Response) => {
      
   };

   purchaseConsecutiveSeats = async (req: Request, res: Response) => {
      
   };
}