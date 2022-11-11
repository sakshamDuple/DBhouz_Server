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

    async getProductByOrderId(OrderId: string, type: number, PageLimit: number): Promise<any[]> {
        let agg = [
            {
                '$match': {
                    '_id': new ObjectId(OrderId)
                }
            }, {
                '$project': {
                    "_id": 0,
                    'products.productId': 1,
                }
            }
        ];
        let AllProductId = await collections.orders.aggregate(agg).toArray()
        let arr = [];
        for (let product of AllProductId) for (let eachProduct of product.products) arr.push(eachProduct);
        if (arr[0].productId != "" && arr.length > 0) {
            let m = []
            arr.forEach(element => {
                m.push(new ObjectId(element.productId))
            });
            arr = m
        }
        let agg2 = [
            {
                '$match': {
                    '_id': { "$in": arr }
                }
            }
        ]
        let AllProducts = await collections.products.aggregate(agg2).toArray()
        return AllProducts
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

    async updateOrder(order: Order): Promise<any> {
        let update = false
        if (order.expectedDeliveryDate < Date.now()) {
            order.orderCompleteFlag = true
            await collections.orders.findOneAndUpdate(order._id, order)
            update = true
        }
        // if ()
        return { Order: order, Update: update }
    }

    async getByUserFilter(Id: string, Start: number, End: number, SortByDate: string, PageLimit: number, OrderType: Array<string>): Promise<Order[]> {
        // let Orders: Order[]
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({
                    'customerDetail.userId': Id, 'order_status': {
                        '$in': OrderType
                    }
                }).sort({ createdAt: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
            // Orders.forEach(async Order => {
            //     if (Order.expectedDeliveryDate > Date.now()) {
            //         Order.orderCompleteFlag = true
            //         try {
            //             await collections.orders.findOneAndUpdate(Order._id, Order)
            //         } catch (e) {
            //             console.log(e)
            //         }
            //     }
            // });
            // return Orders
        }
        return (await collections.orders
            .find({
                'customerDetail.userId': Id, 'order_status': {
                    '$in': OrderType
                }
            }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
        // Orders.forEach(async Order => {
        //     if (Order.expectedDeliveryDate > Date.now()) {
        //         Order.orderCompleteFlag = true
        //         try {
        //             await collections.orders.findOneAndUpdate(Order._id, Order)
        //         } catch (e) {
        //             console.log(e)
        //         }
        //     }
        // });
        // return Orders

    }
    async getTotalByUserFilter(Id: string, OrderType: Array<string>): Promise<number> {
        return (await collections.orders
            .find({
                'customerDetail.userId': Id, 'order_status': {
                    '$in': OrderType
                }
            }).sort({ createdAt: 1 })
            .toArray()).length
    }
    // async getBySellerFilter(Id: string, Start: number, End: number, SortByDate: string, PageLimit: number, OrderType: Array<string>): Promise<Order[]> {
    //     if (SortByDate == "Desc") {
    //         return (await collections.orders
    //             .find({
    //                 "products.sellerId": Id, 'order_status': {
    //                     '$in': OrderType
    //                 }
    //             }).sort({ createdAt: 1 })
    //             .limit(PageLimit).skip(Start - 1)
    //             .toArray()) as Order[]
    //     }
    //     return (await collections.orders
    //         .find({
    //             "products.sellerId": Id, 'order_status': {
    //                 '$in': OrderType
    //             }
    //         }).sort({ createdAt: -1 })
    //         .limit(PageLimit).skip(Start - 1)
    //         .toArray()) as Order[]
    // }
    async getBySellerFilter(Id: string, Start: number, End: number, SortByDate: string, PageLimit: number, OrderType: Array<string>): Promise<Order[]> {
        let start = Start - 1;
        console.log(start)
        let agg = [
            {
                '$match': {
                    'products.sellerId': Id, 'order_status': {
                        '$in': OrderType
                    }
                }
            }, {
                '$sort': { "createdAt": -1 },
            }, {
                '$limit': PageLimit
            }, {
                '$skip': start
            }
        ]
        if (SortByDate == "Desc") {
            agg = [
                {
                    '$match': {
                        'products.sellerId': Id, 'order_status': {
                            '$in': OrderType
                        }
                    }
                }, {
                    '$sort': { "createdAt": 1 },
                }, {
                    '$limit': PageLimit
                }, {
                    '$skip': start
                }
            ]
        }
        let TheseOrders = await collections.orders.aggregate(agg)
        let ThisSellerOrders = []
        await TheseOrders.forEach(order => {
            let totalPrice = 0
            let products = []
            order.products.forEach(element => {
                if (element.sellerId == Id) {
                    totalPrice += element.totalPriceOfThisProducts
                    products.push(element)
                }
            });
            let object = order
            object.products = products
            ThisSellerOrders.push(object)
        });
        return ThisSellerOrders as Order[]
    }
    async get(): Promise<Order[]> {
        return (await collections.orders
            .find().sort({ createdAt: -1 })
            .toArray()) as Order[]
    }

    async getTotalAfterFilter(OrderType: Array<string>): Promise<number> {
        return (await collections.orders
            .find({
                'order_status': {
                    '$in': OrderType
                }
            }).sort({ createdAt: -1 })
            .toArray()).length
    }

    async getFilterByOrderType(Start: number, End: number, SortByDate: string, PageLimit: number, OrderType: Array<string>): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({
                    'order_status': {
                        '$in': OrderType
                    }
                }).sort({ createdAt: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({
                "order_status": {
                    '$in': OrderType
                }
            }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }
    async getCompletedOrder(Start: number, End: number, SortByDate: string, PageLimit: number, UserId: string): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Payment_Accepted }).sort({ createdAt: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Payment_Accepted }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }
    async getCancelledOrder(Start: number, End: number, SortByDate: string, PageLimit: number, UserId: string): Promise<Order[]> {
        if (SortByDate == "Desc") {
            return (await collections.orders
                .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Cancelled }).sort({ createdAt: 1 })
                .limit(PageLimit).skip(Start - 1)
                .toArray()) as Order[]
        }
        return (await collections.orders
            .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
            .limit(PageLimit).skip(Start - 1)
            .toArray()) as Order[]
    }

    async getByUser(Id: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "customerDetail.userId": Id })
            .sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getSeller(SellerId: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "products.sellerId": SellerId }).sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getSellerTotalOrder(SellerId: string, OrderType: Array<string>): Promise<Order[]> {
        return (await collections.orders
            .find({
                "products.sellerId": SellerId, 'order_status': {
                    '$in': OrderType
                }
            }).sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getUserCompletedOrder(UserId: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Delivered }).sort({ createdAt: -1 })
            .toArray()) as Order[]
    }

    async getAllCancelledOrder(): Promise<Order[]> {
        return (await collections.orders
            .find({ "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getSellerCancelledOrder(SellerId: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "products.sellerId": SellerId, "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
            .toArray()) as Order[]
    }
    async getUserCancelledOrder(UserId: string): Promise<Order[]> {
        return (await collections.orders
            .find({ "customerDetail.userId": UserId, "order_status": OrderStatus.Cancelled }).sort({ createdAt: -1 })
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
            if (!i.reviewFlagOfThisProduct) i.reviewFlagOfThisProduct = false
        })
        if (!o.reviewFlag) o.reviewFlag = false;
        if (o.address) o.address.addressId = new ObjectId(o.address.addressId)
        if (o.customerDetail) o.customerDetail.customerId = new ObjectId(o.customerDetail.customerId)
        if (o.transactionDetail.transactionMethod != transactionMethod.CASH_ON_DELIVERY) o.transactionDetail.transactionId = new ObjectId(o.transactionDetail.transactionId)
        if (Number.isNaN(o.total_price)) o.total_price = 0
        if (o.createdAt) o.expectedDeliveryDate = 5 * 24 * 60 * 60 * 1000 + Date.now();
        return o
    }
}

export let OrderService: OrderServiceClass = new OrderServiceClass()