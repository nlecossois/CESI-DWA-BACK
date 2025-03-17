import { Optional } from "sequelize";
import { Table, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Restaurant } from "./restaurant-model";

export interface ArticleAttributes {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
}

export interface ArticleCreationAttributes extends Optional<ArticleAttributes, "id" | "description"> {}

@Table({ tableName: "articles", timestamps: true })
export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @ForeignKey(() => Restaurant)
  @Column({ type: DataType.UUID, allowNull: false })
  restaurantId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description?: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price!: number;
}