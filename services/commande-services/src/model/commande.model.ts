import { Optional } from "sequelize";
import { Table, Column, DataType, Model } from "sequelize-typescript";

export interface CommandeAttributes {
    id: string;
    clientId: string;
    restaurantId: string;
    livreurId: string | null;
    status: "Pending" | "Accepted" | "In Delivery" | "Completed" | "Cancelled";
    cartPriceHT: number;
    finalPriceTTC: number | null;
    menus: object[{
        uuid: string;
        uuid_restaurant: string;
        amount: number;
    }];
    articles: object[{
        uuid: string;
        uuid_restaurant: string;
        amount: number;
    }];
}

export interface CommandeCreationAttributes extends Optional<CommandeAttributes, "id"> {} // Seul id est optionnel

@Table({ tableName: "commandes", timestamps: true })
export class Commande extends Model<CommandeAttributes, CommandeCreationAttributes> {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @Column({ type: DataType.UUID, allowNull: false })
    clientId!: string;

    @Column({ type: DataType.UUID, allowNull: false })
    restaurantId!: string;

    @Column({ type: DataType.UUID, allowNull: true })
    livreurId!: string | null;

    @Column({
        type: DataType.ENUM("Pending", "Accepted", "In Delivery", "Completed", "Cancelled"),
        allowNull: false
    })
    status!: "Pending" | "Accepted" | "In Delivery" | "Completed" | "Cancelled";

    @Column({ type: DataType.DECIMAL, allowNull: false })
    cartPriceHT!: number;

    @Column({ type: DataType.DECIMAL, allowNull: true })
    finalPriceTTC!: number | null;

    @Column({ type: DataType.JSONB, allowNull: true })
    menus!: object[{
        uuid: string;
        uuid_restaurant: string;
        amount: number;
    }];

    @Column({ type: DataType.JSONB, allowNull: true })
    articles!: object[{
        uuid: string;
        uuid_restaurant: string;
        amount: number;
    }];
}