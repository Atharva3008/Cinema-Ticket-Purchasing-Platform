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
      const { cinemaId, seatNumber } = req.params;
      const t = await sequelize.transaction();
      try {
         const seat = await Seat.findOne({ where: { cinemaId, seatNumber }});

         if (!seat) {
            return res.status(404).json({ error: 'Seat not found' });
         }

         if (seat.isPurchased) {
            return res.status(400).json({ error: 'Seat is already purchased' });
         }

         const updatedSeat = await seat.update({ isPurchased: true }, {transaction: t} );

         t.commit();

         res.json({ seat: updatedSeat });
      } catch (error) {
         console.error('Error purchasing seat:', error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   };

   purchaseConsecutiveSeats = async (req: Request, res: Response) => {
      const { cinemaId } = req.params;

      const t = await sequelize.transaction();
      try {
         const seats = await Seat.findAll({
            where: { cinemaId, isPurchased: false },
            // limit: 2,
            order: [['seatNumber', 'ASC']],
         });

         const seatNumbers: Number[] = [];
         for(var i=1;i<seats.length;i++) {
            if(seats[i].seatNumber == seats[i-1].seatNumber + 1) {
               await Seat.update({ isPurchased: true }, { where: { id: seats[i].seatNumber }, transaction: t });
               await Seat.update({ isPurchased: true }, { where: { id: seats[i-1].seatNumber }, transaction: t });
               t.commit();
               seatNumbers.push(seats[i].seatNumber);
               seatNumbers.push(seats[i].seatNumber);
               break;
            }
         }

         if(seatNumbers.length == 0) {
            return res.status(400).json("No enough consecutive seats available!")
         }
      
         res.json({ seats: seatNumbers });
      } catch (error) {
         console.error('Error purchasing consecutive seats:', error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
   };
}