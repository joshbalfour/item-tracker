import { Field, ID, InputType, ObjectType } from 'type-graphql'
import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Item {
  @Field(type => ID)
  @PrimaryColumn()
    id: string

  @Field(type => [Item], { nullable: true })
  @OneToMany((type) => Item, (item) => item.parent)
    children?: Item[]

  @Field(type => Item, { nullable: true })
  @ManyToOne(type => Item, (item) => item.children)
    parent?: Item

  @Field()
  @Column()
    name: string

  @Field()
  @Column()
    description: string

  @Field({ defaultValue: undefined, nullable: true })
  @Column({ default: undefined, nullable: true })
    image_path?: string
}

@InputType()
export class ItemInput {
  @Field()
    id: string

  @Field({ nullable: true })
    parent_id?: string

  @Field()
    name: string

  @Field({ nullable: true })
    description?: string

  @Field({ nullable: true })
    image_path?: string
}

@InputType()
export class ItemUpdateInput {
  @Field()
    id: string

  @Field({ nullable: true })
    parent_id?: string

  @Field({ nullable: true })
    name?: string

  @Field({ nullable: true })
    description?: string

  @Field({ nullable: true })
    image_path?: string
}
