import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../Utils/server';
import { Seat } from './Seat';

export class Cinema extends Model {}
Cinema.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'Cinema' }
);

Cinema.hasMany(Seat, { as: 'seats' });
