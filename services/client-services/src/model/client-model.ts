import { Optional } from "sequelize";
import { Table, Column, DataType, Model } from "sequelize-typescript";
import { getUser } from "../views/client";

export interface ClientAttributes {
  userId: string;
  parrainId?: string;
  address: string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "parrainId"> {}

@Table({ tableName: "clients", timestamps: true })
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  parrainId?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address!: string;

  static async getUser(userId: string) {
    try {
      const userData = await getUser(userId);
      return userData;
    } catch (error) {
      throw new Error("Could not fetch user data");
    }
  }
}