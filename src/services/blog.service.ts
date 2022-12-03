import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import {Iblog} from "../interfaces"

class blogServiceClass {


    async getblogByName(title: string): Promise<Iblog> {
        return (await collections.blog.findOne({ title })) as Iblog;
    }

    sanitizeblog(o: Iblog): Iblog {
        if(!o.category) delete o.category
        if (!o.description) delete o.description
        if (!o.imageDocumentId) delete o.imageDocumentId
        else o.imageDocumentId = new ObjectId(o.imageDocumentId)
        return o  
    }
    async getBlog(blogId: string | ObjectId): Promise<Iblog> {
        const query = { _id: new ObjectId(blogId) };
        return (await collections.blog.findOne(query)) as Iblog;      
    }

    async createBlog(newblog: Iblog): Promise<Iblog> {
        console.log(newblog,"newww");
        
        newblog = { ...newblog }
        newblog.title = newblog.title.toLowerCase()
        console.log(newblog.title,"ttitle");
        
        const existingBlog: Iblog = await this.getblogByName(newblog.title)
        console.log(existingBlog,"exxxxxxx");
        
        if (existingBlog) {
            throw new Error(`Category with name ${newblog.title} already exists`)
        }
        newblog.createdAt = Date.now()
        newblog = this.sanitizeblog(newblog)
        console.log(newblog,"nnnnnnnnn"); 
        const result: InsertOneResult<Iblog> = await collections.blog.insertOne(newblog);
        
        newblog._id = result.insertedId
    
        return newblog
    }
    async updateBlog(blog: Iblog): Promise<boolean> {
        blog = { ...blog }
        const existingBlog: Iblog = await this.getblogByName(blog.title)
        if (existingBlog && existingBlog._id.toString() !== blog._id.toString()) {
            throw new Error(`Category with name ${blog.title} already exists`)
        }
        const query = { _id: new ObjectId(blog._id) };
        delete blog._id;
        blog = this.sanitizeblog(blog)
        let result: UpdateResult = await collections.blog.updateOne(query, { $set: blog });
        return (result.modifiedCount > 0)
    }



    async getAllBlog(): Promise<Iblog[]> {
        console.log("inside blog category service");
        
        return (await collections.blog.find({}).sort({ createdAt: -1 }).toArray()) as Iblog[];
    }


    async getblogById(blogId: ObjectId): Promise<Iblog> {

        return (await collections.blog.findOne({ blogId })) as Iblog;
    }



}

export let blogService: blogServiceClass = new blogServiceClass()