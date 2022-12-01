
import express, { Request, Response, Router } from "express";
import { LOG } from "../logger";
import path from "path";
import {Iblog,IDocument} from "../interfaces"
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { AppConfig } from "../config";
import { rename } from "fs";
import {blogService} from "../services/blog.service"



const blogRouter: Router = express.Router();
blogRouter.use(express.json());


blogRouter.post("/createBlog", async (req: Request, res: Response) => { 
    console.log("inside post ");
    
    try {
      let blog: Iblog = req.body.blog;
      console.log(blog,"caaaaaaaaaaaaaaaa");
      
      blog = await blogService.createBlog(blog);
    console.log(blog,"aaaa");
        
      res.status(200).json({ blog });
    } catch (error: any) {
        console.log(error,"the error");
        
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  blogRouter.post(
  "/newBlogImage",
  uploadImages.single("image"),
  async (req: Request, res: Response) => {
    try {
      console.log("inside add blogImage try");
      console.log(req.body,"boddy");
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);
      const blogId: string = req.body.blogId;
      const blog: Iblog = await blogService.getBlog(blogId);
      if (!blog) throw new Error(`Category ${blogId} not found`);
      if (blog.imageDocumentId) {
        await DocumentService.delete(blog.imageDocumentId);
      }
      let newDocument: IDocument = {
        _id: null,
        fileName: fileToUpload.originalname,
        createdAt: Date.now(),
        sizeInBytes: fileToUpload.size,
      };
      newDocument = await DocumentService.create(newDocument);
      const newPath: string = path.resolve(
        AppConfig.directories.documents,
        newDocument._id.toString()
      );
      rename(fileToUpload.path, newPath, (err) => {
        if (err) throw err;
        blog.imageDocumentId = newDocument._id;
        blogService.updateBlog(blog)
          .then(() => {
            res.status(200).json({ blog });
          })
          .catch((e) => {
            throw e;
          });
      });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

blogRouter.get("/getAllBlogs", async (req: Request, res: Response) => {
    try {
        console.log("inside blog category tryy");
        const blog= await blogService.getAllBlog()
        console.log(blog,"bbbbbbllooggggg");
        
      res.status(200).json({ blogs:blog});
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });

//   blogRouter.get("/getBlogById/:id", async (req:Request, res:Response) => {
//     let blogId = req.params?.id;
 
//     if(blogId != "" || blogId == undefined) {
  
//       const result = await blogService.getblogById(blogId)

//         return res.status(200).json({ result:result });
//     }
//     return res.status(404).json({error: "OrderID Not Found,Please Provide Correct OrderID"})
// })



export { blogRouter };