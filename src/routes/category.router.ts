import express, { Request, Response, Router } from "express";
import { LOG } from "../logger";
import { CategoryService } from "../services/category.service";
import { ICategory, IDocument, IProduct, ISubCategory } from "../interfaces";
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import path from "path";
import { rename } from "fs";
import { AppConfig } from "../config";
import { ProductService } from "../services/product.service";
import { collections } from "../db.service";
import { ObjectId } from "mongodb";

const categoryRouter: Router = express.Router();
categoryRouter.use(express.json());

categoryRouter.post(
  "/newCategoryImage",
  uploadImages.single("image"),
  async (req: Request, res: Response) => {
    try {
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);
      const categoryId: string = req.body.categoryId;
      const category: ICategory = await CategoryService.getCategory(categoryId);
      if (!category) throw new Error(`Category ${categoryId} not found`);
      if (category.imageDocumentId) {
        await DocumentService.delete(category.imageDocumentId);
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
        console.log(newDocument._id,"vvv");
        
        category.imageDocumentId = newDocument._id;
        console.log(category.imageDocumentId,"cc");
        
        console.log(typeof(category.imageDocumentId),"ccccccaaaaooooo");
        
        CategoryService.updateCategory(category)
          .then(() => {
            res.status(200).json({ category });
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

categoryRouter.post(
  "/newSubCategoryImage",
  uploadImages.single("image"),
  async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const fileToUpload: Express.Multer.File = req.file;
      if (!fileToUpload) throw new Error(`No file to upload`);
      const subCategoryId: string = req.body.subCategoryId;
      const subCategory: ISubCategory = await CategoryService.getSubCategory(subCategoryId);
      if (!subCategory) throw new Error(`Sub Category ${subCategoryId} not found`);
      if (subCategory.imageDocumentId) {
        await DocumentService.delete(subCategory.imageDocumentId);
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
        subCategory.imageDocumentId = newDocument._id;
        CategoryService.updateSubCategory(subCategory)
          .then(() => {
            res.status(200).json({ message: "Successful", subCategory });
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

categoryRouter.post("/createCategory", async (req: Request, res: Response) => {
  try {
    console.log(req.body, "bbbb");

    let category: ICategory = req.body.category;
    console.log(category, "caaaaaaaaaaaaaaaa");

    category = await CategoryService.createCategory(category);
    res.status(200).json({ category });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/createSubCategory", async (req: Request, res: Response) => {
  try {
    let subCategory: ISubCategory = req.body.subCategory;
    subCategory = await CategoryService.createSubCategory(subCategory);
    res.status(200).json({ subCategory });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.get("/getAllData", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ data: await CategoryService.getAll() });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.get("/getSearchResponseCategory/search", async (req: Request, res: Response) => {
  let searchVal: string = String(req.query.searchVal)
  let id: string = String(req.query.id)
  let type: string = String(req.query.type)
  try {
    res.status(200).json({ data: await CategoryService.getCategoryByIdSearch(searchVal,type,id) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.get("/getSearchResponseSubCategory/search", async (req: Request, res: Response) => {
  let searchVal: string = String(req.query.searchVal)
  let id: string = String(req.query.id)
  let type: string = String(req.query.type)
  try {
    res.status(200).json({ data: await CategoryService.getSubCategoryByIdSearch(searchVal,type,id) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.get("/getAllCategories", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ categories: await CategoryService.getAllCategories() });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/updateCategory", async (req: Request, res: Response) => {
  try {
    let category: ICategory = req.body.category;
    await CategoryService.updateCategory(category);
    res.status(200).json({});
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/updateOneCategoryAcInAc", async (req: Request, res: Response) => {
  try {
    let category: ICategory = req.body.category;
    let ToDoInactiveProducts = req.body?.ToDoInactiveProducts
    let categoryUpdate = await CategoryService.updateCategory(category)
    let k = true;
    console.log("ToDoInactiveProducts", ToDoInactiveProducts)
    if (ToDoInactiveProducts) {
      k = await CategoryService.doInactiveCategoryProduct(new ObjectId(category._id))
    }
    res.status(200).json({ update: categoryUpdate && k })
  } catch (error) {
    console.error(error)
    LOG.error(error)
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/updateOneSubCategoryAcInAc", async (req: Request, res: Response) => {
  try {
    let subCategory: ISubCategory = req.body.subCategory;
    let ToDoInactiveProducts = req.body?.ToDoInactiveProducts
    let categoryUpdate = await CategoryService.updateSubCategory(subCategory)
    let k = true;
    console.log("ToDoInactiveProducts", ToDoInactiveProducts)
    if (ToDoInactiveProducts) {
      k = await CategoryService.doInactiveSubCategoryProduct(new ObjectId(subCategory._id))
    }
    res.status(200).json({ update: categoryUpdate && k })
  } catch (error) {
    console.error(error)
    LOG.error(error)
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/updateSubCategory", async (req: Request, res: Response) => {
  try {
    const subCategory: ISubCategory = req.body.subCategory;
    await CategoryService.updateSubCategory(subCategory);
    res.status(200).json({});
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/checkCategoryData", async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.body.categoryId;
    if (!categoryId) throw new Error(`Missing Category Id`);
    let category: ICategory = await CategoryService.getCategory(categoryId);
    if (!category) throw new Error(`Category ${categoryId} does not exist`);
    let products: IProduct[] = await CategoryService.getAllProductsByCategory(categoryId);
    let subCategories: ISubCategory[] = await CategoryService.getAllSubCategories(categoryId);
    res.status(200).json({
      totalSubCategories: subCategories.length,
      totalProducts: products.length,
    });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.post("/checkSubCategoryData", async (req: Request, res: Response) => {
  try {
    const subCategoryId: string = req.body.subCategoryId;
    if (!subCategoryId) throw new Error(`Missing Sub Category Id`);
    let subCategory: ISubCategory = await CategoryService.getSubCategory(subCategoryId);
    if (!subCategory) throw new Error(`Sub Category ${subCategoryId} does not exist`);
    let products: IProduct[] = await CategoryService.getAllProductsBySubCategory(
      subCategoryId
    );
    res.status(200).json({ totalProducts: products.length });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.delete("/deleteCategory/:categoryId", async (req: Request, res: Response) => {
  try {
    const categoryId: string = req?.params?.categoryId;
    if (!categoryId) throw new Error(`Missing Category ID`);
    let category: ICategory = await CategoryService.getCategory(categoryId);
    if (!category) throw new Error(`Category ${categoryId} does not exist`);
    let subCategories: ISubCategory[] = await CategoryService.getAllSubCategories(categoryId);
    if (subCategories.length > 0)
      throw new Error(`Category ${category.name} has ${subCategories.length} Sub Categories`);
    let products: IProduct[] = await CategoryService.getAllProductsByCategory(categoryId);
    if (products.length > 0)
      throw new Error(`Category ${category.name} has ${products.length} Products`);
    await CategoryService.deleteCategory(categoryId);
    res.status(200).json({});
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

categoryRouter.delete(
  "/deleteSubCategory/:subCategoryId",
  async (req: Request, res: Response) => {
    try {
      const subCategoryId: string = req?.params?.subCategoryId;
      if (!subCategoryId) throw new Error(`Missing Sub Category ID`);
      let subCategory: ISubCategory = await CategoryService.getSubCategory(subCategoryId);
      if (!subCategory) throw new Error(`Sub Category ${subCategoryId} does not exist`);
      let products: IProduct[] = await CategoryService.getAllProductsBySubCategory(
        subCategoryId
      );
      if (products.length > 0)
        throw new Error(`Sub Category ${subCategory.name} has ${products.length} Products`);
      await CategoryService.deleteSubCategory(subCategoryId);
      res.status(200).json({});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

categoryRouter.post("/getProductsByCategory", async (req: Request, res: Response) => {
  try {
    let categoryId: string = req.body.categoryId;
    let activeProducts: IProduct[] = await ProductService.getAllByCategory(categoryId, false);
    res.status(200).json({ status: "success", data: activeProducts });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

export { categoryRouter };
