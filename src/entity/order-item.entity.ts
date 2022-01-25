import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_title: string;

  @Column()
  price: number;
  
  @Column()
  quantity: number;

  @Column()
  ambassador_revenue: number;

  @Column()
  admin_revenue: number;    

  @ManyToOne(()=> Order, order=> order.order_items)
  @JoinColumn({name: 'order_id'})
  order: Order;   

}
