import { Sequelize } from 'sequelize-typescript';
import { User } from '../model/user-model';
import { Client } from '../model/client-model';
import { Restaurant } from '../model/restaurant-model';
import { Livreur } from '../model/livreur-model';
import { Type } from '../model/type-model';
import { RestaurantType } from '../model/restaurantType-model';

const dbOption = { db:"postgres", user: "postgres", password:"password", host:"localhost" }

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: dbOption.host,
  username: dbOption.user,
  password: dbOption.password,
  database: dbOption.db,
  models: [User, Client, Restaurant, Livreur, Type, RestaurantType],
  logging: false,  
})

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
  }
};