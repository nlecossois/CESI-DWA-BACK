import { Table, Column, Model, DataType, BelongsToMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Article } from "./article-model";

export interface MenuAttributes {
  id: string;
  nom: string;
  prix: number;
  restaurantId: string;
}

export interface MenuCreationAttributes extends Optional<MenuAttributes, "id"> {}

@Table({ tableName: "menus", timestamps: true })
export class Menu extends Model {
  @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  nom!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  prix!: number;

  @Column({ type: DataType.UUID, allowNull: false })
  restaurantId!: string;

  @BelongsToMany(() => Article, { through: 'menu_articles' })
  articles?: Article[];
} 