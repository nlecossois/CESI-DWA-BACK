import { Table, ForeignKey, Column, DataType, Model } from "sequelize-typescript";
import { User } from "./user-model";
import { Optional } from "sequelize";

export interface LivreurAttributes {
  userId: string;
  parrainId?: string;
}

export interface LivreurCreationAttributes extends Optional<LivreurAttributes, "parrainId"> {}

@Table({ tableName: "livreurs", timestamps: true })
export class Livreur extends Model<LivreurAttributes, LivreurCreationAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  parrainId?: string;
}