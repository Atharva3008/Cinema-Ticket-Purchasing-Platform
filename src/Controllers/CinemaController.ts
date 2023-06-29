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

   };

   purchaseSeat = async (req: Request, res: Response) => {
      
   };

   purchaseConsecutiveSeats = async (req: Request, res: Response) => {
      
   };
}