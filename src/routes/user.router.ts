import express, { Request, Response, Router } from "express";
import { IDocument, IUser, IProduct, ICart } from "../interfaces";
import { ObjectId } from "mongodb";
import { LOG } from "../logger";
import { userService } from "../services/user.service";
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import path from "path";
import { AppConfig } from "../config";
import { rename } from "fs";
import { ProductService } from "../services/product.service";
import { MerchantService } from "../services/merchant.service";
import { mainPageService } from "../services/mainPage.service";
import { OrderService } from "../services/order.service";
import { TransactionService } from "../services/transaction.service";
import { couponService } from "../services/coupon.service";

const userRouter: Router = express.Router();
userRouter.use(express.json());

userRouter.post(
  "/newuserImages",
  uploadImages.array("images"),
  async (req: Request, res: Response) => {
    try {
      if (req.files) {
        const userId: string = req.body.userId;
        const user: IUser = await userService.get(userId);
        if (!user) throw new Error(`user ${userId} does not exist`);
        let newDocumentIds: ObjectId[] = [];
        for (let file of Object.values(req.files)) {
          let newDoc: IDocument = await DocumentService.create({
            _id: null,
            fileName: file.originalname,
            createdAt: Date.now(),
            sizeInBytes: file.size,
          });
          newDocumentIds.push(newDoc._id);
          const newPath: string = path.resolve(
            AppConfig.directories.documents,
            newDoc._id.toString()
          );
          await new Promise<void>((resolve, reject) => {
            rename(file.path, newPath, (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        }
        let priority: number = 1;
        user.identification = newDocumentIds.map((i) => ({
          documentId: i,
          approvedByAdmin: false,
          priority: priority++,
        }));
        await userService.update(user);
        res.status(200).json({ user });
      } else throw new Error(`No files received to upload`);
    } catch (error: any) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

userRouter.get("/admin/getAll", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ users: await userService.getAll() });
  } catch (error: any) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/getOne/:userId", async (req: Request, res: Response) => {
  const userId: string = req?.params?.userId;
  try {
    res.status(200).json({ user: await userService.get(userId) });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: `Unable to find matching document with userId: ${userId}` });
  }
});

userRouter.get("/dashboard/:userId", async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId
    let obUserId = new ObjectId(userId)
    let wishList: IUser = await userService.get(obUserId) as IUser
    let Status = ["successful", "unsuccessful", "pending", "Refund_Done", "Refund_Inprogress"]
    let TransactionMethod = ["DEBIT_CARD", "CREDIT_CARD", "UPI", "PAYTM", "GPAY", "CASH_ON_DELIVERY"]
    let OrderType = ["Recieved", "Payment_Accepted", "Inprogress", "Delivered", "Cancelled", "Refund_Inprogress", "Refund_Done", "Payment_Pending"]
    res.status(200).json({ orderTotal: (await OrderService.getByUser(userId)).length, totalWishList: wishList ? wishList.wishList.length : 0, totalTransaction: await TransactionService.getTotalTransactionFilter(OrderType, TransactionMethod, "user", userId, Status) });
  } catch (e: any) {
    LOG.error(e)
    res.status(500).json({ error: e.message });
  }
});

userRouter.post("/updateOne", async (req: Request, res: Response) => {
  try {
    const user: IUser = req.body.user;
    await userService.update(user);
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/editProfile", async (req: Request, res: Response) => {
  try {
    const profile: { userId, firstName, lastName, email, phone, gender, curpassword, newpassword } = req.body;
    res.status(200).json({ updatedUser: await userService.editProfile(profile) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.post("/getCouponByName", async (req: Request, res: Response) => {
  try {
    const couponName: string = req.body.couponName;
    res.status(200).json({ coupon: await couponService.getCouponByName(couponName) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.post("/getCouponById/:couponId", async (req: Request, res: Response) => {
  try {
    const couponId: ObjectId = new ObjectId(req.params.couponId);
    res.status(200).json({ coupon: await couponService.getCouponById(couponId) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.put("/updateCartAndWishlist", async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const cart: ICart[] = req.body?.cart;
    const wishList: IProduct[] = req.body?.wishList
    res.status(200).json({ result: await userService.update_Cart_Wishlist(userId, cart, wishList) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.get("/getMainPage", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ MainPage: await mainPageService.getMainPageIfAdded() });
  } catch (e: any) {
    LOG.error(e)
    res.status(500).json({ error: e.message });
  }
})

userRouter.get("/getAllBannersDetailed", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ mainBanners: await mainPageService.getAllMainBanners(), smallBanner1: await mainPageService.getSmallBanner1(), smallBanner2: await mainPageService.getSmallBanner2() });
  } catch (e: any) {
    LOG.error(e)
    res.status(500).json({ error: e.message });
  }
})

userRouter.get('/getCartAndWishlist/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    res.status(200).json({ result: await userService.getCartAndWishlist(userId) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.delete('/deleteOneWishlist/:id/:productId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    console.log(userId, productId)
    res.status(200).json({ result: await userService.deleteOneWishlist(userId, productId) });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
})

userRouter.post("/checkData", async (req: Request, res: Response) => {
  try {
    const userId: string = req.body.userId;
    let user: IUser = await userService.get(userId);
    if (!user) throw new Error(`user ${userId} does not exist`);
    let products: IProduct[] = await ProductService.getAllByMerchant(userId, false);
    res.status(200).json({ totalProducts: products.length, products: products });
  } catch (error) {
    console.error(error);
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

userRouter.get('/getMultipleMerchant/action', async (req: Request, res: Response) => {
  const merchantIds: string = String(req?.query?.merchantId);
  let merchants = merchantIds.split(',')
  if (merchants[0] == 'undefined') {
    res.status(500).json({ error: `Unable to find matching document with given merchantId` });
  }
  try {
    res.status(200).json({ merchants: await MerchantService.getMultipleMerchant(merchants) });
  } catch (error) {
    LOG.error(error)
    res.status(500).json({ error: `Unable to find matching document with given merchantId` });
  }
})

userRouter.delete("/deleteOne/:userId", async (req: Request, res: Response) => {
  try {
    const userId: string = req?.params?.userId;
    let user: IUser = await userService.get(userId);
    if (!user) throw new Error(`user ${userId} does not exist`);
    let products: IProduct[] = await ProductService.getAllByMerchant(userId, false);
    if (products.length === 0) {
      await userService.delete(userId);
      res.status(200).json({ success: `Successfully removed user with userId ${userId}` });
    } else throw new Error(`user can not be deleted due to existing products`);
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

export { userRouter };
