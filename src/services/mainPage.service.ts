import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { Banner, Banner_Type, MainPage } from "../interfaces";

class mainPageServiceClass {

    async get(BannerId: string | ObjectId): Promise<Banner> {
        const query = { _id: new ObjectId(BannerId) };
        return (await collections.banner.findOne(query)) as Banner;
    }

    async getBannerByName(name: string): Promise<Banner> {
        return (await collections.banner.findOne({ Banner_Title: name })) as Banner;
    }

    async getAllBanner(): Promise<Banner[]> {
        return (await collections.banner.find({}).sort({ priority: 1 }).toArray()) as Banner[];
    }

    async getTotalBannerCount(): Promise<number> {
        return (await collections.banner.countDocuments()) as number;
    }

    async createNewMainB(newBanner: Banner): Promise<Banner> {
        newBanner = { ...newBanner }
        newBanner = this.sanitizeMainB(newBanner)
        const existingBanner: Banner = await this.getBannerByName(newBanner.Banner_Title)
        if (existingBanner) {
            throw new Error(`Banner with this title name ${newBanner.Banner_Title} already exists`)
        }
        const result: InsertOneResult<Banner> = await collections.banner.insertOne(newBanner);
        newBanner._id = result.insertedId
        console.log(newBanner)
        return newBanner
    }

    async bannerUpdate(banner: Banner, BannerType: Banner_Type): Promise<boolean> {
        banner = { ...banner }
        if (BannerType == Banner_Type.Main) { 
            banner = this.sanitizeMainB(banner) 
        } else { 
            banner = this.sanitizeSmallB(banner) 
        }
        const query = { _id: new ObjectId(banner._id) };
        delete banner._id;
        let result: UpdateResult = await collections.banner.updateOne(query, { $set: banner });
        return (result.modifiedCount > 0)
    }

    async createOrReplaceSmallB1(newBanner: Banner): Promise<Banner> {
        newBanner = { ...newBanner }
        newBanner = this.sanitizeSmallB(newBanner)
        await collections.banner.findOneAndDelete({ Banner_Type: Banner_Type.Small1 })
        const result: InsertOneResult<Banner> = await collections.banner.insertOne(newBanner);
        newBanner._id = result.insertedId
        return newBanner
    }

    async createOrReplaceSmallB2(newBanner: Banner): Promise<Banner> {
        newBanner = { ...newBanner }
        newBanner = this.sanitizeSmallB(newBanner)
        await collections.banner.findOneAndDelete({ Banner_Type: Banner_Type.Small2 })
        const result: InsertOneResult<Banner> = await collections.banner.insertOne(newBanner);
        newBanner._id = result.insertedId
        return newBanner
    }

    async deleteOneMainBanner(BannerId: string | ObjectId): Promise<boolean> {
        const query = { _id: new ObjectId(BannerId) };
        await collections.banner.deleteOne(query);
        let allbanners = await this.getAllBanner()
        let priority: number = 1
        for (let banner of allbanners) {
            const query = { _id: new ObjectId(banner._id) };
            delete banner._id;
            banner.priority = priority++
            await collections.banner.updateOne(query, { $set: banner });
        }
        return
    }

    async getAllMainBannerIds(): Promise<ObjectId[]> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Main'
                }
            }, {
                '$group': {
                    '_id': "None",
                    'mainBanners': {
                        '$push': '$_id'
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'mainBanners': 1
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        return m[0].mainBanners
    }

    async getAllMainBanners(): Promise<any[]> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Main'
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        return m
    }

    async getSmallBanner1(): Promise<any> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Small1'
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        console.log(m)
        return m[0]
    }

    async getSmallBanner2(): Promise<any> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Small2'
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        console.log(m)
        return m[0]
    }

    async getSmallBanner1Id(): Promise<ObjectId> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Small1'
                }
            }, {
                '$project': {
                    '_id': 1,
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        console.log(m)
        return m[0]._id
    }

    async getSmallBanner2Id(): Promise<ObjectId> {
        let agg = [
            {
                '$match': {
                    'Banner_Type': 'Small2'
                }
            }, {
                '$project': {
                    '_id': 1,
                }
            }
        ]
        let m = await collections.banner.aggregate(agg).toArray()
        console.log(m)
        return m[0]._id
    }

    async mainPageCreation(mainPage: MainPage): Promise<MainPage> {
        mainPage.createdAt = Date.now()
        mainPage.updatedAt = Date.now()
        mainPage.MainBanner = await this.getAllMainBannerIds();
        mainPage.SmallBanner1 = await this.getSmallBanner1Id();
        mainPage.SmallBanner2 = await this.getSmallBanner2Id();
        let k: any = await collections.mainPage.find().toArray();
        const query = { _id: k[0]?._id };
        if (k) {
            console.log(k)
            await collections.mainPage.deleteOne(query)
        }
        const result: InsertOneResult<MainPage> = await collections.mainPage.insertOne(mainPage);
        mainPage._id = result.insertedId
        return mainPage
    }

    async getMainPageIfAdded(): Promise<MainPage[]> {
        return await collections.mainPage.find().toArray() as MainPage[];
    }

    sanitizeSmallB(b: Banner): Banner {
        if (b.Button_Title) delete b.Button_Title
        return b
    }

    sanitizeMainB(b: Banner): Banner {
        if (b.priority) delete b.priority
        return b
    }
}

export let mainPageService: mainPageServiceClass = new mainPageServiceClass()