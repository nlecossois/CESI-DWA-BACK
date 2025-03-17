import { Optional } from "sequelize";
import { Table, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Client } from "./client-model";
import { Restaurant } from "./restaurant-model";

export interface CommandeAttributes {
  id: string;
  clientId: string;
  restaurantId: string;
  status: "Pending" | "Accepted" | "In Delivery" | "Completed" | "Cancelled";
  totalPrice: number;
}

export interface CommandeCreationAttributes extends Optional<CommandeAttributes, "id"> {} // Seul id est optionnel

@Table({ tableName: "commandes", timestamps: true })
export class Commande extends Model<CommandeAttributes, CommandeCreationAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, allowNull: false })
  clientId!: string;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.UUID, allowNull: false })
  restaurantId!: string;

  @Column({ 
    type: DataType.ENUM("Pending", "Accepted", "In Delivery", "Completed", "Cancelled"), 
    allowNull: false 
  })
  status!: "Pending" | "Accepted" | "In Delivery" | "Completed" | "Cancelled";

  @Column({ type: DataType.DECIMAL, allowNull: false })
  totalPrice!: number;
}