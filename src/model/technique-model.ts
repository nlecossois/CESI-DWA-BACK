import { Table, ForeignKey, Column, DataType, Model } from "sequelize-typescript";
import { User } from "./user-model";

export interface TechniqueAttributes {
  userId: string;
}

export interface TechniqueCreationAttributes extends TechniqueAttributes {}

@Table({ tableName: "techniques", timestamps: true })
export class Technique extends Model<TechniqueAttributes, TechniqueCreationAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;
}