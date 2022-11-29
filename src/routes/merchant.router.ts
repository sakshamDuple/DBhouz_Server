import express, { Request, Response, Router } from 'express'
import { IDocument, IMerchant, IProduct } from '../interfaces'
import { ObjectId } from "mongodb";
import { LOG } from '../logger';
import { MerchantService } from '../services/merchant.service';
import { uploadImages } from '../multer';
import { DocumentService } from '../services/document.service';
import path from 'path';
import { AppConfig } from '../config';
import { rename } from 'fs';
import { ProductService } from '../services/product.service';
import { couponService } from '../services/coupon.service';
import { OrderService } from '../services/order.service';

const merchantRouter: Router = express.Router()
merchantRouter.use(express.json())

merchantRouter.post('/newMerchantImages', uploadImages.array('image'), async (req: Request, res: Response) => {
    try {
        if (req.files) {
            const merchantId: string = req.body.merchantId;
            const merchant: IMerchant = await MerchantService.get(merchantId);
            const imageField: string = req.body?.imageField;
            const priorityN: number = parseInt(req.body?.priority)
            if (!merchant) throw new Error(`Merchant ${merchantId} does not exist`)
            let newDocumentIds: ObjectId[] = []
            let len = merchant?.identification?.length
            merchant?.identification?.forEach(async element => {
                if (element.identifictaion_Name == imageField) {
                    await DocumentService.delete(element.documentId);
                }
            });
            for (let file of Object.values(req.files)) {
                let newDoc: IDocument = await DocumentService.create({
                    _id: null,
                    fileName: file.originalname,
                    createdAt: Date.now(),
                    sizeInBytes: file.size,
                });
                newDocumentIds.push(newDoc._id)
                const newPath: string = path.resolve(AppConfig.directories.documents, newDoc._id.toString());
                await new Promise<void>((resolve, reject) => {
                    rename(file.path, newPath, (err) => {
                        if (err) reject(err);
                        resolve()
                    });
                })
            }
            console.log("newDocumentIds", newDocumentIds)
            if(!merchant.identification) merchant.identification = []
            if (len == 0) {
                console.log("new1")
                merchant.identification.push({
                    documentId: newDocumentIds[0],
                    approvedByAdmin: false,
                    identifictaion_Name: imageField,
                    priority: priorityN
                })
            } else if (len == 2) {
                console.log("new2")
                merchant.identification.map(element => {
                    console.log(element.priority == priorityN, element)
                    if (element.priority == priorityN) {
                        element.documentId = newDocumentIds[0],
                            element.approvedByAdmin = false
                        element.identifictaion_Name = imageField
                    }
                    console.log(element)
                });
            } else {
                console.log("new3")
                if (priorityN == 2)
                    merchant.identification.push({
                        documentId: newDocumentIds[0],
                        approvedByAdmin: false,
                        identifictaion_Name: imageField,
                        priority: priorityN
                    })
                if (priorityN == 1)
                    merchant.identification.push({
                        documentId: newDocumentIds[0],
                        approvedByAdmin: false,
                        identifictaion_Name: imageField,
                        priority: priorityN
                    })
            }
            await MerchantService.update(merchant).then(async () => { res.status(200).json({ merchant: await MerchantService.get(merchantId) }) })
        } else throw new Error(`No files received to upload`)
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.get('/admin/getAll', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ merchants: await MerchantService.getAll(false) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

merchantRouter.get('/getOne/:merchantId', async (req: Request, res: Response) => {
    const merchantId: string = req?.params?.merchantId;
    try {
        res.status(200).json({ merchant: await MerchantService.get(merchantId) });
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: `Unable to find matching document with merchantId: ${merchantId}` });
    }
})

merchantRouter.get("/dashboard/:merchantId", async (req: Request, res: Response) => {
    try {
        let merchantId = req.params.merchantId
        res.status(200).json({ orderTotal: await OrderService.getMerchantTotalOrderForDashboard(merchantId), totalProducts: (await ProductService.getAllByMerchant(merchantId, false)).length, totalPayments: await OrderService.getMerchantTotalPaymentForDashboard(merchantId), total_Customers: await OrderService.getAllCustomersByMerchant(merchantId) });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

merchantRouter.post("/updateOne", async (req: Request, res: Response) => {
    try {
        const merchant: IMerchant = req.body.merchant;
        let ToDoInactiveProducts = req.body?.ToDoInactiveProducts
        let merchantUpdate = await MerchantService.update(merchant)
        let k = true;
        console.log("ToDoInactiveProducts", ToDoInactiveProducts)
        if (ToDoInactiveProducts) {
            k = await MerchantService.doInactiveMerchantProduct(new ObjectId(merchant._id))
        }
        res.status(200).json({ update: merchantUpdate && k })
    } catch (error) {
        console.error(error)
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});


merchantRouter.get("/getAllCouponsForThisMerchant/:merchantId", async (req: Request, res: Response) => {
    try {
        const merchantId: string = req.params.merchantId;
        res.status(200).json({ coupons: await couponService.getAllCouponsForThisMerchant(merchantId) });
    } catch (error) {
        console.error(error);
        LOG.error(error);
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.put("/merchantGiveAccessToThisProduct", async (req: Request, res: Response) => {
    try {
        const productId: string = req.body.productId;
        const couponName: string = req.body.couponName;
        res.status(200).json(await couponService.merchantGiveAccessToThisProduct(couponName, productId));
    } catch (error) {
        console.error(error)
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.post("/checkData", async (req: Request, res: Response) => {
    try {
        const merchantId: string = req.body.merchantId;
        let merchant: IMerchant = await MerchantService.get(merchantId)
        if (!merchant) throw new Error(`Merchant ${merchantId} does not exist`)
        let products: IProduct[] = await ProductService.getAllByMerchant(merchantId, false)
        res.status(200).json({ totalProducts: products.length, products: products })
    } catch (error) {
        console.error(error)
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.delete("/deleteOne/:merchantId", async (req: Request, res: Response) => {
    try {
        const merchantId: string = req?.params?.merchantId;
        let merchant: IMerchant = await MerchantService.get(merchantId)
        if (!merchant) throw new Error(`Merchant ${merchantId} does not exist`)
        let products: IProduct[] = await ProductService.getAllByMerchant(merchantId, false)
        if (products.length === 0) {
            await MerchantService.delete(merchantId)
            res.status(200).json({ success: `Successfully removed merchant with merchantId ${merchantId}` });
        } else throw new Error(`Merchant can not be deleted due to existing products`)
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

export { merchantRouter }