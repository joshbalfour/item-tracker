import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Item, ItemInput, ItemUpdateInput } from '../entity/item'
import { ItemRepo } from '../data/datasource'
import { IsNull } from 'typeorm'

@Resolver(of => Item)
export class ItemResolver {
  @Query(returns => Item)
  async item (@Arg('id') id: string): Promise<Item> {
    return await ItemRepo.findOneOrFail({ relations: { parent: true, children: true }, where: { id } })
  }

  @Query(returns => [Item])
  async items (): Promise<Item[]> {
    return await ItemRepo.find({ relations: { parent: true }, where: { parent: IsNull() } })
  }

  @Mutation(returns => Item)
  async addItem (@Arg('item') item: ItemInput): Promise<Item> {
    const itemObj = new Item()
    if (!(item.parent_id === undefined || item.parent_id === '')) {
      itemObj.parent = await this.item(item.parent_id)
    }
    itemObj.description = item.description ?? ''
    itemObj.name = item.name
    return await ItemRepo.save(itemObj)
  }

  @Mutation(returns => Boolean)
  async deleteItem (@Arg('id') id: string): Promise<boolean> {
    const res = await ItemRepo.delete(id)
    return (res.affected ?? 0) > 0
  }

  @Mutation(returns => Item)
  async updateItem (@Arg('item') item: ItemUpdateInput): Promise<Item> {
    const curObj = await this.item(item.id)
    Object.entries(item).filter((d) => d[1]).forEach(d => { curObj[d[0]] = d[1] })
    return await ItemRepo.save(curObj)
  }
}
