import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { OrderStatus, Order, transactionMethod } from "../interfaces";

class OrderServiceClass {
    async create(newOrder: Order): Promise<any> {
        newOrder = { ...newOrder }
        newOrder.createdAt = Date.now()
        newOrder.transactionDetail.transactionDate = Date.now()
        if (newOrder.transactionDetail.transactionMethod == "CASH_ON_DELIVERY") {
            newOrder.transactionDetail.transactionMethod = transactionMethod.CASH_ON_DELIVERY
        }
        newOrder = this.sanitize(newOrder)
        // const agg = [
        //     {
        //         '$sort': {
        //             'Sr_No': -1
        //         }
        //     }, {
        //         '$limit': 1
        //     }, {
        //         '$project': {
        //             'Sr_No': 1,
        //             '_id': 0
        //         }
        //     }
        // ];
        // let maxVal = await collections.orders.aggregate(agg)
        // let resultOfVal = await maxVal.toArray()
        // let nextVal = resultOfVal[0].Sr_No + 1
        // newOrder.Sr_No = nextVal
        if (newOrder.transactionDetail.status == "successful" && newOrder.transactionDetail.transactionMethod != transactionMethod.CASH_ON_DELIVERY) {
            newOrder.order_status = OrderStatus.Payment_Accepted
        } else {
            newOrder.order_status = OrderStatus.Payment_Pending
        }
        const result: InsertOneResult<Order> = await collections.orders.insertOne(newOrder);
        newOrder._id = result.insertedId
        return newOrder
    }
    async getAllTransaction(): Promise<any[]> {
        const agg = [
            {
                '$project': {
                    'transactionDetail': 1,
                    "products": 1,
                    "customerDetail": 1,
                    "total_price": 1
                }
            }
        ];
        let Alltransactions = await collections.orders.aggregate(agg)
        let transactions = []
        await Alltransactions.forEach(transaction => {
            let object = {
                transaction_Id: transaction.transactionDetail.transactionId,
                transaction_Method: transaction.transactionDetail.transactionMethod,
                status: transaction.transactionDetail.status,
                transaction_Number: transaction.transactionDetail.transactionNumber,
                transaction_Date: transaction.transactionDetail.transactionDate,
                amount_Of_Transaction: transaction.total_price,
                customerDetail: transaction.customerDetail,
                products: transaction.products,
            }
            transactions.push(object)
        });
        return transactions
    }
    async getTransaction(id: string, type: string): Promise<any[]> {
        let agg = [
            {
                '$match': {
                }
            },
            {
                '$project': {
                    'transactionDetail': 1,
                    "products": 1,
                    "customerDetail": 1,
                    "total_price": 1
                }
            }
        ];
        if (type == "seller")
            agg = [
                {
                    '$match': {
                        'products.sellerId': id
                    }
                }, {
                    '$project': {
                        'transactionDetail': 1,
                        'products': 1,
                        'customerDetail': 1,
                        'total_price': 1
                    }
                }
            ];
        if (type == "user")
            agg = [
                {
                    '$match': {
                        'customerDetail.userId': id
                    }
                }, {
                    '$project': {
                        'transactionDetail': 1,
                        'products': 1,
                        'customerDetail': 1,
                        'total_price': 1
                    }
                }
            ]
        let Alltransactions = await collections.orders.aggregate(agg)
        let transactions = []
        await Alltransactions.forEach(transaction => {
            let totalPrice = 0
            let products = []
            transaction.products.forEach(element => {
                if (element.sellerId == id && type == "seller") {
                    totalPrice += element.totalPriceOfThisProducts
                    products.push(element)
                }
            });
            let object = {
                transaction_Id: transaction.transactionDetail.transactionId,
                transaction_Method: transaction.transactionDetail.transactionMethod,
                status: transaction.transactionDetail.status,
                transaction_Number: transaction.transactionDetail.transactionNumber,
                transaction_Date: transaction.transactionDetail.transactionDate,
                amount_Of_Transaction: (type == "seller") ? totalPrice : transaction.total_price,
                customerDetail: transaction.customerDetail,
                products: (type == "seller") ? products : transaction.products,
            }
            transactions.push(object)
        });
        return transactions
    }
    async getByUser(Id: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "customerDetail.userId": Id })
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getByUserFilter(Id: string, Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
        if (SortByDate == "Desc") {
            console.log(Start, End, SortByDate)
            return (await collections.orders
                .find({ "customerDetail.userId": Id })
                .limit(PageLimit).skip(Start - 1)
                .sort({ createdAt: 1 })
                .limit(PageLimit)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "customerDetail.userId": Id })
            .limit(PageLimit).skip(Start - 1)
            .sort({ createdAt: -1 })
            .limit(PageLimit)
            .toArray()) as Order[]
    }
    async getBySeller(Id: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "products.sellerId": Id })
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getBySellerFilter(Id: string, Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({ "products.sellerId": Id })
                .limit(PageLimit).skip(Start - 1)
                .sort({ createdAt: 1 })
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "products.sellerId": Id })
            .limit(PageLimit).skip(Start - 1)
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async get(): Promise<Order[]> {
        return (await collections.orders
            .find().sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getFilter(Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
        if (SortByDate == "Desc") {
            console.log(Start)
            return (await collections.orders
                .find().sort({ createdAt: -1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        console.log(Start)
        return (await collections.orders
            .find().sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }
    async getCompletedOrder(Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({ "order_status": OrderStatus.Delivered }).sort({ createdAt: -1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "order_status": OrderStatus.Delivered }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }
    async getCancelledOrder(Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({ "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }
    // async getTransactionDetailForUser(Start: number, End: number, SortByDate: string, PageLimit: number): Promise<Order[]> {
    //     if (SortByDate == "Desc") {
    //         return (await collections.orders
    //             .find({ "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
    //             .limit(PageLimit).skip(Start - 1)
    //             .toArray()) as Order[]
    //     }
    //     return (await collections.orders
    //         .find({ "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
    //         .limit(PageLimit).skip(Start - 1)
    //         .toArray()) as Order[]
    // }
    sanitize(o: Order): Order {
        if (o.products) o.products.forEach(i => {
            i.saleId = new ObjectId(i.saleId)
        })
        if (o.address) o.address.addressId = new ObjectId(o.address.addressId)
        if (o.customerDetail) o.customerDetail.customerId = new ObjectId(o.customerDetail.customerId)
        if (o.transactionDetail.transactionMethod != transactionMethod.CASH_ON_DELIVERY) o.transactionDetail.transactionId = new ObjectId(o.transactionDetail.transactionId)
        if (Number.isNaN(o.total_price)) o.total_price = 0
        if (o.createdAt) o.expectedDeliveryDate = 5 * 24 * 60 * 60 * 1000 + Date.now();
        return o
    }
}

export let OrderService: OrderServiceClass = new OrderServiceClass()