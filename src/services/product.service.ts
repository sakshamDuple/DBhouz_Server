import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { EProductStatus, IProduct, IReview, Order } from "../interfaces";

class ProductServiceClass {

    async get(productId: string | ObjectId): Promise<IProduct> {
        const query = { _id: new ObjectId(productId) };
        return (await collections.products.findOne(query)) as IProduct;
    }

    async getAll(activeOnly: boolean): Promise<IProduct[]> {
        let query: any = {}
        if (activeOnly) {
            query.status = EProductStatus.Active
        }
        return (await collections.products.find(query).sort({ createdAt: -1 }).toArray()) as IProduct[];
    }

    async searchSpecific(categoryId: string | ObjectId, searchVal: string): Promise<any[]> {
        let query: any = { categoryId: new ObjectId(categoryId) }
        let agg = [
            {
                '$match': query
            }, {
                '$match': {
                    '$or': [
                        {
                            'name': new RegExp(searchVal, 'i')
                        }
                    ]
                }
            }, {
                '$project': {
                    '_id': 0,
                    'name': 1
                }
            }
        ];
        let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
        let subCategories = await collections.subCategories.aggregate(agg).sort({ createdAt: -1 }).toArray()
        return [{ products: products }, { subCategories: subCategories }]
    }

    async getAllByMerchant(merchantId: string | ObjectId, activeOnly: boolean): Promise<IProduct[]> {
        let query: any = { merchantId: new ObjectId(merchantId) }
        if (activeOnly) {
            query.status = EProductStatus.Active
        }
        return (await collections.products.find(query).sort({ createdAt: -1 }).toArray()) as IProduct[];
    }

    async getAllByCategory(categoryId: string | ObjectId, activeOnly: boolean): Promise<IProduct[]> {
        let query: any = { categoryId: new ObjectId(categoryId) }
        if (activeOnly) {
            query.status = EProductStatus.Active
        }
        return (await collections.products
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()) as IProduct[];
    }

    async getAllBySubCategory(subCategoryId: string | ObjectId, activeOnly: boolean): Promise<IProduct[]> {
        let query: any = { subCategoryId: new ObjectId(subCategoryId) }
        if (activeOnly) {
            query.status = EProductStatus.Active
        }
        return (await collections.products
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()) as IProduct[];
    }

    async create(newProduct: IProduct): Promise<IProduct> {
        newProduct = { ...newProduct }
        newProduct.createdAt = Date.now()
        newProduct = this.sanitize(newProduct)
        if (!newProduct.seo) newProduct.seo = {
            metaTagDescription: "",
            metaTagKeywords: "",
            metaTagTitle: ""
        }
        delete newProduct._id
        console.log(newProduct)
        const result: InsertOneResult<IProduct> = await collections.products.insertOne(newProduct);
        newProduct._id = result.insertedId
        return newProduct
    }

    async update(product: IProduct): Promise<boolean> {
        product = { ...product }
        product = this.sanitize(product)
        const query = { _id: new ObjectId(product._id) };
        delete product._id;
        let result: UpdateResult = await collections.products.updateOne(query, { $set: product });
        return (result.modifiedCount > 0)
    }

    async delete(productId: string | ObjectId): Promise<boolean> {
        const query = { _id: new ObjectId(productId) };
        const result = await collections.products.deleteOne(query);
        return (result && result.deletedCount > 0)
    }

