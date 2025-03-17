import { Table, ForeignKey, Column, DataType, Model } from "sequelize-typescript";
import { User } from "./user-model";

export interface DeveloppeurAttributes {
  userId: string;
  apiKey: string;
}

export interface DeveloppeurCreationAttributes extends DeveloppeurAttributes {}

@Table({ tableName: "developpeurs", timestamps: true })
export class Developpeur extends Model<DeveloppeurAttributes, DeveloppeurCreationAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  apiKey!: string;
}