import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { IUser, EProductStatus, Inventory, IProduct, IProductVariant, IReview, Order } from "../interfaces";
import { InventoryService } from "./inventory.service";

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

    async searchSpecific(categoryId: string | ObjectId, searchVal: string, field: string): Promise<any[]> {
        if (field == "cat") {
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
                        '_id': 1,
                        'name': 1
                    }
                }
            ];
            let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
            let subCategories = await collections.subCategories.aggregate(agg).sort({ createdAt: -1 }).toArray()
            return [{ products: products }, { subCategories: subCategories }]
        } else if (field == "prd") {
            let query: any = { merchantId: new ObjectId(categoryId) }
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
                        '_id': 1,
                        'name': 1
                    }
                }
            ];
            let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
            let subCategories = await collections.subCategories.aggregate(agg).sort({ createdAt: -1 }).toArray()
            return [{ products: products }, { subCategories: subCategories }]
        } else if (field == "admprd") {
            let agg = [
                {
                    '$match': {
                        '$or': [
                            {
                                'name': new RegExp(searchVal, 'i')
                            }
                        ]
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'name': 1
                    }
                }
            ];
            let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
            let subCategories = await collections.subCategories.aggregate(agg).sort({ createdAt: -1 }).toArray()
            return [{ products: products }, { subCategories: subCategories }]
        }
    }

    async searchAll(searchVal: string): Promise<any[]> {
        let agg = [
            {
                '$match': {
                    'status': EProductStatus.Active
                }
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
                    '_id': 1,
                    'name': 1,
                    'categoryId': 1,
                    'subCategoryId': 1
                }
            }
        ];
        let agg2 = [
            {
                '$match': {
                    '$or': [
                        {
                            'name': new RegExp(searchVal, 'i')
                        }
                    ]
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'categoryId': 1
                }
            }
        ];
        let agg3 = [
            {
                '$match': {
                    '$or': [
                        {
                            'name': new RegExp(searchVal, 'i')
                        }
                    ]
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1
                }
            }
        ];
        let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
        let subCategories = await collections.subCategories.aggregate(agg2).sort({ createdAt: -1 }).toArray()
        let categories = await collections.categories.aggregate(agg3).sort({ createdAt: -1 }).toArray()
        return [{ products: products }, { subCategories: subCategories }, { category: categories }]
    }

    async getTopProducts(): Promise<IProduct[]> {
        let agg = [
            {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'merchantId': 1,
                    'status': 1,
                    'categoryId': 1,
                    'description': 1,
                    'subCategoryId': 1,
                    'images': 1,
                    'variants': 1,
                    'createdAt': 1,
                    'rating': 1,
                    'review': 1,
                    'variantParameters': 1,
                    'seo': 1,
                    'applicableCoupons': 1,
                    'totalReview': {
                        '$cond': {
                            'if': {
                                '$isArray': '$review'
                            },
                            'then': {
                                '$size': '$review'
                            },
                            'else': 'NA'
                        }
                    }
                }
            },
            {
                '$sort': {
                    'totalReview': -1
                }
            },
            { '$limit': 5 }
        ]
        return await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray() as IProduct[]
    }

    async getAllReviewOfThisUser(userId: string | ObjectId): Promise<any[]> {
        let query: any = { 'review.userId': new ObjectId(userId) }
        let agg = [
            {
                '$match': query
            }
        ]
        let products = await collections.products.aggregate(agg).sort({ createdAt: -1 }).toArray()
        return products
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
        product.review.forEach(element => {
            element.orderId = new ObjectId(element.orderId)
            element.reviewId = new ObjectId(element.reviewId)
            element.userId = new ObjectId(element.userId)
        });
        delete product._id;
        console.log("product.variants", product)
        product.variants.forEach(async element => {
            if (!element.inventoryId) {
                let inventory: Inventory = {
                    productId: query._id,
                    sellingPrice: element.price,
                    variant_Name: element.name,
                    stock: element.availableQuantity,
                    availableItems: element.availableQuantity,
                    taxAmount: element.priceByAdmin,
                }
                element.inventoryId = await InventoryService.createInventoryInside(inventory)
            } else {
                let thisVariantInventory: Inventory = await collections.inventory.findOne(element.inventoryId) as Inventory
                thisVariantInventory.availableItems = element.availableQuantity
                thisVariantInventory.stock = element.availableQuantity
                thisVariantInventory.taxAmount = element.priceByAdmin
                thisVariantInventory.sellingPrice = element.price
            }
        });
        console.log(product)
        let result: UpdateResult = await collections.products.updateOne(query, { $set: product });
        return (result.modifiedCount > 0)
    }

    async delete(productId: string | ObjectId): Promise<boolean> {
        console.log(productId)
        // let nproductId = new ObjectId(productId.toString())
        // const query = { _id: productId };
        const result = await collections.products.deleteOne({ _id: new ObjectId(productId) });
        return (result && result.deletedCount > 0)
    }

    async getAllByCategoryFilter(categoryId: string, pfrom: number, pto: number): Promise<IProduct[]> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        return (await collections.products
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()) as IProduct[];
    }

    async getAllByCategoryFilterNew(categoryId: string, pfrom: number, pto: number, sortByName: string, PageLimit: number, Start: number, colorId: string[], boolean): Promise<IProduct[]> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        if (boolean) {
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, status: "ACTIVE" }
        }
        // console.log(pfrom, pto)
        if (colorId[0] != "") {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m } }
            if (boolean) {
                query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m }, status: "ACTIVE" }
            }
        }
        if (sortByName == "Asc") {
            return (await collections.products
                .find(query)
                .sort({ "variants.price": 1 }).skip(Start - 1)
                .limit(PageLimit)
                .toArray()) as IProduct[];
        } else if (sortByName == "Desc") {
            return (await collections.products
                .find(query)
                .sort({ "variants.price": -1 }).skip(Start - 1)
                .limit(PageLimit)
                .toArray()) as IProduct[];
        }
        return (await collections.products
            .find(query).skip(Start - 1)
            .limit(PageLimit)
            .toArray()) as IProduct[];
    }

    async getAllByCategoryFilterNewVal(categoryId: string, pfrom: number, pto: number, colorId: string[], boolean): Promise<Number> {
        let query: any = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto } }
        if (boolean) {
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, status: "ACTIVE" }
        }
        if (colorId[0] != "") {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m } }
            if (boolean) {
                query = { categoryId: new ObjectId(categoryId), "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m }, status: "ACTIVE" }
            }
        }
        return (await collections.products
            .find(query)
            .toArray()).length;
    }

    async getAllBySubCategoryFilterNew(subCategoryId: Array<string>, pfrom: number, pto: number, sortByName: string, PageLimit: number, Start: number, colorId: string[], boolean): Promise<IProduct[]> {
        let k = []
        subCategoryId.forEach(element => {
            k.push(new ObjectId(element))
        });
        let query: any = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto } }
        if (boolean) {
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, status: "ACTIVE" }
        }
        if (colorId[0] != "" && colorId.length > 0) {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m } }
            if (boolean) {
                query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m }, status: "ACTIVE" }
            }
        }
        if (sortByName == "Asc") {
            return (await collections.products
                .find(query)
                .sort({ "variants.price": 1 }).skip(Start - 1)
                .limit(PageLimit)
                .toArray()) as IProduct[];
        } else if (sortByName == "Desc") {
            return (await collections.products
                .find(query)
                .sort({ "variants.price": -1 }).skip(Start - 1)
                .limit(PageLimit)
                .toArray()) as IProduct[];
        }
        return (await collections.products
            .find(query).skip(Start - 1)
            .limit(PageLimit)
            .toArray()) as IProduct[];
    }

    async getAllBySubCategoryFilterNewVal(subCategoryId: Array<string>, pfrom: number, pto: number, colorId: string[], boolean): Promise<Number> {
        let k = []
        subCategoryId.forEach(element => {
            k.push(new ObjectId(element))
        });
        let query: any = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto } }
        if (boolean) {
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, status: "ACTIVE" }
        }
        if (colorId[0] != "" && colorId.length > 0) {
            let m = []
            colorId.forEach(element => {
                m.push(new ObjectId(element))
            });
            query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m } }
            if (boolean) {
                query = { subCategoryId: { "$in": k }, "variants.price": { $gte: pfrom, $lte: pto }, "variants.colorId": { "$in": m }, status: "ACTIVE" }
            }
        }
        return (await collections.products
            .find(query)
            .toArray()).length;
    }

    async get_Colors_MaxPrice(categoryId: string): Promise<any> {
        try {
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
                        '_id': { "$in": arr }
                    }
                }
            ]
            let res2 = await collections.colors.aggregate(agg2).toArray()
            return { colors: res2, maxPrice: res[0].maxPrice }
        } catch (error) {
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

    getVariant(product: IProduct, variant: string): IProductVariant {
        let nvariant: IProductVariant
        if (product.variants) {
            product.variants.forEach(element => {
                if (element.name == variant) {
                    console.log(true)
                    nvariant = element
                }
            });
        }
        return nvariant
    }

    async getProductVariant(productId: string, variant: string): Promise<any> {
        let thisId = new ObjectId(productId)
        let product: IProduct = (await collections.products.findOne(thisId)) as IProduct
        product = { ...product }
        let k = await this.getVariant(product, variant)
        console.log(k)
        if (k) return k
        return "variant not found"
    }

    func(Order: Order, product: IProduct, rating: number, allReview: Array<IReview>, len: number, review: IReview): boolean {
        let update: boolean = false
        // console.log("hge \n \n \n \n",Order, product, rating, allReview, len, review)
        const query2 = { _id: new ObjectId(Order._id.toString()) };
        if (Order.products)
            Order.products.forEach(async item => {
                console.log(item.reviewFlagOfThisProduct == false)
                console.log(product._id.toString(), item.productId)
                if (item.reviewFlagOfThisProduct == false && product._id.toString() == item.productId) {
                    let newRating = (rating * len + review.rating) / (len + 1)
                    product.rating = newRating;
                    allReview.push(review)
                    review.orderId = new ObjectId(review.orderId)
                    review.reviewId = new ObjectId(review.reviewId)
                    review.userId = new ObjectId(review.userId)
                    product.review = allReview
                    const query1 = { _id: new ObjectId(product._id.toString()) };
                    console.log(product)
                    await collections.products.updateOne(query1, { $set: product })
                    console.log("HIi")
                    item.reviewFlagOfThisProduct = true
                    await collections.orders.updateOne(query2, { $set: Order })
                    console.log("Hiii")
                    update = true
                    return update
                }
            })
        return update
    }

    async doReview(review: IReview, productId: string): Promise<any> {
        let thisId = new ObjectId(productId)
        console.log(thisId)
        let product: IProduct = await collections.products.findOne(thisId) as IProduct
        let Order: Order = await collections.orders.findOne(review.orderId) as Order
        console.log("product", product)
        let rating: number = product.rating
        let len = product.review.length
        let allReview: Array<IReview> = product.review
        let Update = await this.func(Order, product, rating, allReview, len, review)
        // console.log(Order, product, rating, allReview, len, review)
        return {
            Update, Review: review
        }
        // return "review not made"
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
        if (o.brandId) delete o.brandId
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
            if (v.inventoryId) v.inventoryId = new ObjectId(v.inventoryId)
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
            if (Number.isNaN(v.priceByAdmin)) delete v.priceByAdmin
            if (Number.isNaN(v.priceByMerchant)) delete v.priceByMerchant
            if (Number.isNaN(v.warranty_period)) delete v.warranty_period
            if (!Number.isNaN(v.price)) v.price = Number.parseFloat(v.price.toString())
            if (v.dimensions) {
                if (!Number.isNaN(v.dimensions.height)) v.dimensions.height = new Double(Number.parseFloat(v.dimensions.height.toString()))
                if (!Number.isNaN(v.dimensions.width)) v.dimensions.width = new Double(Number.parseFloat(v.dimensions.width.toString()))
                if (!Number.isNaN(v.dimensions.thickness)) v.dimensions.thickness = new Double(Number.parseFloat(v.dimensions.thickness.toString()))
            }
        })
        return o
    }


    sanitize2(o: IProduct): IProduct {
        if (!o.recomendations) o.recomendations = 0;
        return o
    }

    async incRecomendations(product: IProduct, userId: string): Promise<boolean> {

        product = { ...product }
        product = this.sanitize2(product)
        let foundUser: IUser = await collections.users.findOne({ _id: new ObjectId(userId) }) as IUser
        let flag = 0
        let recomendations= product.recomendations
        if (foundUser.recommendedProductByThisUser !== undefined) {
            console.log("inside if");
            
            foundUser.recommendedProductByThisUser?.forEach(element => {
                console.log(element, "el");
                console.log(element==product._id, "222222");
                if (element!=product._id) {
                    flag = 1
                } else {
                    console.log("User Already recommended this product ")
                    return flag = 0
                }
            });
            console.log(flag,"fffffff")
            if (flag == 1) {
                recomendations+= 1
              }
        }
        else{
            console.log("inside else");
            
            recomendations+=1
        }
        console.log(recomendations,"recccc");
        
        product.recomendations=recomendations
        const query = { _id: new ObjectId(product._id) };


        let result: UpdateResult = await collections.products.updateOne(query, { $set: product });
        console.log(result,"rrr");
        if(result.modifiedCount > 0) return true
        return false
    }
    sanitize3(o: IProduct): IProduct {
        if (!o.unrecomendations) o.unrecomendations = 0;
        return o
    }
    async dontRecomend(product: IProduct): Promise<boolean> {
        product = { ...product }
        product = this.sanitize3(product)
        product.unrecomendations += 1
        const query = { _id: new ObjectId(product._id) };


        let result: UpdateResult = await collections.products.updateOne(query, { $set: product });
        return (result.modifiedCount > 0)
    }





}

export let ProductService: ProductServiceClass = new ProductServiceClass()