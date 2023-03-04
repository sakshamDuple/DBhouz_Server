import express, { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { IUser, Order } from "../interfaces";
import { LOG } from "../logger";
import { MerchantService } from "../services/merchant.service";
import { NotifictionService } from "../services/notification.service";
import { OrderService } from "../services/order.service";
import { TransactionService } from "../services/transaction.service";
import { userService } from "../services/user.service";
import { sendEmail } from "./auth.router";

const orderRouter: Router = express.Router();
orderRouter.use(express.json());

orderRouter.post("/make", async (req: Request, res: Response) => {
  try {
    let orderData: Order = req.body.order;
    if (orderData.products.length == 0) {
      res.status(500).json({ error: "Minimum 1 Product is required" });
      return;
    }
    orderData.products.forEach((element) => {
      if (!element.sellerId || !element.productId) {
        res.status(500).json({
          error: "Please Check Names of field Within Passed products",
        });
        return;
      }
    });
    if (!orderData.address) {
      res.status(500).json({ error: "Address is required" });
      return;
    }
    if (
      !orderData.address.country ||
      !orderData.address.state ||
      !orderData.address.city ||
      !orderData.address.postal_code ||
      !orderData.address.main_address_text
    ) {
      res
        .status(500)
        .json({ error: "Please Check Names of field in passed address" });
      return;
    }
    if (!orderData.total_price) {
      res
        .status(500)
        .json({ error: "Can`t process orders without total_price" });
      return;
    }
    if (!orderData.customerDetail) {
      res
        .status(500)
        .json({ error: "Can`t process orders without customerDetails" });
      return;
    }
    if (
      !orderData.customerDetail.name ||
      !orderData.customerDetail.userId ||
      !orderData.customerDetail.phone ||
      !orderData.customerDetail.email
    ) {
      res.status(500).json({
        error: "Please Check Names of field in passed customerDetails",
      });
      return;
    }
    if (!orderData.transactionDetail) {
      res
        .status(500)
        .json({ error: "Can`t process orders without transactionDetail" });
      return;
    }
    if (
      !orderData.transactionDetail.transactionMethod ||
      !orderData.transactionDetail.status ||
      !orderData.transactionDetail.transactionNumber
    ) {
      res.status(500).json({
        error: "Please Check Names of field in passed transactionDetail",
      });
      return;
    }
    orderData = await OrderService.create(orderData);
    res.status(200).json({ orderData });
    let emailSent = await sendEmail(
      orderData.customerDetail.email,
      "User Order Placed",
      orderData
    );
    await NotifictionService.create(
      "User Order Placed",
      "Admin",
      null,
      `User With Id: ${orderData.customerDetail.userId} & emailId: ${orderData.customerDetail.email} Has Ordered some New Products On OrderId: ${orderData._id}`
    );
    let findUser: IUser = await userService.get(
      orderData.customerDetail.userId
    );
    let push = true;
    if (findUser.address)
      findUser.address.forEach((element) => {
        if (element.main_address_text != orderData.address.main_address_text) {
          push = push && true;
        } else {
          push = false;
        }
      });
    if (push) {
      if (!findUser.address) findUser.address = [];
      let count = findUser.address.length;
      let addressName = `Address_${count}`;
      let NewAddress = { ...orderData.address, addressName };
      console.log(NewAddress);
      findUser.address.push(NewAddress);
      await userService.update(findUser);
    }
    orderData.products.forEach(async (element) => {
      let theMerchant = await MerchantService.get(element.sellerId);
      orderData.transactionDetail.transactionMethod;
      await sendEmail(theMerchant.email, "Merchant Order Placed", {
        orderData,
        merchantName: theMerchant.firstName,
      });
      await NotifictionService.create(
        "User Order Placed",
        "Merchant",
        new ObjectId(element.sellerId),
        `Merchant With Id: ${orderData.customerDetail.userId} & emailId: ${orderData.customerDetail.email} Has Ordered some New Products On OrderId: ${orderData._id}`
      );
    });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

orderRouter.get(
  "/getOrderForUser/:userId",
  async (req: Request, res: Response) => {
    let UserId: string = req?.params?.userId;
    try {
      res.status(200).json({ order: await OrderService.getByUser(UserId) });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.get(
  "/getOrderForUser/:userId/:page/:limit/:SortByDate/:OrderType",
  async (req: Request, res: Response) => {
    let UserId: string = req?.params?.userId;
    let Page: number = req.params?.page ? parseInt(req.params.page) : 1;
    let newOrderType: string = req.params.OrderType;
    let OrderType: Array<string> = newOrderType.split(",");
    let PageLimit: number = req?.params?.limit
      ? parseInt(req.params.limit)
      : 10;
    let Start: number = PageLimit * (Page - 1) + 1;
    let SortByDate: string = req.params.SortByDate;
    let End: number = PageLimit * Page;
    if (OrderType[0] == ":OrderType") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    console.log(
      (
        await OrderService.getByUserFilter(
          UserId,
          Start,
          End,
          SortByDate,
          PageLimit,
          OrderType
        )
      ).length
    );
    try {
      res.status(200).json({
        order: await OrderService.getByUserFilter(
          UserId,
          Start,
          End,
          SortByDate,
          PageLimit,
          OrderType
        ),
        totalOrders: await OrderService.getTotalByUserFilter(UserId, OrderType),
      });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.get(
  "/getProductByOrderId/:id/:page/:limit",
  async (req: Request, res: Response) => {
    let OrderId = req.params?.id;
    let Page: number = req.params?.page ? parseInt(req.params.page) : 1;
    let PageLimit: number = req?.params?.limit
      ? parseInt(req.params.limit)
      : 10;
    let Start: number = PageLimit * (Page - 1) + 1;
    if (OrderId != "" || OrderId == undefined) {
      console.log(PageLimit, Start, OrderId);
      return res.status(200).json({
        result: await OrderService.getProductByOrderId(
          OrderId,
          Start,
          PageLimit
        ),
      });
    }
    return res
      .status(404)
      .json({ error: "OrderID Not Found,Please Provide Correct OrderID" });
  }
);

orderRouter.get("/getOrderCsvForAdmin", async (req: Request, res: Response) => {
  try {
    let PageLimit = 1;
    let criterias: Object = {};

    if (req.query.filter) {
      if (req.query.filter == "week") {
        criterias = {
          createdAt: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 },
        };
      }
      if (req.query.filter == "month") {
        criterias = {
          createdAt: { $gte: Date.now() - 30 * 24 * 60 * 60 * 1000 },
        };
      }
      if (req.query.filter == "month") {
        criterias = {
          createdAt: {
            $gte: Date.now() - 12 * 30 * 24 * 60 * 60 * 1000,
          },
        };
      }
      if (req.query.filter == "today") {
        criterias = {
          createdAt: {
            $gte: Date.now() - 1 * 24 * 60 * 60 * 1000,
          },
        };
      }
    }

    res
      .status(200)
      .json({ order: await OrderService.getOrderCsvForAdmin(criterias) });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});
orderRouter.get(
  "/getAllTransaction/action",
  async (req: Request, res: Response) => {
    let Page: number = req.query?.page ? parseInt(String(req.query.page)) : 1;
    let newOrderType: string = String(req.query.OrderType);
    let OrderType = newOrderType.split(",");
    let PageLimit: number = req?.query?.limit
      ? parseInt(String(req.query.limit))
      : 10;
    let tempTransactionMethod: string = String(req?.query?.TransactionMethod);
    let TransactionMethod = tempTransactionMethod.split(",");
    let Start: number = PageLimit * (Page - 1) + 1;
    let TransactionStatus: string = String(req.query.TransactionStatus);
    let Status: Array<string> = TransactionStatus.split(",");
    let SortByDate: string = String(req?.query?.SortByDate);
    if (OrderType[0] == "undefined") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    if (Status[0] == "undefined") {
      Status = [
        "successful",
        "unsuccessful",
        "pending",
        "Refund_Done",
        "Refund_Inprogress",
      ];
    }
    if (TransactionMethod[0] == "undefined") {
      TransactionMethod = [
        "DEBIT_CARD",
        "CREDIT_CARD",
        "UPI",
        "PAYTM",
        "GPAY",
        "CASH_ON_DELIVERY",
        "NETBANKING",
      ];
    }
    try {
      let transactions: any[] =
        await TransactionService.getAllTransactionFilter(
          OrderType,
          Start,
          PageLimit,
          TransactionMethod,
          SortByDate,
          Status
        );
      res.status(200).json({
        status: "success",
        data: transactions,
        totalTransaction: await TransactionService.getTotalTransactionFilter(
          OrderType,
          TransactionMethod,
          "admin",
          "",
          Status
        ),
      });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

orderRouter.get("/getAllTransaction", async (req: Request, res: Response) => {
  try {
    let transactions: any[] = await OrderService.getAllTransaction();
    res.status(200).json({ status: "success", data: transactions });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

orderRouter.get(
  "/getTransactionMerchant/action",
  async (req: Request, res: Response) => {
    let Page: number = req.query?.page ? parseInt(String(req.query.page)) : 1;
    let newOrderType: string = String(req.query.OrderType);
    let OrderType = newOrderType.split(",");
    let PageLimit: number = req?.query?.limit
      ? parseInt(String(req.query.limit))
      : 10;
    let tempTransactionMethod: string = String(req?.query?.TransactionMethod);
    let TransactionMethod = tempTransactionMethod.split(",");
    let Start: number = PageLimit * (Page - 1) + 1;
    let Id: string = String(req?.query?.Merchant);
    let SortByDate: string = String(req?.query?.SortByDate);
    let TransactionStatus: string = String(req.query.TransactionStatus);
    let Status: Array<string> = TransactionStatus.split(",");
    if (OrderType[0] == "undefined") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    console.log(Status);
    if (Status[0] == "undefined") {
      Status = [
        "successful",
        "unsuccessful",
        "pending",
        "Refund_Done",
        "Refund_Inprogress",
      ];
    }
    if (TransactionMethod[0] == "undefined") {
      TransactionMethod = [
        "DEBIT_CARD",
        "CREDIT_CARD",
        "UPI",
        "PAYTM",
        "GPAY",
        "CASH_ON_DELIVERY",
        "NETBANKING",
      ];
    }
    try {
      let transactions: any[] =
        await TransactionService.getMerchantTransactionFilter(
          OrderType,
          Start,
          PageLimit,
          TransactionMethod,
          Id,
          SortByDate,
          Status
        );
      res.status(200).json({
        status: "success",
        data: transactions,
        totalTransaction: await TransactionService.getTotalTransactionFilter(
          OrderType,
          TransactionMethod,
          "merchant",
          Id,
          Status
        ),
      });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
orderRouter.get("/getOrderById/search", async (req: Request, res: Response) => {
  let searchVal: string = String(req.query.searchVal);
  let id: string = String(req.query.id);
  let type: string = String(req.query.type);
  try {
    res.status(200).json({
      fetches: await OrderService.getOrderByIdSearch(searchVal, type, id),
    });
  } catch (error) {
    LOG.error(error);
    res.status(500).json({ error: error.message });
  }
});

orderRouter.get(
  "/getTransactionUser/action",
  async (req: Request, res: Response) => {
    let Page: number = req.query?.page ? parseInt(String(req.query.page)) : 1;
    let newOrderType: string = String(req.query.OrderType);
    let OrderType = newOrderType.split(",");
    let PageLimit: number = req?.query?.limit
      ? parseInt(String(req.query.limit))
      : 10;
    let tempTransactionMethod: string = String(req?.query?.TransactionMethod);
    let TransactionMethod = tempTransactionMethod.split(",");
    let Start: number = PageLimit * (Page - 1) + 1;
    let Id: string = String(req?.query?.Merchant);
    let SortByDate: string = String(req?.query?.SortByDate);
    let TransactionStatus: string = String(req.query.TransactionStatus);
    let Status: Array<string> = TransactionStatus.split(",");
    if (OrderType[0] == "undefined") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    if (Status[0] == "undefined") {
      Status = [
        "successful",
        "unsuccessful",
        "pending",
        "Refund_Done",
        "Refund_Inprogress",
      ];
    }
    if (TransactionMethod[0] == "undefined") {
      TransactionMethod = [
        "DEBIT_CARD",
        "CREDIT_CARD",
        "UPI",
        "PAYTM",
        "GPAY",
        "CASH_ON_DELIVERY",
      ];
    }
    try {
      let transactions: any[] =
        await TransactionService.getUserTransactionFilter(
          OrderType,
          Start,
          PageLimit,
          TransactionMethod,
          Id,
          SortByDate,
          Status
        );
      res.status(200).json({
        status: "success",
        data: transactions,
        totalTransaction: await TransactionService.getTotalTransactionFilter(
          OrderType,
          TransactionMethod,
          "user",
          Id,
          Status
        ),
      });
    } catch (error) {
      LOG.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

orderRouter.get(
  "/getOrderForSeller/:sellerId/:page/:limit/:SortByDate/:OrderType",
  async (req: Request, res: Response) => {
    let SellerId: string = req?.params?.sellerId;
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let newOrderType: string = req.params.OrderType;
    let OrderType = newOrderType.split(",");
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit
      ? parseInt(req?.params?.limit)
      : 10;
    console.log(SellerId, Page, SortByDate, PageLimit);
    let Start: number = PageLimit * (Page - 1) + 1;
    let End: number = PageLimit * Page;
    if (OrderType[0] == "undefined") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    try {
      res.status(200).json({
        order: await OrderService.getBySellerFilter(
          SellerId,
          Start,
          End,
          SortByDate,
          PageLimit,
          OrderType
        ),
        totalOrders: (
          await OrderService.getSellerTotalOrder(SellerId, OrderType)
        ).length,
      });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.put("/updateMyOrder", async (req: Request, res: Response) => {
  let order: Order = req.body?.Order;
  try {
    res.send(200).json({ result: await OrderService.updateOrder(order) });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

orderRouter.get(
  "/getAllOrder/:page/:limit/:SortByDate/:OrderType",
  async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let newOrderType: string = req.params?.OrderType;
    let OrderType = newOrderType.split(",");
    if (OrderType[0] == "undefined") {
      OrderType = [
        "Recieved",
        "Payment_Accepted",
        "Inprogress",
        "Delivered",
        "Cancelled",
        "Refund_Inprogress",
        "Refund_Done",
        "Payment_Pending",
      ];
    }
    console.log(OrderType);
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit
      ? parseInt(req?.params?.limit)
      : 10;
    let Start: number = PageLimit * (Page - 1) + 1;
    if (Start < 0) Start = 0;
    let End: number = PageLimit * Page;
    try {
      res.status(200).json({
        order: await OrderService.getFilterByOrderType(
          Start,
          End,
          SortByDate,
          PageLimit,
          OrderType
        ),
        totalOrders: await OrderService.getTotalAfterFilter(OrderType),
      });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.get(
  "/getCancelledOrder/:page/:limit/:SortByDate/:id",
  async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let UserId: string = req?.params?.id;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit
      ? parseInt(req?.params?.limit)
      : 10;
    let Start: number = PageLimit * (Page - 1) + 1;
    if (Start < 0) Start = 0;
    let End: number = PageLimit * Page;
    try {
      res.status(200).json({
        order: await OrderService.getCancelledOrder(
          Start,
          End,
          SortByDate,
          PageLimit,
          UserId
        ),
        totalOrders: (await OrderService.getUserCancelledOrder(UserId)).length,
      });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.get(
  "/getCompletedOrder/:page/:limit/:SortByDate/:id",
  async (req: Request, res: Response) => {
    let Page: number = req?.params?.page ? parseInt(req?.params?.page) : 1;
    let UserId: string = req?.params?.id;
    let SortByDate: string = req?.params?.SortByDate;
    let PageLimit: number = req?.params?.limit
      ? parseInt(req?.params?.limit)
      : 10;
    let Start: number = PageLimit * (Page - 1) + 1;
    if (Start < 0) Start = 0;
    let End: number = PageLimit * Page;
    try {
      res.status(200).json({
        order: await OrderService.getCompletedOrder(
          Start,
          End,
          SortByDate,
          PageLimit,
          UserId
        ),
        totalOrders: (await OrderService.getUserCompletedOrder(UserId)).length,
      });
    } catch (e: any) {
      LOG.error(e);
      res.status(500).json({ error: e.message });
      console.log(e);
    }
  }
);

orderRouter.get("/getAllOrder", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ order: await OrderService.get() });
  } catch (e: any) {
    LOG.error(e);
    res.status(500).json({ error: e.message });
    console.log(e);
  }
});

export { orderRouter };
