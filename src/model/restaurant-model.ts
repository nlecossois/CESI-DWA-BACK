import { Optional } from "sequelize";
import { Table, Column, DataType, ForeignKey, Model, BelongsToMany } from "sequelize-typescript";
import { User } from "./user-model";
import { RestaurantType } from "./restaurantType-model";
import { Type } from "./type-model";

export interface RestaurantAttributes {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  phone: string;
}

export interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, "id"> {}

@Table({ tableName: "restaurants", timestamps: true })
export class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string; 

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  ownerId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone!: string;

  @BelongsToMany(() => Type, () => RestaurantType)
  types!: Type[];
}