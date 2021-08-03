import BaseEntity from "src/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Product extends BaseEntity {

    @Column({nullable:true})
    price: number;
}
