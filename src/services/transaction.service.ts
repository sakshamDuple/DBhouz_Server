import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { OrderStatus, Order, transactionMethod } from "../interfaces";

class TransactionServiceClass {
    async getAllTransactionFilter(OrderType: Array<string>, Start: number, PageLimit: number, TransactionMethod: Array<string>, SortByDate: string, Status: Array<string>): Promise<any[]> {
        console.log(Start, PageLimit)
        const agg = [
            {
                '$match': {
                    'order_status': {
                        '$in': OrderType
                    },
                    'transactionDetail.transactionMethod': {
                        '$in': TransactionMethod
                    },
                    'transactionDetail.status': {
                        '$in': Status
                    }
                }
            }, {
                '$project': {
                    'transactionDetail': 1,
                    "products": 1,
                    "customerDetail": 1,
                    "total_price": 1
                }
            }, {
                '$skip': Start - 1
            }, {
                '$limit': PageLimit
            }
        ];
        let Alltransactions
        if (SortByDate == "Desc") {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: 1 })
                .limit(PageLimit)
                .toArray()
        } else {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: -1 })
                .limit(PageLimit)
                .toArray()
        }
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

    async getMerchantTransactionFilter(OrderType: Array<string>, Start: number, PageLimit: number, TransactionMethod: Array<string>, Id: string, SortByDate: string, Status: Array<string>): Promise<any[]> {
        console.log(Start, PageLimit, OrderType, Status)
        const agg = [
            {
                '$match': {
                    'order_status': {
                        '$in': OrderType
                    },
                    'transactionDetail.transactionMethod': {
                        '$in': TransactionMethod
                    },
                    'products.sellerId': Id,
                    'transactionDetail.status': {
                        '$in': Status
                    }
                }
            }, {
                '$project': {
                    'transactionDetail': 1,
                    "products": 1,
                    "customerDetail": 1,
                    "total_price": 1
                }
            }, {
                '$skip': Start - 1
            }, {
                '$limit': PageLimit
            }
        ];
        let Alltransactions
        if (SortByDate == "Desc") {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: 1 })
                .limit(PageLimit)
                .toArray()
        } else {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: -1 })
                .limit(PageLimit)
                .toArray()
        }
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

    async getUserTransactionFilter(OrderType: Array<string>, Start: number, PageLimit: number, TransactionMethod: Array<string>, Id: string, SortByDate: string, Status: Array<string>): Promise<any[]> {
        console.log(Start, PageLimit, OrderType, Status)
        const agg = [
            {
                '$match': {
                    'order_status': {
                        '$in': OrderType
                    },
                    'transactionDetail.transactionMethod': {
                        '$in': TransactionMethod
                    },
                    'customerDetail.userId': Id,
                    'transactionDetail.status': {
                        '$in': Status
                    }
                }
            }, {
                '$project': {
                    'transactionDetail': 1,
                    "products": 1,
                    "customerDetail": 1,
                    "total_price": 1
                }
            }, {
                '$skip': Start - 1
            }, {
                '$limit': PageLimit
            }
        ];
        let Alltransactions
        if (SortByDate == "Desc") {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: 1 })
                .limit(PageLimit)
                .toArray()
        } else {
            Alltransactions = await collections.orders.aggregate(agg).limit(PageLimit)
                .sort({ createdAt: -1 })
                .limit(PageLimit)
                .toArray()
        }
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

    async getTotalTransactionFilter(OrderType: Array<string>, TransactionMethod: Array<string>, UserType: string, Id: string, Status: Array<string>): Promise<number> {
        let agg = [{}, {}]
        switch (UserType) {
            case "user":
                agg = [
                    {
                        '$match': {
                            'order_status': {
                                '$in': OrderType
                            },
                            'transactionDetail.transactionMethod': {
                                '$in': TransactionMethod
                            },
                            'customerDetail.userId': Id,
                            'transactionDetail.status': {
                                '$in': Status
                            }
                        }
                    }, {
                        '$project': {
                            'transactionDetail': 1,
                            "products": 1,
                            "customerDetail": 1,
                            "total_price": 1
                        }
                    }
                ];
                break;
            case "admin":
                agg = [
                    {
                        '$match': {
                            'order_status': {
                                '$in': OrderType
                            },
                            'transactionDetail.transactionMethod': {
                                '$in': TransactionMethod
                            },
                            'transactionDetail.status': {
                                '$in': Status
                            }
                        }
                    }, {
                        '$project': {
                            'transactionDetail': 1,
                            "products": 1,
                            "customerDetail": 1,
                            "total_price": 1
                        }
                    }
                ];
                break;
            case "merchant":
                agg = [
                    {
                        '$match': {
                            'order_status': {
                                '$in': OrderType
                            },
                            'transactionDetail.transactionMethod': {
                                '$in': TransactionMethod
                            },
                            'products.sellerId': Id,
                            'transactionDetail.status': {
                                '$in': Status
                            }
                        }
                    }, {
                        '$project': {
                            'transactionDetail': 1,
                            "products": 1,
                            "customerDetail": 1,
                            "total_price": 1
                        }
                    }
                ];
                break;
        }
        let TotalTransactions = await (await collections.orders.aggregate(agg).toArray()).length
        return TotalTransactions
    }
}

export let TransactionService: TransactionServiceClass = new TransactionServiceClass()