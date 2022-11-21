import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { ICoupon, IdiscountType, IMerchant, IProduct } from "../interfaces";
import { LOG } from "../logger";

class couponServiceClass {

    async createCoupon(coupon: ICoupon): Promise<ICoupon> {
        let thisCoupon = this.sanitize(coupon)
        thisCoupon._id = new ObjectId
        const existingCoupon: ICoupon = await this.getCouponByName(thisCoupon.name)
        if (existingCoupon) {
            throw new Error(`Coupon with this title name '${existingCoupon.name}' already exists`)
        }
        thisCoupon.AccessToMerchantWithProduct.forEach(element => {
            element.merchantId = new ObjectId(element.merchantId)
            element.productId = new ObjectId(element.productId)
        });
        console.log(thisCoupon)
        const result: InsertOneResult<ICoupon> = await collections.coupon.insertOne(thisCoupon);
        thisCoupon._id = result.insertedId
        console.log(thisCoupon)
        return thisCoupon
    }

    async deleteCoupon(couponId: string): Promise<boolean> {
        let query = { _id: new ObjectId(couponId) }
        let deleteThisCoupon = await collections.coupon.deleteOne(query)
        return (deleteThisCoupon && deleteThisCoupon.deletedCount > 0)
    }

    async getCouponByName(name: string): Promise<ICoupon> {
        return await collections.coupon.findOne({ name: name }) as ICoupon
    }

    async giveAccessOfCouponToThisMerchant(couponName: string, merchantId: string): Promise<IMerchant> {
        try {
            let findCoupon: ICoupon = await this.getCouponByName(couponName)
            let theMerchant: IMerchant = await collections.merchants.findOne({ _id: new ObjectId(merchantId) }) as IMerchant
            if (theMerchant) {
                if (!theMerchant.accessToCoupon) theMerchant.accessToCoupon = []
                theMerchant.accessToCoupon.push(findCoupon.name)
                let resultedMerchant = await collections.merchants.findOneAndUpdate({ _id: theMerchant._id }, { "$set": theMerchant })
                if (resultedMerchant.ok == 1) {
                    return await collections.merchants.findOne({ _id: new ObjectId(merchantId) }) as IMerchant
                }
                return
            }
        } catch (error) {
            LOG.error(error)
        }
    }

    async merchantGiveAccessToThisProduct(couponName: string, productId: string): Promise<{ AccessGiven: boolean, message: string }> {
        try {
            let findCoupon: ICoupon = await this.getCouponByName(couponName)
            let theProduct: IProduct = await collections.products.findOne({ _id: new ObjectId(productId) }) as IProduct
            let err: any = null;
            if (theProduct) {
                if (!theProduct.applicableCoupons) theProduct.applicableCoupons = []
                theProduct.applicableCoupons.forEach(element => {
                    console.log("tf", element === findCoupon.name)
                    if (element == findCoupon.name) {
                        err = { AccessGiven: false, message: "merchant already gave access to this product" }
                    }
                });
                if (err != null) return err
                theProduct.applicableCoupons.push(findCoupon.name)
                let resultedMerchant = await collections.products.findOneAndUpdate({ _id: theProduct._id }, { "$set": theProduct })
                if (resultedMerchant.ok == 1) {
                    if (!findCoupon.AccessToMerchantWithProduct) findCoupon.AccessToMerchantWithProduct = []
                    let AccessToMerchantWithProduct = {
                        merchantId: new ObjectId(theProduct.merchantId),
                        productId: new ObjectId(theProduct._id)
                    }
                    findCoupon.AccessToMerchantWithProduct.push(AccessToMerchantWithProduct)
                    console.log("AccessToMerchantWithProduct", findCoupon.AccessToMerchantWithProduct)
                    let resultCoupon = await collections.coupon.findOneAndUpdate({ _id: findCoupon._id }, { "$set": findCoupon })
                    if (resultCoupon.ok == 1) {
                        return { AccessGiven: true, message: "merchant successfully gave access to this product" }
                    }
                    return { AccessGiven: false, message: "merchant successfully gave access to this product but coupon's Access To Merchant With Product failed" }
                }
                return { AccessGiven: false, message: "this merchant isn't able to update with the coupon into this product" }
            }
        } catch (error) {
            LOG.error(error)
        }
    }

    async getAllCoupons(): Promise<ICoupon[]> {
        return await collections.coupon.find().toArray() as ICoupon[]
    }

    async getAllCouponsForThisMerchant(merchantId: string): Promise<ICoupon[]> {
        let theMerchant: IMerchant = await collections.merchants.findOne({ _id: new ObjectId(merchantId) }) as IMerchant
        let arrOfCoupons: Array<string> = theMerchant.accessToCoupon
        return await collections.coupon.find({ 'name': { "$in": arrOfCoupons } }).toArray() as ICoupon[]
    }

    sanitize(b: ICoupon): ICoupon {
        if (b._id) delete b._id
        if (!b.discountType) b.discountType = IdiscountType.Percentage
        return b
    }
}

export let couponService: couponServiceClass = new couponServiceClass()