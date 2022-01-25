import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Link } from "./link.entity";
import { OrderItem } from "./order-item.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  transaction_id: string;

  @Column()
  user_id: number;

  @Column()
  code: string;
  
  @Column()
  ambassador_email: string;

  
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({nullable: true})
  address: string;
  
  @Column({nullable: true})
  country: string;
  
  @Column({nullable: true})
  city: string;
  
  @Column({nullable: true})
  zip: string;

  @Column({default: false})
  complete: boolean;

   
  @CreateDateColumn()
  createdAt: string;

  @OneToMany(()=> OrderItem, orderItem=> orderItem.order)
  order_items: OrderItem[]

  @ManyToOne(()=> Link, link => link.orders, {
    createForeignKeyConstraints: false
  })
  @JoinColumn({
    referencedColumnName: 'code',
    name: 'code'
  })
  link: Link;

  get name(): string {
    return this.first_name + ' ' + this.last_name;
  }

  get total(): number {
    return this.order_items.reduce((s,item)=>s + item.admin_revenue,0)
  }
}