    async getAllByCategoryFilter(categoryId: string, pfrom: number, pto: number): Promise<IProduct[]> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        return (await collections.products
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()) as IProduct[];
    }

    async getAllByCategoryFilterNew(categoryId: string, pfrom: number, pto: number, sortByName: string, PageLimit: number, Start: number, colorId: string[]): Promise<IProduct[]> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        // console.log(pfrom, pto)
        if (colorId[0] != "") {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": {"$in": m} }
        }
        if (sortByName == "Asc") {
            return (await collections.products
                .find(query)
                .sort({ name: -1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as IProduct[];
        } else if (sortByName == "Desc") {
            return (await collections.products
                .find(query)
                .sort({ name: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as IProduct[];
        }
        return (await collections.products
            .find(query)
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as IProduct[];
    }

    async getAllByCategoryFilterNewVal(categoryId: string, pfrom: number, pto: number, colorId: string[]): Promise<Number> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        if (colorId[0] != "") {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": {"$in": m} }
        }
        return (await collections.products
            .find(query)
            .toArray()).length;
    }

    async getAllBySubCategoryFilterNew(subCategoryId: Array<string>, pfrom: number, pto: number, sortByName: string, PageLimit: number, Start: number, colorId: string[]): Promise<IProduct[]> {
        let k = []
        subCategoryId.forEach(element => {
            k.push(new ObjectId(element))
        });
        let query: any = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto } }
        if (colorId[0] != "" && colorId.length>0) {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": {"$in": m} }
        }
        if (sortByName == "Asc") {
            return (await collections.products
                .find(query)
                .sort({ name: -1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as IProduct[];
        } else if (sortByName == "Desc") {
            return (await collections.products
                .find(query)
                .sort({ name: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as IProduct[];
        }
        return (await collections.products
            .find(query)
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as IProduct[];
    }

    async getAllBySubCategoryFilterNewVal(subCategoryId: Array<string>, pfrom: number, pto: number, colorId: string[]): Promise<Number> {
        let k = []
        subCategoryId.forEach(element => {
            k.push(new ObjectId(element))
        });
        let query: any = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto } }
        if (colorId[0] != "" && colorId.length>0) {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": {"$in": m} }
        }
        return (await collections.products
            .find(query)
            .toArray()).length;
    }

    async get_Colors_MaxPrice(categoryId: string): Promise<any> {
        try{
            let agg = [
                {
                    '$match': {
                        'categoryId': new ObjectId(categoryId)
                    }
                }, {
                    '$group': {
                        '_id': 'null',
                        'colors': {
                            '$push': '$variants.colorId'
                        },
                        'maxPrice': {
                            '$max': '$variants.price'
                        }
                    }
                }
            ]
            let res = await collections.products.aggregate(agg).toArray()
            let arr = [];
            for (let item of res[0].colors) for (let color of item) arr.push(color);
            let agg2 = [
                {
                    '$match': {
                        '_id': { "$in" : arr}
                    }
                }
            ]
            let res2 = await collections.colors.aggregate(agg2).toArray()
            return {colors:res2, maxPrice:res[0].maxPrice}
        } catch(error) {
            return {}
        }
    }

    async getAllBySubCategoryFilter(subCategoryId: string, pfrom: number, pto: number): Promise<IProduct[]> {
        console.log(subCategoryId, pfrom, pto)
        let query: any = { subCategoryId: new ObjectId(subCategoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        return (await collections.products
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()) as IProduct[];
    }

    async doReview(review: IReview, productId: string): Promise<any> {
        let update = false
        let thisId = new ObjectId(productId)
        let product: IProduct = await collections.products.findOne(thisId) as IProduct
        let Order: Order = await collections.orders.findOne(review.orderId) as Order
        const query2 = { _id: new ObjectId(Order._id.toString()) };
        let rating: number = product.rating
        let len = product.review.length
        let allReview: Array<IReview> = product.review
        async function func() {
            await Order.products.map(async item => {
                if (item.reviewFlagOfThisProduct == false && product._id.toString() == item.productId) {
                    let newRating = (rating * len + review.rating) / (len + 1)
                    product.rating = newRating;
                    allReview.push(review)
                    product.review = allReview
                    const query1 = { _id: new ObjectId(product._id.toString()) };
                    console.log(product)
                    await collections.products.updateOne(query1, { $set: product })
                    item.reviewFlagOfThisProduct = true
                    await collections.orders.updateOne(query2, { $set: Order })
                    update = true
                    return update
                }
            })
            return update
        }
        return {
            Update: await func().then((val) => {
                return val
            }), Review: review
        }
    }

    sanitize(o: IProduct): IProduct {
        if (o.merchantId) o.merchantId = new ObjectId(o.merchantId)
        if (o.brandId) o.brandId = new ObjectId(o.brandId)
        if (o.categoryId) o.categoryId = new ObjectId(o.categoryId)
        if (o.subCategoryId) o.subCategoryId = new ObjectId(o.subCategoryId)
        if (!o.description) delete o.description
        if (o.images) o.images.forEach(i => {
            i.documentId = new ObjectId(i.documentId)
        })
        if (!o.rating) o.rating = 0;
        if (!o.review) o.review = [];
        if (o.variantParameters) {
            if (o.variantParameters.dimensionUnitId) {
                o.variantParameters.dimensionUnitId = new ObjectId(o.variantParameters.dimensionUnitId)
            } else delete o.variantParameters.dimensionUnitId
        }
        if (o.variants) o.variants.forEach(v => {
            if (!v.priority || v.priority < 0 || Number.isNaN(v.priority)) {
                delete v.priority
            }
            if (v.images) v.images.forEach(i => {
                i.documentId = new ObjectId(i.documentId)
            })
            if (!v.colorId) delete v.colorId
            else v.colorId = new ObjectId(v.colorId)
            if (Number.isNaN(v.dimensions.width)) delete v.dimensions.width
            if (Number.isNaN(v.dimensions.thickness)) delete v.dimensions.thickness
            if (Number.isNaN(v.minPurchaseQuantity)) delete v.minPurchaseQuantity
            if (Number.isNaN(v.availableQuantity)) delete v.availableQuantity
            if (Number.isNaN(v.discountPercentage)) delete v.discountPercentage
            if (Number.isNaN(v.price)) delete v.price
            if (Number.isNaN(v.warranty_period)) delete v.warranty_period
            if (!Number.isNaN(v.price)) v.price = new Double(Number.parseFloat(v.price.toString()))
            if (v.dimensions) {
                if (!Number.isNaN(v.dimensions.height)) v.dimensions.height = new Double(Number.parseFloat(v.dimensions.height.toString()))
                if (!Number.isNaN(v.dimensions.width)) v.dimensions.width = new Double(Number.parseFloat(v.dimensions.width.toString()))
                if (!Number.isNaN(v.dimensions.thickness)) v.dimensions.thickness = new Double(Number.parseFloat(v.dimensions.thickness.toString()))
            }
        })
        return o
    }
}

export let ProductService: ProductServiceClass = new ProductServiceClass()