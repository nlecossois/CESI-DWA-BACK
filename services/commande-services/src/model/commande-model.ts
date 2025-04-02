import { Optional } from "sequelize";
import { Table, Column, DataType, Model } from "sequelize-typescript";

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

  @Column({ type: DataType.UUID, allowNull: false })
  clientId!: string;

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