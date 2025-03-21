import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Optional } from "sequelize";
import { UserType } from "./user-type";

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({ tableName: "users", timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.ENUM('Client', 'Restaurant', 'Livreur', 'Developpeur', 'Commercial', 'Technique'), allowNull: false })
  type!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;
}