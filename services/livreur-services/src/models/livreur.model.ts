import { Table, Column, DataType, Model } from "sequelize-typescript";
import { Optional } from "sequelize";

export interface LivreurAttributes {
  userId: string;
  phone: string;
  vehicule: string;
  gpsLongitude: number;
  gpsLatitude: number;
}

export interface LivreurCreationAttributes extends Optional<LivreurAttributes, "userId"> {}

@Table({ tableName: "livreurs", timestamps: true })
export class Livreur extends Model<LivreurAttributes, LivreurCreationAttributes> {
  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  vehicule!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  gpsLongitude!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  gpsLatitude!: number;

}