import { Optional } from "sequelize";
import { Table, ForeignKey, Column, DataType, Model } from "sequelize-typescript";
import { User } from "./user-model";

export interface ClientAttributes {
  userId: string;
  parrainId?: string;
  address: string;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, "parrainId"> {}

@Table({ tableName: "clients", timestamps: true })
export class Client extends Model<ClientAttributes, ClientCreationAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  parrainId?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address!: string;
}