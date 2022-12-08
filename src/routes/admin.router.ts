import express, { Request, Response, Router } from "express";
import { IAdmin, IContact, IMerchant, IUser,IDocument } from "../interfaces";
import { AdminService } from "../services/admin.service";
import { LOG } from "../logger";
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { AppConfig } from "../config";
import path from "path";
import { rename } from "fs";

const adminRouter: Router = express.Router();
adminRouter.use(express.json());

adminRouter.post("/editProfile", async (req: Request, res: Response) => {
    try {
        console.log("inside edit route");
        console.log(req.body,"bodyyyy");
        const profile = req.body.data;
        console.log(profile,"pp");   
      
      res.status(200).json({ updatedUser: await AdminService.editProfile(profile) });
    } catch (error) {      
      console.error(error);   
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  })
  

  adminRouter.post(
    "/uploadlogo",
    uploadImages.single("image"),
    async (req: Request, res: Response) => {
      try {
        console.log("inside add blogImage try");
        console.log(req.body,"boddy");
        const fileToUpload: Express.Multer.File = req.file;
        if (!fileToUpload) throw new Error(`No file to upload`);
     
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
          const logoId = newDocument._id;
          console.log(logoId,"log id created succesfully")
              res.status(200).json({ logoId });          
          
        });
      } catch (error: any) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  );


  adminRouter.post(
    "/uploadfavIcon",
    uploadImages.single("image"),
    async (req: Request, res: Response) => {
      try {
        console.log("inside add blogImage try");
        console.log(req.body,"boddy");
        const fileToUpload: Express.Multer.File = req.file;
        if (!fileToUpload) throw new Error(`No file to upload`);
     
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
          const icon_id = newDocument._id;
          console.log(icon_id,"log id created succesfully")
              res.status(200).json({ icon_id });          
          
        });
      } catch (error: any) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  );

    adminRouter.post(
    "/uploadfavIcon",
    uploadImages.single("image"),
    async (req: Request, res: Response) => {
      try {
        console.log("inside add blogImage try");
        console.log(req.body,"boddy");
        const fileToUpload: Express.Multer.File = req.file;
        if (!fileToUpload) throw new Error(`No file to upload`);
     
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
          const icon_id = newDocument._id;
          console.log(icon_id,"log id created succesfully")
              res.status(200).json({ icon_id });          
          
        });
      } catch (error: any) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
      }
    }
  );


  adminRouter.get("/getDetails", async (req: Request, res: Response) => {
    try {
        console.log("inside blog category tryy");
        const adminDetails= await AdminService.getAdminDetails()
     
        
      res.status(200).json({ adminDetails});
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  });








export { adminRouter };