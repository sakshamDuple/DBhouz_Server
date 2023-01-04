import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { Iblog, Icomment } from "../interfaces"

class blogServiceClass {


    async getblogByName(title: string): Promise<Iblog> {
        return (await collections.blog.findOne({ title })) as Iblog;
    }

    sanitizeblog(o: Iblog): Iblog {
        if (!o.category) delete o.category
        if (!o.description) delete o.description
        if (!o.imageDocumentId) delete o.imageDocumentId
        else o.imageDocumentId = new ObjectId(o.imageDocumentId)
        if(!o.blogImages) delete o.blogImages
        return o
    }
    async getBlog(blogId: string | ObjectId): Promise<Iblog> {
        const query = { _id: new ObjectId(blogId) };
        return (await collections.blog.findOne(query)) as Iblog;
    }

    async createBlog(newblog: Iblog): Promise<Iblog> {
        console.log(newblog, "newww");

        newblog = { ...newblog }
        newblog.title = newblog.title.toLowerCase()
        console.log(newblog.title, "ttitle");

        const existingBlog: Iblog = await this.getblogByName(newblog.title)
        console.log(existingBlog, "exxxxxxx");

        if (existingBlog) {
            throw new Error(`Category with name ${newblog.title} already exists`)
        }
        newblog.createdAt = Date.now()
        newblog = this.sanitizeblog(newblog)
        console.log(newblog, "nnnnnnnnn");
        const result: InsertOneResult<Iblog> = await collections.blog.insertOne(newblog);

        newblog._id = result.insertedId

        return newblog
    }
    async updateBlog(blog: Iblog): Promise<boolean> {
        console.log(blog,"blo");
        
        blog = { ...blog }
        const existingBlog: Iblog = await this.getblogByName(blog.title)
        if (existingBlog && existingBlog._id.toString() !== blog._id.toString()) {
            throw new Error(`Category with name ${blog.title} already exists`)
        }
        const query = { _id: new ObjectId(blog._id) };
        console.log(query,"queery");
        
        delete blog._id;
        blog = this.sanitizeblog(blog)
        console.log(blog,"bloo");
        
        let result: UpdateResult = await collections.blog.updateOne(query, { $set: blog });
        console.log(result,"rrrr");
        
        return (result&&result.modifiedCount > 0)
    }



    async getAllBlog(): Promise<Iblog[]> {
        console.log("inside blog category service");

        return (await collections.blog.find({}).sort({ createdAt: -1 }).toArray()) as Iblog[];
    }

    async deleteBlog(blogId: string | ObjectId): Promise<boolean> {
        const query = { _id: new ObjectId(blogId) };
        const result = await collections.blog.deleteOne(query);
        return (result && result.deletedCount > 0)
    }

    async getblogById(blogId: string | ObjectId): Promise<Iblog> {
        console.log(blogId, "inside blog service");

        const query = { _id: new ObjectId(blogId) };

        return (await collections.blog.findOne(query)) as Iblog;
    }

    // async getblogByTitle(blogTitle: string | ObjectId): Promise<Iblog> {
    //     console.log(blogTitle,"inside blog service");

    //     const query = {blogTitle}
    //     let result: UpdateResult = await collections.blog.updateOne(query, { $set: blog });
    //     return (await collections.blog.findOne(query)) as Iblog;
    // }
    async getblogByTitle(blogTitle: string): Promise<Iblog> {
        return (await collections.blog.findOne({ blogTitle })) as Iblog;
    }

    async addComment(blogId: string, commentData:any): Promise<any> {
        let foundBlog: Iblog = await collections.blog.findOne({ _id: new ObjectId(blogId) }) as Iblog
       
        // foundUser.wishList.forEach(element => {
        //   element.name == 
        // });

        if(foundBlog){
            foundBlog.comments.push(commentData)
        }

        let resultedBlog = await collections.users.findOneAndUpdate({ _id: foundBlog._id }, { "$set": foundBlog })
        if (resultedBlog) {
          return await collections.blog.findOne({ _id: new ObjectId(blogId) }) as Iblog
        }
        return resultedBlog
      }



}

export let blogService: blogServiceClass = new blogServiceClass()