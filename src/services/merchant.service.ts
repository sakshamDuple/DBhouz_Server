import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { ECommisionType, EMerchantStatus, EProductStatus, IMerchant, IProduct } from "../interfaces";
import { ProductService } from "./product.service";

class MerchantServiceClass {

    async get(merchantId: string | ObjectId): Promise<IMerchant> {
        const query = { _id: new ObjectId(merchantId) };
        return (await collections.merchants.findOne(query)) as IMerchant;
    }

    async getMultipleMerchant(merchants: Array<string>): Promise<IMerchant[]> {
        let merchantsObj: Array<ObjectId> = []
        merchants.forEach((element, i) => {
            merchantsObj[i] = new ObjectId(element)
        });
        console.log(merchantsObj)
        let query = { '_id': { '$in': merchantsObj } }
        let Mmerchants: IMerchant[] = await collections.merchants.find(query).sort({ createdAt: -1 }).toArray() as IMerchant[];
        return Mmerchants
    }

    async getByEmail(email: string): Promise<IMerchant> {
        return (await collections.merchants.findOne({ email })) as IMerchant;
    }

    async getAll(activeOnly: boolean): Promise<IMerchant[]> {
        let query: any = {}
        if (activeOnly) query.status = EMerchantStatus.Active
        return (await collections.merchants.find(query).sort({ createdAt: -1 }).toArray()) as IMerchant[];
    }

    async create(newMerchant: IMerchant): Promise<IMerchant> {
        newMerchant = { ...newMerchant }
        const existingMerchant: IMerchant = await this.getByEmail(newMerchant.email)
        if (existingMerchant) {
            console.log("hey")
            throw new Error(`Merchant with this email already exists`)
        }
        newMerchant.createdAt = Date.now()
        delete newMerchant._id
        console.log("Hii")
        newMerchant = this.sanitize(newMerchant)
        const result: InsertOneResult<IMerchant> = await collections.merchants.insertOne(newMerchant);
        newMerchant._id = result.insertedId
        return newMerchant
    }

    async update(merchant: IMerchant): Promise<boolean> {
        merchant = { ...merchant }
        const query = { _id: new ObjectId(merchant._id) };
        merchant.status = EMerchantStatus.InActive
        delete merchant._id;
        let thisStatus = true;
        if (merchant?.identification)
            merchant?.identification.forEach(element => {
                thisStatus = thisStatus && element.approvedByAdmin
            });
        if (thisStatus) merchant.status = EMerchantStatus.Active
        merchant = this.sanitize(merchant)
        let result: UpdateResult = await collections.merchants.updateOne(query, { $set: merchant });
        return (result.modifiedCount > 0)
    }

    async verifyMerchant(merchantId: ObjectId): Promise<boolean> {
        const query = { _id: merchantId };
        let result: UpdateResult = await collections.merchants.updateOne(query, {
            $set: { isEmailVerified: true },
        });
        return result.modifiedCount > 0;
    }

    async doInactiveMerchantProduct(merchantId: ObjectId): Promise<boolean> {
        let products: IProduct[] = await ProductService.getAllByMerchant(merchantId, true)
        let m = false
        if (products.length == 0) {
            m = true
        }
        products.forEach(element => {
            let k = true;
            console.log("element", element)
            element.status = EProductStatus.InActive
            ProductService.update(element)
            k = true;
            m = m && k;
        });
        return m;
    }

    async delete(merchantId: string | ObjectId): Promise<boolean> {
        const query = { _id: new ObjectId(merchantId) };
        const result = await collections.merchants.deleteOne(query);
        return (result && result.deletedCount > 0)
    }

    async editProfile(profile: any): Promise<IMerchant> {   
      const merchantId= profile.merchantId
      const query = { _id: new ObjectId(merchantId) };
        let ThisProf:IMerchant =  await collections.merchants.findOne(query) as IMerchant;
        if(ThisProf!=undefined){
            if(profile.personalAddress!==undefined){

                ThisProf.personalAddress=profile.personalAddress
            }
            if(profile.firstName!==undefined){
                ThisProf.firstName=profile.firstName
            }
            if(profile.lastName!==undefined){
                ThisProf.lastName=profile.lastName
            }
           if(profile.bussiness_name!==undefined){
            ThisProf.bussiness_name=profile.bussiness_name
           }
           if(profile.about!==undefined){
            ThisProf.about=profile.about
           }
          if(profile.phone!==undefined){
            ThisProf.phone=profile.phone
          }
          if(profile.profilePic!==undefined){
            ThisProf.profilePic=profile.profilePic
          }
        }     
        let result: UpdateResult = await collections.merchants.updateOne( query,{
          $set: ThisProf,
        });
        return (result.modifiedCount > 0) ? await collections.merchants.findOne(query) as IMerchant : ThisProf;
      }

    sanitize(o: IMerchant): IMerchant {
        if (!o.firstName) delete o.firstName
        if (!o.lastName) delete o.lastName
        if (!o.isEmailVerified) o.isEmailVerified = false
        if (o.commisionType !== ECommisionType.Fixed && o.commisionType !== ECommisionType.Percentage) {
            delete o.commisionType
        }
        if (o.commisionPercentage) o.commisionPercentage = new Double(Number.parseFloat(o.commisionPercentage.toString()))
        if (o.commisionAmount) o.commisionAmount = new Double(Number.parseFloat(o.commisionAmount.toString()))
        if (o.onboardingAmount) o.onboardingAmount = new Double(Number.parseFloat(o.onboardingAmount.toString()))
        if (o.identification) {
            o.identification.forEach(i => {
                i.documentId = new ObjectId(i.documentId)
            })
        }
        return o
    }
}

export let MerchantService: MerchantServiceClass = new MerchantServiceClass()