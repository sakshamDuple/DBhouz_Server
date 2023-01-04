
import express, { Request, Response, Router } from "express";
import { LOG } from "../logger";
import path from "path";
import {Iblog,IDocument} from "../interfaces"
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { AppConfig } from "../config";
import { rename } from "fs";
import {blogService} from "../services/blog.service"
import { ObjectId } from "mongodb";
import { Icomment } from "../interfaces";


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
      console.log(req.file,"fffile");
      
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

  blogRouter.post("/getBlogDetail", async (req:Request, res:Response) => {
    console.log("inside blog router");
    
    console.log(req.body.blogid,"bddd");
    const blogId= req.body.blogid
    try {

      const result= await blogService.getblogById(blogId)  
      console.log(result,"ressss");
         
      res.status(200).json({ blogdetail:result  });
    } catch (error) {
      LOG.error(error);
      res
        .status(500)
        .json({ error: `Unable to find matching document with productId: ${blogId}` });
    }
  })
  blogRouter.post("/getBlogByTitle", async (req:Request, res:Response) => {
    console.log("inside blog router");
    
    console.log(req.body.title,"bddd");
    const blogTitle= req.body.title
    try {

      const result= await blogService.getblogByTitle(blogTitle)  
      console.log(result,"ressss");
         
      res.status(200).json({ filterblogdetail:result  });
    } catch (error) {
      LOG.error(error);
      res
        .status(500)
        .json({ error: `Unable to find matching document with productId: ${blogTitle}` });
    }
  })
  blogRouter.post("/updateblog", async (req: Request, res: Response) => {
    try {
      let blog: Iblog = req.body.blog;
      await blogService.updateBlog(blog);
      res.status(200).json({});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });


  blogRouter.delete("/deleteBlog/:blogId", async (req: Request, res: Response) => {
    try {
      const blogId: string = req?.params?.blogId;
      if (!blogId) throw new Error(`Missing Category ID`);
   
      const result=await blogService.deleteBlog(blogId);
      res.status(200).json({result});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  blogRouter.post("/updateBlogStatus", async (req: Request, res: Response) => {

    try {
      let blog: Iblog = req.body.blog;
      await blogService.updateBlog(blog);
      res.status(200).json({});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  })
  
  blogRouter.post(
    "/newBlogImages",
    uploadImages.array("image"),
    async (req: Request, res: Response) => {
      try {
        let filesToUpload: Express.Multer.File[] = req.files as Express.Multer.File[];
        if (!filesToUpload || filesToUpload.length < 0)
          throw new Error(`Files not available for upload`);
        const blogId: string = req.body.blogId;
        console.log(blogId,"bb");
        
        const blog: Iblog = await blogService.getBlog(blogId);
      if (!blog) throw new Error(`blog ${blogId} not found`);
        if (!blog.blogImages) blog.blogImages = [];
        for (let image of blog.blogImages) {
          if (image.documentId) {
            await DocumentService.delete(image.documentId);
          }
        }
        blog.blogImages = [];
        let priority: number = 1;
        for (const currentFile of filesToUpload) {
          let newDocument: IDocument = {
            _id: null,
            fileName: currentFile.originalname,
            createdAt: Date.now(),
            sizeInBytes: currentFile.size,
          };
          newDocument = await DocumentService.create(newDocument);
          blog.blogImages.push({ documentId: newDocument._id, priority: priority++ });
          const newPath: string = path.resolve(
            AppConfig.directories.documents,
            newDocument._id.toString()
          );
          await new Promise<void>((resolve, reject) => {
            rename(currentFile.path, newPath, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        }
        blogService.updateBlog(blog)
          .then(() => {
            res.status(200).json({ blog });
          })
          .catch((e) => {
            throw e;
          });
      } catch (error: any) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  );

  blogRouter.post("/addComment", async (req: Request, res: Response) => {
    try {
    
      const blogId = req.body.blogId;
      const commentData: Icomment[] = req.body?.commentData;
      console.log(req.body.blogId,"bb");
      console.log(commentData,"cc");
      res.status(200).json({ result: await blogService.addComment(blogId, commentData) });
    } catch (error) {
      console.error(error);
      LOG.error(error);
      res.status(500).json({ error: error.message });   
    }
  })


  


export { blogRouter };