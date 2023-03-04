import { ObjectID } from "bson";
import express, { Request, Response, Router } from "express";
import { rename } from "fs";
import path from "path";
import { AppConfig } from "../config";
import {
  Banner,
  Banner_Type,
  DisplayCategory,
  DisplayProducts,
  IColor,
  ICoupon,
  IDocument,
  IUnit,
  MainPage,
} from "../interfaces";
import { LOG } from "../logger";
import { uploadImages } from "../multer";
import { ColorService } from "../services/color.service";
import { couponService } from "../services/coupon.service";
import { DocumentService } from "../services/document.service";
import { mainPageService } from "../services/mainPage.service";
import { MerchantService } from "../services/merchant.service";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { UnitService } from "../services/unit.service";
import { userService } from "../services/user.service";

const miscRouter: Router = express.Router();
miscRouter.use(express.json());

miscRouter.get("/getAllColors", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ colors: await ColorService.getAll() });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.get("/getColor/:colorId", async (req: Request, res: Response) => {
  const colorId = req?.params?.colorId;
  try {
    res.status(200).json({
      color: await ColorService.get(colorId),
    });
  } catch (error) {
    LOG.error(error);
    res
      .status(500)
      .json({
        error: `Unable to find matching color with colorId: ${req.params.colorId}`,
      });
  }
});

