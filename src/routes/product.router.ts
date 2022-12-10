import express, { Request, Response, Router } from "express";
import { rename } from "fs";
import path from "path";
import { EProductStatus, IBrand, IDocument, IMerchant, IProductVariant, IReview } from "../interfaces";
import { LOG } from "../logger";
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { ProductService } from "../services/product.service";
import { IProduct } from "../interfaces";
import { AppConfig } from "../config";
import { MerchantService } from "../services/merchant.service";
import jwt from "jsonwebtoken";
import { ObjectID } from "bson";
import { BrandService } from "../services/brand.service";
import { ColorService } from "../services/color.service";
import { sendEmail } from "./auth.router";
import { userService } from "../services/user.service";
let future = require('future')

const productRouter: Router = express.Router();
productRouter.use(express.json());

productRouter.post("/getProductsByCategory", async (req: Request, res: Response) => {
  try {
    let categoryId: string = req.body.categoryId;
    let activeProducts: IProduct[] = await ProductService.getAllByCategory(categoryId, true);
    let activeMerchants: IMerchant[] = await MerchantService.getAll(true);
    let resultProducts: IProduct[] = activeProducts.filter((p) => {
      return (
        activeMerchants.findIndex((m) => m._id.toString() === p.merchantId.toString()) !== -1
      );
    });
    res.status(200).json({ products: resultProducts });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/getProductsByCategory/filter", async (req: Request, res: Response) => {
  try {
    let categoryId: string = req.body.categoryId;
    let priceRangefrom: number = req?.body?.pricefrom ? parseInt(req?.body?.pricefrom) : 1;
    let priceRangeto: number = req?.body?.priceto ? parseInt(req?.body?.priceto) : 100000;
    let activeProducts: IProduct[] = await ProductService.getAllByCategoryFilter(categoryId, priceRangefrom, priceRangeto);
    res.status(200).json({ status: "success", data: activeProducts });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/getProductsBySubCategory/filter", async (req: Request, res: Response) => {
  try {
    let subCategoryId: string = req.body.subCategoryId;
    let priceRangefrom: number = req?.body?.pricefrom ? parseInt(req?.body?.pricefrom) : 1;
    let priceRangeto: number = req?.body?.priceto ? parseInt(req?.body?.priceto) : 1000000;
    // let colors: string = req.
    let activeProducts: IProduct[] = await ProductService.getAllBySubCategoryFilter(subCategoryId, priceRangefrom, priceRangeto);
    console.log(activeProducts)
    res.status(200).json({ status: "success", data: activeProducts });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/getProductsBySubCategory", async (req: Request, res: Response) => {
  try {
    let subCategoryId: string = req.body.subCategoryId;
    let activeProducts: IProduct[] = await ProductService.getAllBySubCategory(subCategoryId, false);
    res.status(200).json({ status: "success", data: activeProducts });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.get('/getEveryProductBySpecificaion/filter', async (req: Request, res: Response) => {
  try {
    let categoryId: string = req.query?.categoryId ? String(req.query.categoryId) : "";
    let subCategoryId: string = req.query?.subCategoryId ? String(req.query.subCategoryId) : "";
    let thisSubCat = subCategoryId.split(',')
    let priceRangefrom: number = req?.query?.pricefrom ? parseInt(String(req?.query?.pricefrom)) : 1;
    let priceRangeto: number = req?.query?.priceto ? parseInt(String(req?.query?.priceto)) : 100000;
    let sortByName: string = req?.query?.sortByDate ? String(req?.query?.sortByDate) : "";
    let PageLimit: number = req?.query?.PageLimit ? parseInt(String(req?.query?.PageLimit)) : 10;
    let colorId: string = req?.query?.colorId ? String(req?.query?.colorId) : "";
    let thisColors = colorId.split(',')
    let Page: number = req?.query?.page ? parseInt(String(req?.query?.page)) : 1;
    let Start: number = PageLimit * (Page - 1) + 1;
    let activeProducts: IProduct[] = []
    let totalValCatOrSub: Number = 0;
    let get_Colors_MaxPrice = await ProductService.get_Colors_MaxPrice(categoryId)
    if (subCategoryId != "") {
      if (thisSubCat[0] == "" || (thisSubCat[0] == "" && thisColors[0] == "")) {
        return res.status(200).json({ status: "success", data: activeProducts, Total: totalValCatOrSub, get_Colors_MaxPrice: get_Colors_MaxPrice });
      }
      activeProducts = await ProductService.getAllBySubCategoryFilterNew(thisSubCat, priceRangefrom, priceRangeto, sortByName, PageLimit, Start, thisColors, true);
      totalValCatOrSub = await ProductService.getAllBySubCategoryFilterNewVal(thisSubCat, priceRangefrom, priceRangeto, thisColors, true)
    } else if (categoryId != "") {
      activeProducts = await ProductService.getAllByCategoryFilterNew(categoryId, priceRangefrom, priceRangeto, sortByName, PageLimit, Start, thisColors, true);
      totalValCatOrSub = await ProductService.getAllByCategoryFilterNewVal(categoryId, priceRangefrom, priceRangeto, thisColors, true)
      return res.status(200).json({ status: "success", data: activeProducts, Total: totalValCatOrSub, get_Colors_MaxPrice: get_Colors_MaxPrice });
    }
    return res.status(200).json({ status: "success", data: activeProducts, Total: totalValCatOrSub });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

productRouter.get('/getAllColors', async (req: Request, res: Response) => {
  try {
    res.status(200).json({ colors: (await ColorService.getAll()) });
  } catch (error: any) {
    LOG.error(error)
    res.status(500).json({ error: error.message });
  }
})

productRouter.post(
  "/newProductImages",
  uploadImages.array("image"),
  async (req: Request, res: Response) => {
    try {
      let filesToUpload: Express.Multer.File[] = req.files as Express.Multer.File[];
      if (!filesToUpload || filesToUpload.length < 0)
        throw new Error(`Files not available for upload`);
      const productId: string = req.body.productId;
      const product: IProduct = await ProductService.get(productId);
      if (!product) throw new Error(`Product ${productId} does not exist`);
      if (!product.images) product.images = [];
      for (let image of product.images) {
        if (image.documentId) {
          await DocumentService.delete(image.documentId);
        }
      }
      product.images = [];
      let priority: number = 1;
      for (const currentFile of filesToUpload) {
        let newDocument: IDocument = {
          _id: null,
          fileName: currentFile.originalname,
          createdAt: Date.now(),
          sizeInBytes: currentFile.size,
        };
        newDocument = await DocumentService.create(newDocument);
        product.images.push({ documentId: newDocument._id, priority: priority++ });
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
      await ProductService.update(product);
      res.status(200).json({ product });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

productRouter.post("/doReview", async (req: Request, res: Response) => {
  try {
    let review: any = req.body.review;
    let orderId: ObjectID = new ObjectID(review.orderId)
    let description = review.description
    let rating: number = review.rating
    let productId: string = review.productId
    let token = req.body.token;
    let decoded: any = jwt.decode(token);
    if (decoded.user.type == "user") {
      let userId = new ObjectID((decoded.user._id))
      let reviewId = new ObjectID
      let newReview: IReview = {
        reviewId, userId, orderId, description, rating
      }
      let result = await ProductService.doReview(newReview, productId)
      res.status(200).json({ result })
      let theProduct = await ProductService.get(productId)
      let theUser = await userService.get(userId)
      let theMerchant = await MerchantService.get(theProduct.merchantId)
      await sendEmail(theMerchant.email, "Merchant got review", {
        merchantName: theMerchant.firstName,
        productName: theProduct.name,
        userName: theUser.firstName + " " + theUser.lastName,
        reviewDescription: newReview.description,
        rating: newReview.rating,
        reviewId: newReview.reviewId
      });
    } else {
      res.status(401).json({ error: "Only User Can Do Reviews Of This Of Products" })
    }
  } catch (e) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
})

productRouter.post(
  "/newVariantImages",
  uploadImages.array("image"),
  async (req: Request, res: Response) => {
    try {
      let filesToUpload: Express.Multer.File[] = req.files as Express.Multer.File[];
      if (!filesToUpload || filesToUpload.length < 0)
        throw new Error(`Files not available for upload`);
      const productId: string = req.body.productId;
      const product: IProduct = await ProductService.get(productId);
      if (!product) throw new Error(`Product ${productId} does not exist`);
      let variants = product.variants
      variants.map(async element => {
        // console.log("1",element.name == req.body.name)
        if (element.name == req.body.name) {
          if (!element.images) element.images = []
          for (let image of element.images) {
            // console.log("2 image.documentId", image.documentId)
            if (image.documentId) {
              DocumentService.delete(image.documentId);
            }
          }
          element.images = [];
          let priority: number = 1;
          for (const currentFile of filesToUpload) {
            let newDocument: IDocument = {
              _id: null,
              fileName: currentFile.originalname,
              createdAt: Date.now(),
              sizeInBytes: currentFile.size,
            };
            newDocument = await DocumentService.create(newDocument);
            // console.log("3 newDocument", newDocument)
            element.images.push({ documentId: newDocument._id, priority: priority++ });
            const newPath: string = path.resolve(
              AppConfig.directories.documents,
              newDocument._id.toString()
            );
            // console.log("4 element.images", element.images)
            await new Promise<void>((resolve, reject) => {
              rename(currentFile.path, newPath, (err) => {
                if (err) reject(err);
                else resolve();
              });
            });
          }
          // console.log("5 variants", variants[0].images);
        }
      })
      // console.log("6 product", product.variants[0].images)
      await ProductService.update(product);
      res.status(200).json({ product });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
// productRouter.post(
//   "/newVariantImagesUp",
//   uploadImages.array("image"),
//   async (req: Request, res: Response) => {
//     try {
//       let filesToUpload: Express.Multer.File[] = req.files as Express.Multer.File[];
//       if (!filesToUpload || filesToUpload.length < 0)
//         throw new Error(`Files not available for upload`);
//       const productId: string = req.body.productId;
//       const variant: IProductVariant = req.body.variant
//       const product: IProduct = await ProductService.get(productId);
//       if (!product) throw new Error(`Product ${productId} does not exist`);
//       let variants = [variant]
//       variants.map(async element => {
//         // console.log("1",element.name == req.body.name)
//         if (element.name == variant.name) {
//           if (!element.images) element.images = []
//           for (let image of element.images) {
//             // console.log("2 image.documentId", image.documentId)
//             if (image.documentId) {
//               DocumentService.delete(image.documentId);
//             }
//           }
//           element.images = [];
//           let priority: number = 1;
//           for (const currentFile of filesToUpload) {
//             let newDocument: IDocument = {
//               _id: null,
//               fileName: currentFile.originalname,
//               createdAt: Date.now(),
//               sizeInBytes: currentFile.size,
//             };
//             newDocument = await DocumentService.create(newDocument);
//             // console.log("3 newDocument", newDocument)
//             element.images.push({ documentId: newDocument._id, priority: priority++ });
//             const newPath: string = path.resolve(
//               AppConfig.directories.documents,
//               newDocument._id.toString()
//             );
//             // console.log("4 element.images", element.images)
//             await new Promise<void>((resolve, reject) => {
//               rename(currentFile.path, newPath, (err) => {
//                 if (err) reject(err);
//                 else resolve();
//               });
//             });
//           }
//           // console.log("5 variants", variants[0].images);
//         }
//         product.variants.map(async elementi => {
//           if (elementi.name == variant.name) {
//             elementi = element
//           }
//         })
//       })
//       // console.log("6 product", product.variants[0].images)
//       await ProductService.update(product);
//       res.status(200).json({ product });
//     } catch (error: any) {
//       LOG.error(error);
//       res.status(500).json({ error: error.message });
//     }
//   }
// );
productRouter.post("/user/getProductVariant", async (req: Request, res: Response) => {
  try {
    let productId: string = req.body.productId;
    let variant: string = req.body.variant;
    res.status(200).json({ variant: await ProductService.getProductVariant(productId, variant) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

productRouter.get("/admin/getAll", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ products: await ProductService.getAll(false) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/category/search", async (req: Request, res: Response) => {
  try {
    let categoryId = req.body.categoryId
    let searchVal = req.body.searchVal
    res.status(200).json({ fetches: await ProductService.searchSpecific(categoryId, searchVal) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

productRouter.get("/getAll", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ products: await ProductService.getAll(true) });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.post("/createProduct", async (req: Request, res: Response) => {
  try {
    let product: IProduct = req.body.product;
    console.log(product)
    let brand: string = req.body?.brand
    if (brand) {
      let theExistingBrand = await BrandService.getByName(brand)
      if (!theExistingBrand) {
        let newBrand: IBrand = {
          _id: undefined,
          name: brand,
          priority: 1,
          createdAt: Date.now(),
        };
        let thisBrand = await BrandService.create(newBrand)
        if (thisBrand == "Brand with this name already exists") {
          return res.status(400).json({ thisBrand });
          let theExistingBrand = await BrandService.getByName(newBrand.name)
        }
        product.brandId = new ObjectID(thisBrand._id)
      } else {
        product.brandId = new ObjectID(theExistingBrand._id)
      }
    }
    let newProduct: IProduct = product
    console.log(newProduct)
    product = await ProductService.create(newProduct);
    res.status(200).json({ product });
  }
  catch (error: any) {
    LOG.error(error);
    if (error.message == "Brand with this name already exists") res.status(401).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
});

productRouter.get("/getOne/:productId", async (req: Request, res: Response) => {
  const productId: string = req?.params?.productId;
  try {
    res.status(200).json({ product: await ProductService.get(productId) });
  } catch (error) {
    LOG.error(error);
    res
      .status(500)
      .json({ error: `Unable to find matching document with productId: ${productId}` });
  }
});

productRouter.post("/updateOne", async (req: Request, res: Response) => {
  try {
    const product: IProduct = req.body.product;
    let prevProduct: IProduct = await ProductService.get(product._id)
    let merchantOfProfuct: IMerchant = await MerchantService.get(product.merchantId)
    let result = await ProductService.update(product);
    res.status(200).json({ result });
    if (product.status == EProductStatus.Active && product.status != prevProduct.status) {
      await sendEmail(merchantOfProfuct.email, "Merchant Product Activated", { product, merchantName: merchantOfProfuct.firstName });
    } else if (product.status == EProductStatus.InActive && product.status != prevProduct.status) {
      await sendEmail(merchantOfProfuct.email, "Merchant Product Deactivated", { product, merchantName: merchantOfProfuct.firstName });
    }
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

productRouter.delete("/deleteOne/:productId", async (req: Request, res: Response) => {
  const productId: string = req?.params?.productId;
  try {
    if (await ProductService.delete(productId))
      return res.status(200).json({ message: "product deleted" });
    res.status(404).json({ message: "product not deleted" });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

export { productRouter };