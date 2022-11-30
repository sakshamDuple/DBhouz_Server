import { ObjectId } from "mongodb";
import { collections } from "../db.service";
import { Inventory, IProduct, IUnit } from "../interfaces";
import { ProductService } from "./product.service";

class InventoryServiceClass {

    async getByInventoryId(inventoryId: string | ObjectId): Promise<any> {
        const query = { _id: new ObjectId(inventoryId) };
        return (await collections.inventory.findOne(query));
    }

    async getByProdIdVarName(productId: string, variant_Name: string): Promise<any> {
        const query = { productId: new ObjectId(productId), variant_Name: variant_Name };
        return (await collections.inventory.findOne(query));
    }

    async createInventoryOutside(inventory: Inventory): Promise<any> {
        let newinventory = this.sanitize(inventory)
        if (newinventory.sellingPrice == null) throw new Error(`Selling Price Can't be Empity while creating Inventory`)
        let product: IProduct = await collections.products.findOne(newinventory.productId) as IProduct
        product.variants.forEach(async element => {
            if (element.name == newinventory.variant_Name) {
                await collections.inventory.insertOne(newinventory)
            }
        });
        return new Error(`Variant With This Name Doesn't Exist For Given Product`)
    }

    async orderServiceImpactInventory(productId: string, variant_Name: string, qty: number): Promise<number> {
        let this_inventory = await this.getByProdIdVarName(productId, variant_Name)
        console.log("productId",productId,"variant_Name",variant_Name)
        let the_Product: IProduct = await ProductService.get(productId)
        the_Product.variants.map(element => {
            if (element.name == variant_Name)
                return element.availableQuantity = element.availableQuantity - qty
        })
        console.log(this_inventory)
        this_inventory.stock = this_inventory.stock - qty
        this_inventory.availableItems = this_inventory.availableItems - qty
        if (this.updateInventoryInside(this_inventory)) {
            await ProductService.update(the_Product)
        }
        return this_inventory.availableItems
    }

    async createInventoryInside(inventory: Inventory): Promise<ObjectId> {
        let newinventory = this.sanitize(inventory)
        console.log("newinventory", newinventory)
        if (inventory.updatation == 0) newinventory.createdAt = Date.now()
        newinventory.modifiedAt = Date.now()
        if (newinventory.sellingPrice == null) throw new Error(`Selling Price Can't be Empity while creating Inventory`)
        newinventory._id = new ObjectId
        await collections.inventory.insertOne(newinventory)
        return newinventory._id
    }

    async updateInventoryInside(inventory: Inventory): Promise<boolean> {
        let query = { _id: new ObjectId(inventory._id) }
        inventory.updatation += inventory.updatation
        inventory.modifiedAt = Date.now()
        if (inventory.sellingPrice == null) throw new Error(`Selling Price Can't be Empity while creating Inventory`)
        console.log(inventory)
        let result = await collections.inventory.updateOne(query, { $set: inventory })
        return (result.modifiedCount > 0)
    }

    sanitize(b: Inventory): Inventory {
        if (b.productId) new ObjectId(b.productId)
        if (b._id) delete b._id
        if (!b.stock) b.stock = 0
        if (!b.availableItems) b.availableItems = 0
        if (!b.taxAmount) b.taxAmount = 0
        if (!b.sellingPrice) b.sellingPrice = null
        if (b.updatation) b.updatation += b.updatation
        if (!b.updatation) b.updatation = 0
        return b
    }

    // async delete(unitId: string | ObjectId): Promise<boolean> {
    //     const query = { _id: new ObjectId(unitId) };
    //     await collections.units.deleteOne(query);
    //     let allunits = await this.getAll()
    //     let priority: number = 1
    //     for (let unit of allunits) {
    //         const query = { _id: new ObjectId(unit._id) };
    //         delete unit._id;
    //         unit.priority = priority++
    //         await collections.units.updateOne(query, { $set: unit });
    //     }
    //     return
    // }
}

export let InventoryService: InventoryServiceClass = new InventoryServiceClass()