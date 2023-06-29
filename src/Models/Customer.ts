import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../Utils/server';

export class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'seat' }
);