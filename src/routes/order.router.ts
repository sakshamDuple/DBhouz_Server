import e from "express";
import express, { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { Order } from "../interfaces";
// import { Order } from "../Entity/Order";
import { LOG } from "../logger";
import { OrderService } from "../services/order.service";

const orderRouter: Router = express.Router();
orderRouter.use(express.json());

orderRouter.post("/make", async (req: Request, res: Response) => {
    try {
        let orderData: Order = req.body.order;
        if (orderData.products.length == 0) {
            res.status(500).json({ error: 'Minimum 1 Product is required' });
            return
        }
        orderData.products.forEach(element => {
            if(!element.sellerId || !element.productId) {
                res.status(500).json({ error: 'Please Check Names of field Within Passed products' });
                return
            }         
        });
        if(!orderData.address){
            res.status(500).json({ error: 'Address is required' });
            return
        }
        if(!orderData.address.country || !orderData.address.state || !orderData.address.city || !orderData.address.postal_code || !orderData.address.main_address_text){
            res.status(500).json({ error: 'Please Check Names of field in passed address' });
            return
        }
        if(!orderData.total_price){
            res.status(500).json({ error: 'Can`t process orders without total_price' });
            return
        }
        if(!orderData.customerDetail){
            res.status(500).json({ error: 'Can`t process orders without customerDetails' });
            return
        }
        if(!orderData.customerDetail.name || !orderData.customerDetail.userId || !orderData.customerDetail.phone || !orderData.customerDetail.email){
            res.status(500).json({ error: 'Please Check Names of field in passed customerDetails' });
            return
        }
        if(!orderData.transactionDetail){
            res.status(500).json({ error: 'Can`t process orders without transactionDetail' });
            return
        }
        if(!orderData.transactionDetail.transactionMethod || !orderData.transactionDetail.status || !orderData.transactionDetail.transactionNumber){
            res.status(500).json({ error: 'Please Check Names of field in passed transactionDetail' });
            return
        }
        orderData = await OrderService.create(orderData);
        res.status(200).json({ orderData })
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getOrderForUser/:userId", async (req: Request, res: Response) => {
    let UserId: string = req?.params?.userId;
    try {
        res.status(200).json({ order: await OrderService.getByUser(UserId) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getOrderForUser/:userId/:page/:limit/:SortByDate", async (req: Request, res: Response) => {
    let UserId: string = req?.params?.userId;
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit ? parseInt(req?.params?.limit) : 10;
    console.log(UserId, Page, SortByDate, PageLimit)
    let Start: number = PageLimit * (Page - 1) + 1
    let End: number = PageLimit * (Page)
    try {
        res.status(200).json({ order: await OrderService.getByUserFilter(UserId, Start, End, SortByDate, PageLimit) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getOrderForSeller/:sellerId", async (req: Request, res: Response) => {
    let SellerId: string = req?.params?.sellerId;
    try {
        res.status(200).json({ order: await OrderService.getBySeller(SellerId) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getAllTransaction", async (req: Request, res: Response) => {
    try {
        let transactions: any[] = await OrderService.getAllTransaction();
        res.status(200).json({ status: "success", data: transactions });
    } catch (error) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
    }
})

orderRouter.get("/getTransactionMerchant/:Merchant", async (req: Request, res: Response) => {
    let seller:string = req?.params?.Merchant
    let type:string = "seller"
    try {
        let transactions: any[] = await OrderService.getTransaction(seller,type);
        res.status(200).json({ status: "success", data: transactions });
    } catch (error) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
    }
})

orderRouter.get("/getTransactionUser/:User", async (req: Request, res: Response) => {
    let User:string = req?.params?.User
    let type:string = "user"
    try {
        let transactions: any[] = await OrderService.getTransaction(User,type);
        res.status(200).json({ status: "success", data: transactions });
    } catch (error) {
        LOG.error(error);
        res.status(500).json({ error: error.message });
    }
})

orderRouter.get("/getOrderForSeller/:sellerId/:page/:limit/:SortByDate", async (req: Request, res: Response) => {
    let SellerId: string = req?.params?.sellerId;
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit ? parseInt(req?.params?.limit) : 10;
    console.log(SellerId, Page, SortByDate, PageLimit)
    let Start: number = PageLimit * (Page - 1) + 1
    let End: number = PageLimit * (Page)
    try {
        res.status(200).json({ order: await OrderService.getBySellerFilter(SellerId, Start, End, SortByDate, PageLimit) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getAllOrder/:page/:limit/:SortByDate", async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit ? parseInt(req?.params?.limit) : 10;
    let Start: number = PageLimit * (Page - 1) + 1
    if (Start < 0) Start = 0;
    let End: number = PageLimit * (Page)
    try {
        res.status(200).json({ order: await OrderService.getFilter(Start, End, SortByDate, PageLimit) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getCancelledOrder/:page/:limit/:SortByDate", async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit ? parseInt(req?.params?.limit) : 10;
    let Start: number = PageLimit * (Page - 1) + 1
    if (Start < 0) Start = 0;
    let End: number = PageLimit * (Page)
    try {
        res.status(200).json({ order: await OrderService.getCancelledOrder(Start, End, SortByDate, PageLimit) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getCompletedOrder/:page/:limit/:SortByDate", async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit ? parseInt(req?.params?.limit) : 10;
    let Start: number = PageLimit * (Page - 1) + 1
    if (Start < 0) Start = 0;
    let End: number = PageLimit * (Page)
    try {
        res.status(200).json({ order: await OrderService.getCompletedOrder(Start, End, SortByDate, PageLimit) });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

orderRouter.get("/getAllOrder", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ order: await OrderService.get() });
    } catch (e: any) {
        LOG.error(e);
        res.status(500).json({ error: e.message });
        console.log(e)
    }
})

export { orderRouter };