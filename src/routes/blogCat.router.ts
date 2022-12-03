import express, { Request, Response, Router } from "express";
import { LOG } from "../logger";
import path from "path";
import {blogCategoryService } from "../services/blogCategory.service"
import {IblogCategory,IDocument} from "../interfaces"
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { AppConfig } from "../config";
import { rename } from "fs";

const blogCategoryRouter: Router = express.Router();
blogCategoryRouter.use(express.json());

blogCategoryRouter.post("/createBlogCategory", async (req: Request, res: Response) => { 
    try {
      let blogCategory: IblogCategory = req.body.blogCategory;
      console.log(blogCategory,"caaaaaaaaaaaaaaaa");
      
      blogCategory = await blogCategoryService.createBlogCategory(blogCategory);
      res.status(200).json({ blogCategory });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  blogCategoryRouter.post(
  "/newBlogCategoryImage",
  uploadImages.single("image"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body,"boddy");
      
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);
      const blogCategoryId: string = req.body.blogCategoryId;
      const blogCategory: IblogCategory = await blogCategoryService.getBlogCategory(blogCategoryId);
      if (!blogCategory) throw new Error(`Category ${blogCategoryId} not found`);
      if (blogCategory.imageDocumentId) {
        await DocumentService.delete(blogCategory.imageDocumentId);
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
        blogCategory.imageDocumentId = newDocument._id;
        blogCategoryService.updateBlogCategory(blogCategory)
          .then(() => {
            res.status(200).json({ blogCategory });
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

blogCategoryRouter.get("/getAllBlogCategories", async (req: Request, res: Response) => {
    try {
        console.log("inside blog category tryy");
        const blogCategory= await blogCategoryService.getAllBlogCategories()
        console.log(blogCategory,"bbbbbbllooggggg");
        
      res.status(200).json({ blogCategories:blogCategory});
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });
export { blogCategoryRouter };