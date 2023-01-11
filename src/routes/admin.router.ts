import express, { Request, Response, Router } from "express";
import { IAdmin, IContact, IMerchant, IUser, IDocument, IFAQ } from "../interfaces";
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
    console.log(req.body, "bodyyyy");
    const profile = req.body.data;
    console.log(profile, "pp");

    res.status(200).json({ updatedUser: await AdminService.editProfile(profile) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

adminRouter.post("/editPersonalInfo", async (req: Request, res: Response) => {
  try {
    console.log("inside edit route");
    console.log(req.body, "bodyyyy");
    const profile = req.body.data;
    console.log(profile, "pp");

    res.status(200).json({ updatedUser: await AdminService.editPersonalInfo(profile) });
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
      console.log(req.body, "boddy");
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);
      let admin = await AdminService.getAll()
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
      admin[0].logoDocumentId = newDocument._id
      rename(fileToUpload.path, newPath, (err) => {
        if (err) throw err;
        const logoId = newDocument._id;
        console.log(logoId, "log id created succesfully")
        console.log(admin[0])
        admin[0].logoDocumentId = logoId
        res.status(200).json({ logoId });
      });
      return await AdminService.update(admin[0])
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
      let admin = await AdminService.getAll()
      console.log("inside add blogImage try 2");
      console.log(req.body, "boddy");
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);

      let newDocument: IDocument = {
        _id: null,
        fileName: fileToUpload.originalname,
        createdAt: Date.now(),
        sizeInBytes: fileToUpload.size,
      };
      newDocument = await DocumentService.create(newDocument);
      admin[0].favIconDocumentId = newDocument._id
      const newPath: string = path.resolve(
        AppConfig.directories.documents,
        newDocument._id.toString()
      );
      rename(fileToUpload.path, newPath, (err) => {
        if (err) throw err;
        const icon_id = newDocument._id;
        console.log(icon_id, "log id created succesfully")
        console.log(admin[0])
        res.status(200).json({ icon_id });
      });
      return await AdminService.update(admin[0])
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
      let admin = await AdminService.getAll()
      console.log("inside add blogImage try");
      console.log(req.body, "boddy");
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);

      let newDocument: IDocument = {
        _id: null,
        fileName: fileToUpload.originalname,
        createdAt: Date.now(),
        sizeInBytes: fileToUpload.size,
      };
      newDocument = await DocumentService.create(newDocument);
      admin[0].favIconDocumentId = newDocument._id
      const newPath: string = path.resolve(
        AppConfig.directories.documents,
        newDocument._id.toString()
      );
      rename(fileToUpload.path, newPath, (err) => {
        if (err) throw err;
        const icon_id = newDocument._id;
        console.log(icon_id, "log id created succesfully")
        res.status(200).json({ icon_id });
      });
      return await AdminService.update(admin[0])
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);


adminRouter.get("/getDetails", async (req: Request, res: Response) => {
  try {
    console.log("inside blog category tryy");
    const adminDetails = await AdminService.getAdminDetails()


    res.status(200).json({ adminDetails });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});



adminRouter.post(
  "/editProfilePic",
  uploadImages.single("image"),
  async (req: Request, res: Response) => {

    try {
      console.log("inside add blogImage try");
      console.log(req.body, "boddy");
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
        const id = newDocument._id;
        console.log(id, "log id created succesfully")
        res.status(200).json({ id });

      });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
adminRouter.post('/createFaq',

  async (req, res) => {
    console.log(req.body, "inside post faq route")
    const FAQ = req.body
    console.log(FAQ, "ff");

    let faqCreated = await AdminService.createFaq(FAQ)
    res.status(200).json(faqCreated);
  }
)



adminRouter.get("/getAllFaqs", async (req: Request, res: Response) => {
  try {
    console.log("inside blog category tryy");
    const FAQs = await AdminService.getAllFaqs()
    console.log(FAQs, "faqsss");

    res.status(200).json({ FAQs: FAQs });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
adminRouter.delete("/deleteFaq/:Id", async (req: Request, res: Response) => {
  const faqId: string = req?.params?.Id;
  if (!faqId) throw new Error(`Missing faq ID`);
  let FAQ: IFAQ = await AdminService.getFAQbyId(faqId);
  console.log(FAQ, "SINGLE");
  if (FAQ == undefined) {
    throw new Error(`Missing faq ID`);
  }
  else {
    const result = await AdminService.deleteSingleFAQ(FAQ)
    console.log(result, "dddd");
    res.status(200).json({ result: result });
  }
})

adminRouter.get("/getSearchMerchants/search", async (req: Request, res: Response) => {
  let searchVal: string = String(req.query.searchVal)
  let filterBy :string = String(req.query.filterBy)
  let type: string = String(req.query.type)
  console.log(filterBy,"fff");
  
  try {
    res.status(200).json({ data: await AdminService.getSearchMerchants(searchVal,type,filterBy) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

export { adminRouter }; 