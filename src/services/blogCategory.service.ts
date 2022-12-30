import {IblogCategory} from "../interfaces"
import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";

class blogCategoryServiceClass {

    async getblogCategoryByName(name: string): Promise<IblogCategory> {
        return (await collections.blogCategory.findOne({ name })) as IblogCategory;
    }
    async getblogCategoryById(blogCatId: ObjectId): Promise<IblogCategory> {
        return (await collections.blogCategory.findOne({ blogCatId })) as IblogCategory;
    }
    
    sanitizeblogCat(o: IblogCategory): IblogCategory {
        if (!o.description) delete o.description
        if (!o.imageDocumentId) delete o.imageDocumentId
        else o.imageDocumentId = new ObjectId(o.imageDocumentId)
        return o  
    }
    async getBlogCategory(blogCategoryId: string | ObjectId): Promise<IblogCategory> {
        const query = { _id: new ObjectId(blogCategoryId) };
        return (await collections.blogCategory.findOne(query)) as IblogCategory;      
    }

    async createBlogCategory(newblogCategory: IblogCategory): Promise<IblogCategory> {
        
        newblogCategory = { ...newblogCategory }
        newblogCategory.name = newblogCategory.name.toLowerCase()
        const existingCategory: IblogCategory = await this.getblogCategoryByName(newblogCategory.name)
        if (existingCategory) {
            throw new Error(`Category with name ${newblogCategory.name} already exists`)
        }
        newblogCategory.createdAt = Date.now()
        newblogCategory = this.sanitizeblogCat(newblogCategory)
        console.log(newblogCategory,"newc");
        
        const result: InsertOneResult<IblogCategory> = await collections.blogCategory.insertOne(newblogCategory);
        console.log(result,"ressssssss");
        
        newblogCategory._id = result.insertedId
        console.log(newblogCategory,"new1111");
        
        return newblogCategory
    }

    async updateBlogCategory(blogCategory: IblogCategory): Promise<boolean> {
        blogCategory = { ...blogCategory }
        console.log(blogCategory,"bloogcat");
        
        const existingBlogCategory: IblogCategory = await this.getblogCategoryByName(blogCategory.name)
        if (existingBlogCategory && existingBlogCategory._id.toString() !== blogCategory._id.toString()) {
            throw new Error(`Category with name ${blogCategory.name} already exists`)
        }
        console.log(existingBlogCategory,"ee");
        
        const query = { _id: new ObjectId(blogCategory._id) };
        console.log(query,"qqqq");
        
        delete blogCategory._id;
        blogCategory = this.sanitizeblogCat(blogCategory)
        console.log(blogCategory,"bb");
        
        let result: UpdateResult = await collections.blogCategory.updateOne(query, { $set: blogCategory });
        console.log(result,"rr");
        
        return (result.modifiedCount > 0)
    }


    async getAllBlogCategories(): Promise<IblogCategory[]> {
        console.log("inside blog category service");
        
        return (await collections.blogCategory.find({}).sort({ createdAt: -1 }).toArray()) as IblogCategory[];
    }



}

export let blogCategoryService: blogCategoryServiceClass = new blogCategoryServiceClass()