miscRouter.post("/mainBannerCreation", async (req: Request, res: Response) => {
  try {
    let banner: Banner = req.body;
    if (banner.Banner_Type !== Banner_Type.Main) {
      banner.Banner_Type = Banner_Type.Main;
    }
    if (!banner.images)
      return res.status(201).json({ error: "Banner Image Not Found" });
    banner.images = new ObjectID(banner.images);

    banner = await mainPageService.createNewMainB(banner);
    res.status(200).json({ banner });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.post(
  "/MultiMainBannerCreation",
  async (req: Request, res: Response) => {
    try {
      let banners: Banner[] = req.body;
      console.log(banners);
      let bannerToUpdate: Banner[] = [];
      banners.map((banner) => {
        if (banner.Banner_Type == Banner_Type.Main) {
          if (banner.images) banner.images = new ObjectID(banner.images);
          console.log(banner.images);
          bannerToUpdate.push(banner);
        }
      });
      let NewBanners = await mainPageService.createMultiMainB(bannerToUpdate);
      res.status(200).json({ NewBanners });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.post(
  "/smallBanner2Creation",
  async (req: Request, res: Response) => {
    try {
      let banner: Banner = req.body;
      if (banner.Banner_Type == Banner_Type.Small2) {
        if (banner.images) banner.images = new ObjectID(banner.images);
        console.log(banner.images);
        banner = await mainPageService.createOrReplaceSmallB2(banner);
      }
      res.status(200).json({ banner });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.post(
  "/smallBanner1Creation",
  async (req: Request, res: Response) => {
    try {
      let banner: Banner = req.body;
      if (banner.Banner_Type == Banner_Type.Small1) {
        if (banner.images) banner.images = new ObjectID(banner.images);
        console.log(banner.images);
        banner = await mainPageService.createOrReplaceSmallB1(banner);
      }
      res.status(200).json({ banner });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.get("/getAllBanners", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ banners: await mainPageService.getAllBanner() });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.delete(
  "/deleteBanner/:BannerId",
  async (req: Request, res: Response) => {
    const BannerId = req?.params?.BannerId;
    try {
      let mainBanner = await mainPageService.deleteOneBanner(BannerId);
      res.status(200).json({ result: mainBanner });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.get(
  "/getAllBannersDetailed",
  async (req: Request, res: Response) => {
    try {
      res
        .status(200)
        .json({
          mainBanners: await mainPageService.getAllMainBanners(),
          smallBanner1: await mainPageService.getSmallBanner1(),
          smallBanner2: await mainPageService.getSmallBanner2(),
        });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.get("/dashboard", async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({
        orderTotal: await OrderService.getAdminTotalOrderForDashboard(),
        totalProducts: (await ProductService.getAll(false)).length,
        totalPayments: await OrderService.getAdminTotalPaymentForDashboard(),
        total_Customers: await userService.getAllCustomersByAdmin(),
        total_Merchants: await MerchantService.getAllMerchantsByAdmin(),
      });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.get(
  "/getSmallBannersAfterAdding",
  async (req: Request, res: Response) => {
    try {
      res
        .status(200)
        .json({
          smallBanner1: await mainPageService.getSmallBanner1Id(),
          smallBanner2: await mainPageService.getSmallBanner2Id(),
        });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.get("/getMainPage", async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json({ MainPage: await mainPageService.getMainPageIfAdded() });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

function doInDCforImageCatObjectId(m: DisplayCategory[]) {
  let k = [];
  console.log("m: ", m);
  m.forEach((element) => {
    let newelement: DisplayCategory = element;
    newelement.categoryId = new ObjectID(element.categoryId);
    newelement.images = new ObjectID(element.images);
    k.push(newelement);
  });
  return k;
}

function doInDCforImageProObjectId(m: DisplayProducts[]) {
  let k = [];
  m.forEach((element) => {
    let newelement: DisplayProducts = element;
    newelement.productId = new ObjectID(element.productId);
    newelement.images = new ObjectID(element.images);
    k.push(newelement);
  });
  return k;
}

miscRouter.get(
  "/getSearchResponseUser/search",
  async (req: Request, res: Response) => {
    let searchVal: string = String(req.query.searchVal);
    let data = await userService.getUserByEmailSearch(searchVal);
    console.log(data);
    try {
      res.status(200).json({ data });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.post("/HomePageCreation", async (req: Request, res: Response) => {
  try {
    let main: MainPage = req.body;
    // main.Material_Selection_1 = doInDCforImageCatObjectId(main.Material_Selection_1)
    // main.Material_Selection_2 = doInDCforImageCatObjectId(main.Material_Selection_2)
    // main.Shop_By_Category = doInDCforImageCatObjectId(main.Shop_By_Category)
    // main.Featured_Products = doInDCforImageProObjectId(main.Featured_Products)
    let MainPage = await mainPageService.mainPageCreation(main);
    res.status(200).json({ MainPage });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.put("/HomePageDetailUpdate", async (req: Request, res: Response) => {
  try {
    let main: MainPage = req.body;
    let LastMainPage: MainPage[] = await mainPageService.getMainPageIfAdded();
    let lastMain: MainPage = LastMainPage[0];
    LastMainPage[0].Benefits_of_having_Marble = main.Benefits_of_having_Marble;
    LastMainPage[0].About_Us = main.About_Us;
    let update = await mainPageService.mainPageUpdation(
      LastMainPage[0],
      lastMain
    );
    res.status(200).json({ update });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.put(
  "/HomePageMaterial_Selection_1_Update",
  async (req: Request, res: Response) => {
    try {
      let main: MainPage = req.body;
      let LastMainPage: MainPage[] = await mainPageService.getMainPageIfAdded();
      let lastMain: MainPage = LastMainPage[0];
      LastMainPage[0].Material_Selection_1 = doInDCforImageCatObjectId(
        main.Material_Selection_1
      );
      let update = await mainPageService.mainPageUpdation(
        LastMainPage[0],
        lastMain
      );
      res.status(200).json({ update });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.put(
  "/HomePageMaterial_Selection_2_Update",
  async (req: Request, res: Response) => {
    try {
      let main: MainPage = req.body;
      let LastMainPage: MainPage[] = await mainPageService.getMainPageIfAdded();
      let lastMain: MainPage = LastMainPage[0];
      LastMainPage[0].Material_Selection_2 = doInDCforImageCatObjectId(
        main.Material_Selection_2
      );
      let update = await mainPageService.mainPageUpdation(
        LastMainPage[0],
        lastMain
      );
      res.status(200).json({ update });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.post(
  "/HomePageFeatured_Products_Update",
  async (req: Request, res: Response) => {
    try {
      let main: MainPage = req.body;
      let LastMainPage: MainPage[] = await mainPageService.getMainPageIfAdded();
      let lastMain: MainPage = LastMainPage[0];
      LastMainPage[0].Featured_Products = doInDCforImageProObjectId(
        main.Featured_Products
      );
      let update = await mainPageService.mainPageUpdation(
        LastMainPage[0],
        lastMain
      );
      res.status(200).json({ update });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

miscRouter.put(
  "/HomePageShop_By_Category_Update",
  async (req: Request, res: Response) => {
    try {
      let main: MainPage = req.body;
      let LastMainPage: MainPage[] = await mainPageService.getMainPageIfAdded();
      let lastMain: MainPage = LastMainPage[0];
      LastMainPage[0].Shop_By_Category = doInDCforImageCatObjectId(
        main.Shop_By_Category
      );
      let update = await mainPageService.mainPageUpdation(
        LastMainPage[0],
        lastMain
      );
      res.status(200).json({ update });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
    }
  }
);

// miscRouter.put("/HomePage_update", async (req: Request, res: Response) => {
//     try {
//         let main: MainPage = req.body;
//         let LastMainPage:MainPage[] = await mainPageService.getMainPageIfAdded()
//         let lastMain:MainPage = LastMainPage[0]
//         let update = await mainPageService.mainPageUpdation(main,lastMain);
//         res.status(200).json({ update });
//     } catch (e: any) {
//         LOG.error(e)
//         res.status(500).json({ error: e.message });
//     }
// })
miscRouter.get("/getAllMainBannerIds", async (req: Request, res: Response) => {
  try {
    res.status(200).json(await mainPageService.getAllMainBannerIds());
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
  }
});

miscRouter.post("/createColor", async (req: Request, res: Response) => {
  try {
    let color: IColor = req.body;
    color = await ColorService.create(color);
    res.status(200).json({ color });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.post("/updateColor", async (req: Request, res: Response) => {
  try {
    let { color } = req.body;
    if (await ColorService.update(color)) {
      res.status(200).json({});
    } else
      res.status(304).send(`IColor with colorId: ${color._id} not updated`);
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.delete(
  "/deleteColor/:colorId",
  async (req: Request, res: Response) => {
    const colorId = req?.params?.colorId;
    try {
      await ColorService.delete(colorId);
      res.status(200).json({});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.get("/getAdminOrderTable", async (req: Request, res: Response) => {
  let year: number = parseInt(req.query.year.toString());
  try {
    res.status(200).json({ data: await OrderService.getOrderChartAdmin(year) });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

miscRouter.get("/getAllUnits", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ units: await UnitService.getAll() });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

miscRouter.post("/createUnit", async (req: Request, res: Response) => {
  try {
    let unit: IUnit = req.body;
    unit = await UnitService.create(unit);
    res.status(200).json({ unit });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.get("/getUnit/:unitId", async (req: Request, res: Response) => {
  const unitId = req?.params?.unitId;
  try {
    res.status(200).json({
      unitId: await UnitService.get(unitId),
    });
  } catch (error) {
    LOG.error(error);
    res
      .status(500)
      .json({
        error: `Unable to find matching unit with UnitId: ${req.params.unitId}`,
      });
  }
});
miscRouter.post("/updateUnit", async (req: Request, res: Response) => {
  try {
    let { unit } = req.body;
    if (await UnitService.update(unit)) {
      res.status(200).json({});
    } else res.status(304).send(`IUnit with unitId: ${unit._id} not updated`);
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.delete(
  "/deleteUnit/:unitId",
  async (req: Request, res: Response) => {
    const unitId = req?.params?.unitId;
    try {
      await UnitService.delete(unitId);
      res.status(201).json({});
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
miscRouter.post("/createCoupon", async (req: Request, res: Response) => {
  const coupon: ICoupon = req.body?.coupon;
  try {
    res
      .status(200)
      .json({ createdCoupon: await couponService.createCoupon(coupon) });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});
miscRouter.delete(
  "/deleteThisCoupon/:id",
  async (req: Request, res: Response) => {
    const couponId: string = req.params?.id;
    try {
      res
        .status(200)
        .json({ deleteCoupon: await couponService.deleteCoupon(couponId) });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
miscRouter.put(
  "/giveAccessOfCouponToThisMerchant",
  async (req: Request, res: Response) => {
    const couponName: string = req.body?.couponName;
    const merchantId: string = req.body.merchantId;
    console.log(couponName, merchantId);
    try {
      res
        .status(200)
        .json({
          createdCoupon: await couponService.giveAccessOfCouponToThisMerchant(
            couponName,
            merchantId
          ),
        });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.post(
  "/newBannerImages",
  uploadImages.array("image"),
  async (req: Request, res: Response) => {
    try {
      let filesToUpload: Express.Multer.File[] =
        req.files as Express.Multer.File[];
      console.log("filesToUpload", filesToUpload);
      if (!filesToUpload || filesToUpload.length < 0)
        throw new Error(`Files not available for upload`);
      if (filesToUpload.length > 1)
        throw new Error(`Only single file can be uploaded`);
      const BannerId: string = req.body.BannerId;
      const BannerType: Banner_Type = req.body.BannerType;
      const banner: Banner = await mainPageService.get(BannerId);
      if (!banner) throw new Error(`Product ${BannerId} does not exist`);
      if (banner.images) {
        await DocumentService.delete(banner.images);
      }
      let newDocument: IDocument = {
        _id: null,
        fileName: filesToUpload[0].originalname,
        createdAt: Date.now(),
        sizeInBytes: filesToUpload[0].size,
      };
      newDocument = await DocumentService.create(newDocument);
      banner.images = newDocument._id;
      const newPath: string = path.resolve(
        AppConfig.directories.documents,
        newDocument._id.toString()
      );
      await new Promise<void>((resolve, reject) => {
        rename(filesToUpload[0].path, newPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      await mainPageService.bannerUpdate(banner, BannerType);
      res.status(200).json({ banner });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.post(
  "/verNewBannerImages",
  uploadImages.array("image"),
  async (req: Request, res: Response) => {
    try {
      let filesToUpload: Express.Multer.File[] =
        req.files as Express.Multer.File[];
      console.log("filesToUpload", filesToUpload);
      if (!filesToUpload || filesToUpload.length < 0)
        throw new Error(`Files not available for upload`);
      if (filesToUpload.length > 1)
        throw new Error(`Only single file can be uploaded`);
      // const BannerId: string = req.body.BannerId;
      // const BannerType: Banner_Type = req.body.BannerType;
      // const banner: Banner = await mainPageService.get(BannerId);
      // if (!banner) throw new Error(`Product ${BannerId} does not exist`);
      // if (banner.images) {
      //     await DocumentService.delete(banner.images);
      // }
      let newDocument: IDocument = {
        _id: null,
        fileName: filesToUpload[0].originalname,
        createdAt: Date.now(),
        sizeInBytes: filesToUpload[0].size,
      };
      newDocument = await DocumentService.create(newDocument);
      // banner.images = newDocument._id;
      const newPath: string = path.resolve(
        AppConfig.directories.documents,
        newDocument._id.toString()
      );
      await new Promise<void>((resolve, reject) => {
        rename(filesToUpload[0].path, newPath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      // await mainPageService.bannerUpdate(banner, BannerType);
      res.status(200).json({ images: newDocument._id.toString() });
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

miscRouter.get("/getAllCoupons", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ result: await couponService.getAllCoupons() });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

export { miscRouter };
