import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { ICoupon, IMerchant, IProduct } from "../interfaces";
import { LOG } from "../logger";

class couponServiceClass {

    async createCoupon(coupon: ICoupon): Promise<ICoupon> {
        let thisCoupon = this.sanitize(coupon)
        const existingCoupon: ICoupon = await this.getCouponByName(thisCoupon.name)
        if (existingCoupon) {
            throw new Error(`Banner with this title name '${existingCoupon.name}' already exists`)
        }
        const result: InsertOneResult<ICoupon> = await collections.banner.insertOne(thisCoupon);
        thisCoupon._id = result.insertedId
        console.log(thisCoupon)
        return thisCoupon
    }

    async getCouponByName(name: string): Promise<ICoupon> {
        return await collections.coupon.findOne({ name: name }) as ICoupon
    }

    async giveAccessOfCouponToThisMerchant(couponName: string, merchantId: string): Promise<IMerchant> {
        try {
            let findCoupon: ICoupon = await this.getCouponByName(couponName)
            let theMerchant: IMerchant = await collections.merchants.findOne({ _id: merchantId }) as IMerchant
            if (theMerchant) {
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

    async merchantGiveAccessToThisProduct(couponName: string, productId: string): Promise<IProduct> {
        try {
            let findCoupon: ICoupon = await this.getCouponByName(couponName)
            let theProduct: IProduct = await collections.merchants.findOne({ _id: productId }) as IProduct
            if (theProduct) {
                theProduct.applicableCoupons.push(findCoupon.name)
                let resultedMerchant = await collections.merchants.findOneAndUpdate({ _id: theProduct._id }, { "$set": theProduct })
                if (resultedMerchant.ok == 1) {
                    return await collections.merchants.findOne({ _id: new ObjectId(productId) }) as IProduct
                }
                return
            }
        } catch (error) {
            LOG.error(error)
        }
    }

    async getAllCoupons(): Promise<ICoupon[]> {
        return await collections.coupon.find().toArray() as ICoupon[]
    }

    async getAllCouponsForThisMerchant(merchantId: string): Promise<ICoupon[]> {
        let theMerchant: IMerchant = await collections.merchants.findOne({ _id: merchantId }) as IMerchant
        let arrOfCoupons: Array<string> = theMerchant.accessToCoupon
        return await collections.coupon.find({ 'name': { "$in": arrOfCoupons } }).toArray() as ICoupon[]
    }

    sanitize(b: ICoupon): ICoupon {
        if (b._id) delete b._id
        return b
    }

}

export let couponService: couponServiceClass = new couponServiceClass()