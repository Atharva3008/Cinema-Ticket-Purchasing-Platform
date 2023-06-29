import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../Utils/server';
import { Cinema } from './Cinema';

export class Seat extends Model {}
Seat.init(
  {
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'seat' }
);

Seat.belongsTo(Cinema);