import { Table, ForeignKey, Column, DataType, Model } from "sequelize-typescript";
import { User } from "./user-model";

export interface CommercialAttributes {
  userId: string;
}

export interface CommercialCreationAttributes extends CommercialAttributes {}

@Table({ tableName: "commerciaux", timestamps: true })
export class Commercial extends Model<CommercialAttributes, CommercialCreationAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;
}