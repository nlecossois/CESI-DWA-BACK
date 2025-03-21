import { Optional } from "sequelize";
import { Table, Column, DataType, Model } from "sequelize-typescript";

export interface TypeAttributes {
  id: string;
  name: string;
}

export interface TypeCreationAttributes extends Optional<TypeAttributes, "id"> {}

@Table({ tableName: "types", timestamps: false })
export class Type extends Model<TypeAttributes, TypeCreationAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;
}