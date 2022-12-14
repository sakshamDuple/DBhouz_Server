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
import { sendEmail } from './auth.router';
import { NotifictionService } from '../services/notification.service';

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
            if (imageField == "PROFILE") {
                // profilePic
                if (merchant?.profilePic) {
                    await DocumentService.delete(merchant.profilePic);
                }
                let newDoc: IDocument = await DocumentService.create({
                    _id: null,
                    fileName: Object.values(req.files)[0].originalname,
                    createdAt: Date.now(),
                    sizeInBytes: Object.values(req.files)[0].size,
                });
                newDocumentIds.push(newDoc._id)
                const newPath: string = path.resolve(AppConfig.directories.documents, newDoc._id.toString());
                await new Promise<void>((resolve, reject) => {
                    rename(Object.values(req.files)[0].path, newPath, (err) => {
                        if (err) reject(err);
                        resolve()
                    });
                })
                merchant.profilePic = newDocumentIds[0]
                await MerchantService.update(merchant).then(async () => { res.status(200).json({ merchant: await MerchantService.get(merchantId) }) })
            } else {
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
                if (!merchant.identification) merchant.identification = []
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
            }
        } else throw new Error(`No files received to upload`)
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.get('/getMerchantOrderTable', async (req: Request, res: Response) => {
    let id:string = req.query.id.toString()
    let year:number = parseInt(req.query.year.toString())
    try {
        res.status(200).json({ data: await OrderService.getOrderChartMerchant(year, id)})
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

merchantRouter.post('/newMerchantImgDel', async (req: Request, res: Response) => {
    try {
        const merchantId: string = req.body.merchantId;
        const merchant: IMerchant = await MerchantService.get(merchantId);
        const imageField: string = req.body?.imageField;
        const priorityN: number = parseInt(req.body?.priority)
        if (!merchant) throw new Error(`Merchant ${merchantId} does not exist`)
        let len = merchant?.identification?.length
        if (imageField == "PROFILE") {
            // profilePic
            if (merchant?.profilePic) {
                await DocumentService.delete(merchant.profilePic);
            }
            merchant.profilePic = null
            await MerchantService.update(merchant).then(async () => { res.status(200).json({ merchant: await MerchantService.get(merchantId) }) })
        } else {
            merchant?.identification?.forEach(async element => {
                if (element.identifictaion_Name == imageField) {
                    await DocumentService.delete(element.documentId);
                }
            });
            if (!merchant.identification) merchant.identification = []
            if (len == 0) {
                console.log("new1")
                merchant.identification.push({
                    documentId: null,
                    approvedByAdmin: false,
                    identifictaion_Name: imageField,
                    priority: priorityN
                })
            } else if (len == 2) {
                console.log("new2")
                merchant.identification.map(element => {
                    if (element.priority == priorityN) {
                        element.documentId = null,
                        element.approvedByAdmin = false
                        element.identifictaion_Name = imageField
                    }
                    console.log(element)
                });
            } else {
                console.log("new3")
                if (priorityN == 2)
                    merchant.identification.push({
                        documentId: null,
                        approvedByAdmin: false,
                        identifictaion_Name: imageField,
                        priority: priorityN
                    })
                if (priorityN == 1)
                    merchant.identification.push({
                        documentId: null,
                        approvedByAdmin: false,
                        identifictaion_Name: imageField,
                        priority: priorityN
                    })
            }
            await MerchantService.update(merchant).then(async () => { res.status(200).json({ merchant: await MerchantService.get(merchantId) }) })
        }
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
        const existingMerchant: IMerchant = await MerchantService.getByEmail(merchant.email)
        let send_mail = false
        let field = ""
        let topic = ""
        let description = ""
        let typeId = merchant._id
        let OwnerType = "Merchant"
        let message: string
        if (existingMerchant.identification) {
            if (existingMerchant.identification[0].approvedByAdmin != (merchant.identification[0].approvedByAdmin == true)) {
                send_mail = true;
                field = "merchant account documents approved";
                description = `Your Document Approved for ${existingMerchant.identification[0].identifictaion_Name}`
                message = existingMerchant.identification[0].identifictaion_Name
            } else if (existingMerchant.identification[0].approvedByAdmin != merchant.identification[0].approvedByAdmin == false) {
                send_mail = true;
                field = "merchant account documents reject"
                description = `Your Document Rejected for ${existingMerchant.identification[0].identifictaion_Name}`
                message = existingMerchant.identification[0].identifictaion_Name
            } else if (existingMerchant.identification[1].approvedByAdmin == merchant.identification[1].approvedByAdmin == true) {
                send_mail = true;
                field = "merchant account documents approved";
                description = `Your Document Approved for ${existingMerchant.identification[1].identifictaion_Name}`
                message = existingMerchant.identification[1].identifictaion_Name
            } else if (existingMerchant.identification[1].approvedByAdmin != merchant.identification[1].approvedByAdmin == false) {
                send_mail = true;
                field = "merchant account documents reject"
                description = `Your Document Rejected for ${existingMerchant.identification[1].identifictaion_Name}`
                message = existingMerchant.identification[1].identifictaion_Name
            }
        }
        topic = field
        let merchantUpdate = await MerchantService.update(merchant)
        let k = true;
        console.log("ToDoInactiveProducts", ToDoInactiveProducts)
        if (ToDoInactiveProducts) {
            k = await MerchantService.doInactiveMerchantProduct(new ObjectId(merchant._id))
        }
        res.status(200).json({ update: merchantUpdate && k })
        await NotifictionService.create(topic, OwnerType, typeId, description)
        if (send_mail) {
            await sendEmail(merchant.email, field, { message, merchantName: merchant.firstName })
        }
        if (merchantUpdate && k && merchant.identification[0].approvedByAdmin == true && merchant.identification[1].approvedByAdmin == true) {
            await sendEmail(merchant.email, "merchant activated", merchant.firstName)
            await NotifictionService.create(topic, "Admin", null, `Merchant with id: ${existingMerchant._id} and EmailId: ${existingMerchant.email} Documents are Approved & is Now Activated`)
        } else if ((merchantUpdate && k && merchant.identification[0].approvedByAdmin == false) || (merchantUpdate && k && merchant.identification[1].approvedByAdmin == false)) {
            await sendEmail(merchant.email, "merchant deactivated", merchant.firstName)
            await NotifictionService.create(topic, "Admin", null, `Merchant with id: ${existingMerchant._id} and EmailId: ${existingMerchant.email} some Document is Rejected & is Now Deactivated`)
        }
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

merchantRouter.post("/editProfile", async (req: Request, res: Response) => {
    try {
        console.log("inside edit route");
        console.log(req.body, "bodyyyy");
        const profile = req.body.data;
        console.log(profile, "pp");

        res.status(200).json({ updatedUser: await MerchantService.editProfile(profile) });
    } catch (error) {
        console.error(error);
        LOG.error(error);
        res.status(500).json({ error: error.message });
    }
})

merchantRouter.post(
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

export { merchantRouter }