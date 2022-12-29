import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { LOG } from "./logger";
import { AppConfig } from "./config";
import { dataInit, dbInit } from "./dbinit.service";
import { number } from "joi";

/**
 * Global Variables
 */
export const collections: {
  admins?: mongoDB.Collection;
  clients?: mongoDB.Collection;
  merchants?: mongoDB.Collection;
  categories?: mongoDB.Collection;
  subCategories?: mongoDB.Collection;
  products?: mongoDB.Collection;
  brands?: mongoDB.Collection;
  documents?: mongoDB.Collection;
  colors?: mongoDB.Collection;
  units?: mongoDB.Collection;
  users?: mongoDB.Collection;
  orders?: mongoDB.Collection;
  contact?: mongoDB.Collection;
  mainPage?: mongoDB.Collection;
  banner?: mongoDB.Collection;
  coupon?: mongoDB.Collection;
  blogCategory?:mongoDB.Collection;
  blog?:mongoDB.Collection;
  inventory?:mongoDB.Collection;
  faq?:mongoDB.Collection;
} = {};

/**
 * Initialize Connection To MongoDB
 */
export async function connectToDatabase() {
  LOG.info(`Loading configuration...`);
  dotenv.config();
  let client: mongoDB.MongoClient;
  let db: mongoDB.Db;

  try {
    LOG.info(`Connecting to DB server (${AppConfig.mongo.connString})...`);
    client = new mongoDB.MongoClient(AppConfig.mongo.connString);
    await client.connect();
    LOG.info(`Loading database (${AppConfig.mongo.dbName})..`);
    db = client.db(AppConfig.mongo.dbName);
  } catch (error) {
    LOG.error(`Failed to create database connection`);
    console.error(error);
    throw new Error(error);
  }

  if (AppConfig.dbInit) {
    LOG.info(`Initializing collections in database...`);
    try {
      await dbInit(db);
    } catch (e) {
      console.log(e);
      LOG.error(`Failed to initialize database`);
      LOG.error(e);
    }
  }
  collections.admins = db.collection(AppConfig.mongoCollections.admins);
  collections.clients = db.collection(AppConfig.mongoCollections.clients);
  collections.merchants = db.collection(AppConfig.mongoCollections.merchants);
  collections.categories = db.collection(AppConfig.mongoCollections.categories);
  collections.subCategories = db.collection(AppConfig.mongoCollections.subCategories);
  collections.products = db.collection(AppConfig.mongoCollections.products);
  collections.brands = db.collection(AppConfig.mongoCollections.brands);
  collections.documents = db.collection(AppConfig.mongoCollections.documents);
  collections.colors = db.collection(AppConfig.mongoCollections.colors);
  collections.units = db.collection(AppConfig.mongoCollections.units);
  collections.users = db.collection(AppConfig.mongoCollections.user);   
  collections.orders = db.collection(AppConfig.mongoCollections.orders);
  collections.contact = db.collection(AppConfig.mongoCollections.contact);
  collections.mainPage = db.collection(AppConfig.mongoCollections.mainPage);
  collections.banner = db.collection(AppConfig.mongoCollections.banner);
  collections.coupon = db.collection(AppConfig.mongoCollections.coupon);
  collections.blogCategory= db.collection(AppConfig.mongoCollections.blogCategory);
  collections.blog = db.collection(AppConfig.mongoCollections.blog)
  collections.inventory = db.collection(AppConfig.mongoCollections.inventory)
  collections.faq = db.collection(AppConfig.mongoCollections.faq)
  LOG.info(`Successfully connected to database`);
  try {
    await applyMongoValidations(db);
  } catch (e) {
    console.log(e);
    LOG.error(`Failed to validate database`);
    LOG.error(e);
  }
  if (AppConfig.dbInit) {
    LOG.info(`Initializing data in database...`);
    try {
      await dataInit(db);
    } catch (e) {
      console.log(e);
      LOG.error(`Failed to initialize database`);
      LOG.error(e);
    }
  }
}

let applyMongoValidations = async (db: mongoDB.Db) => {
  LOG.info(`Validating collection ${AppConfig.mongoCollections.admins}`);
  await db.command({
    collMod: AppConfig.mongoCollections.admins,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "secret", "createdAt"],
        additionalProperties: true,
        properties: {
          _id: {},
          email: { bsonType: "string" },
          name: { bsonType: "string" },
          address:{bsonType:"string"},
          website_name:{bsonType:"string"},
          website_email:{bsonType:"string"},
          logoDocumentId:{bsonType: "objectId" },
          favIconDocumentId:{bsonType:"objectId"},
          socialLinks:{
            bsonType:"object",
            properties:{
              facebookLink:{ bsonType:"string"},
              googleLink:{bsonType:"string"},
              twitterLink:{bsonType:"string"}
            }
          },
          seo: {
            bsonType: "object",
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          secret: { bsonType: "string" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.clients}`);
  await db.command({
    collMod: AppConfig.mongoCollections.clients,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "secret", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          email: { bsonType: "string" },
          name: { bsonType: "string" },
          secret: { bsonType: "string" },
          isEmailVerified: { bsonType: "bool" },
          phoneNumber: { bsonType: "string" },
          isPhoneNumberVerified: { bsonType: "bool" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.merchants}`);
  await db.command({
    collMod: AppConfig.mongoCollections.merchants,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "secret", "status", "createdAt"],
        additionalProperties: true,
        properties: {
          _id: {},
          firstName: { bsonType: "string" },
          lastName: { bsonType: "string" },
          email: { bsonType: "string" },
          isEmailVerified: { bsonType: "bool" },
          secret: { bsonType: "string" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          onboardingAmount: { bsonType: "double" },
          commisionType: { enum: ["PERCENTAGE", "FIXED"] },
          commisionPercentage: { bsonType: "double" },
          commisionAmount: { bsonType: "double" },
          accessToCoupon: {
            bsonType: "array",
            items: {
              bsonType: "string"
            }
          },
          identification: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["documentId", "approvedByAdmin", "priority"],
              properties: {
                documentId: { bsonType: "objectId" },
                approvedByAdmin: { bsonType: "bool" },
                priority: { bsonType: "number" },
              },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.categories}`);
  await db.command({
    collMod: AppConfig.mongoCollections.categories,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          description: { bsonType: "string" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          imageDocumentId: { bsonType: "objectId" },
          seo: {
            bsonType: "object",
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.subCategories}`);
  await db.command({
    collMod: AppConfig.mongoCollections.subCategories,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "categoryId", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          categoryId: { bsonType: "objectId" },
          description: { bsonType: "string" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          imageDocumentId: { bsonType: "objectId" },
          seo: {
            bsonType: "object",
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });


  LOG.info(`Validating collection ${AppConfig.mongoCollections.blogCategory}`);
  await db.command({
    collMod: AppConfig.mongoCollections.blogCategory,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          description: { bsonType: "string" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          imageDocumentId: { bsonType: "objectId" },
          seo: {
            bsonType: "object",
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });

  LOG.info(`Validating collection ${AppConfig.mongoCollections.blog}`);
  await db.command({
    collMod: AppConfig.mongoCollections.blog,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "createdAt"],
        additionalProperties: true,
        properties: {
          _id: {},
          title: { bsonType: "string" },  
          category:{bsonType: "string"},
          description: { bsonType: "string" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          imageDocumentId: { bsonType: "objectId" },
          seo: {
            bsonType: "object",
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });










  LOG.info(`Validating collection ${AppConfig.mongoCollections.products}`);
  await db.command({
    collMod: AppConfig.mongoCollections.products,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "merchantId", "categoryId", "subCategoryId", "status", "createdAt"],
        additionalProperties: true,
        properties: {
          name: { bsonType: "string" },
          merchantId: { bsonType: "objectId" },
          status: { enum: ["ACTIVE", "INACTIVE"] },
          brandId: { bsonType: "objectId" },
          categoryId: { bsonType: "objectId" },
          subCategoryId: { bsonType: "objectId" },
          description: { bsonType: "string" },
          variantParameters: {
            bsonType: "object",
            additionalProperties: true,
            required: [
              "styleEnabled",
              "styleList",
              "sizeEnabled",
              "sizeList",
              "colorEnabled",
              "dimensionHeightEnabled",
              "dimensionWidthEnabled",
              "dimensionThicknessEnabled",
            ],
            properties: {
              styleEnabled: { bsonType: "bool" },
              styleList: {
                bsonType: "array",
                items: { bsonType: "string" },
              },
              sizeEnabled: { bsonType: "bool" },
              sizeList: {
                bsonType: "array",
                items: { bsonType: "string" },
              },
              colorEnabled: { bsonType: "bool" },
              dimensionHeightEnabled: { bsonType: "bool" },
              dimensionWidthEnabled: { bsonType: "bool" },
              dimensionThicknessEnabled: { bsonType: "bool" },
              dimensionUnitId: { bsonType: "objectId" },
            },
          },
          variants: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: [
                "name",
                "priority",
                "minPurchaseQuantity",
                "availableQuantity",
                "price"
              ],
              additionalProperties: true,
              properties: {
                name: { bsonType: "string" },
                priority: { bsonType: "number" },
                style: { bsonType: "string" },
                size: { bsonType: "string" },
                colorId: { bsonType: "objectId" },
                dimensions: {
                  bsonType: "object",
                  required: ["height"],
                  additionalProperties: true,
                  properties: {
                    height: { bsonType: "number" },
                    width: { bsonType: "number" },
                    thickness: { bsonType: "number" },
                  },
                },
                minPurchaseQuantity: { bsonType: "number" },
                availableQuantity: { bsonType: "number" },
                discountPercentage: { bsonType: "number" },
                price: { bsonType: "number" },
                warranty_period: {
                  bsonType: "number"
                },
                material_type: {
                  bsonType: "string"
                },
                material_finish: {
                  bsonType: "string"
                },
                images: {
                  bsonType: "array",
                  items: {
                    bsonType: "object",
                    required: ["documentId", "priority"],
                    properties: {
                      documentId: { bsonType: "objectId" },
                      priority: { bsonType: "number" },
                    },
                  },
                },
                createdAt: { bsonType: "number" },
              },
            },
          },
          images: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["documentId", "priority"],
              additionalProperties: false,
              properties: {
                documentId: { bsonType: "objectId" },
                priority: { bsonType: "number" },
              },
            },
          },
          review: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["userId", "orderId", "description", "rating", "reviewId"],
              additionalProperties: false,
              properties: {
                reviewId: { bsonType: "objectId" },
                userId: { bsonType: "objectId" },
                orderId: { bsonType: "objectId" },
                description: { bsonType: "string" },
                rating: { bsonType: "number" },
              },
            },
          },
          rating: { bsonType: "number" },
          applicableCoupons: {
            bsonType: "array",
            items: {
              bsonType: "string"
            }
          },
          price: { bsonType: "number" },
          seo: {
            bsonType: "object",
            additionalProperties: false,
            properties: {
              metaTagTitle: { bsonType: "string" },
              metaTagDescription: { bsonType: "string" },
              metaTagKeywords: { bsonType: "string" },
            },
          },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.brands}`);
  await db.command({
    collMod: AppConfig.mongoCollections.brands,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "priority", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          priority: { bsonType: "number" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.documents}`);
  await db.command({
    collMod: AppConfig.mongoCollections.documents,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["fileName", "sizeInBytes", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          fileName: { bsonType: "string" },
          sizeInBytes: { bsonType: "number" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.colors}`);
  await db.command({
    collMod: AppConfig.mongoCollections.colors,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "hexValue", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          hexValue: { bsonType: "string" },
          createdAt: { bsonType: "number" },
          priority: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.units}`);
  await db.command({
    collMod: AppConfig.mongoCollections.units,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          name: { bsonType: "string" },
          createdAt: { bsonType: "number" },
          priority: { bsonType: "number" },
        },
      },
    },
  });
  LOG.info(`Validating collection ${AppConfig.mongoCollections.orders}`);
  await db.command({
    collMod: AppConfig.mongoCollections.orders,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["address", "total_price", "discount", "customerDetail", "coupon", "order_status", "transactionDetail", "products", "expectedDeliveryDate"], //Sr_No
        additionalProperties: true,
        properties: {
          // Sr_No: { bsonType: "number" },
          products: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: [
                "sellerId",
                "productId",
                "saleId"
              ],
              additionalProperties: true,
              properties: {
                sellerId: { bsonType: "string" },
                productId: { bsonType: "string" },
                saleId: { bsonType: "objectId" }
              }
            }
          },
          order_status: { enum: ["Recieved", "Payment_Accepted", "Inprogress", "Delivered", "Cancelled", "Refund_Inprogress", "Refund_Done", "Payment_Pending"] },
          total_price: { bsonType: "number" },
          customerDetail: {
            bsonType: "object",
            additionalProperties: true,
            required: [
              "userId",
              "name",
              "phone",
              "email",
            ],
            properties: {
              userId: { bsonType: "string" },
              name: { bsonType: "string" },
              email: { bsonType: "string" },
              phone: { bsonType: "number" },
            },
          },
          discount: {
            bsonType: "array",
            items: { bsonType: "string" }
          },
          coupon: {
            bsonType: "array",
            items: { bsonType: "string" }
          },
          address: {
            bsonType: "object",
            additionalProperties: true,
            required: [
              "country",
              "state",
              "city",
              "postal_code",
              "main_address_text",
            ],
            properties: {
              country: { bsonType: "string" },
              state: { bsonType: "string" },
              city: { bsonType: "string" },
              main_address_text: { bsonType: "string" },
              postal_code: { bsonType: "string" },
            },
          },
          transactionDetail: {
            bsonType: "object",
            additionalProperties: true,
            required: [
              "status",
              "transactionMethod"
            ],
            properties: {
              status: { bsonType: "string" },
              transactionMethod: {
                enum: ["CASH_ON_DELIVERY", "GPAY", "PAYTM", "UPI", "CREDIT_CARD", "DEBIT_CARD"]
              }
            },
          },
          seller: { bsonType: "string" },
          createdAt: { bsonType: "number" },
          expectedDeliveryDate: { bsonType: "number" }
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.contact}`);
  await db.command({
    collMod: AppConfig.mongoCollections.contact,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "email", "phone", "message", "createdAt"], //Sr_No
        additionalProperties: true,
        properties: {
          message: { bsonType: "string" },
          name: { bsonType: "string" },
          email: { bsonType: "string" },
          phone: { bsonType: "number" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.mainPage}`);
  await db.command({
    collMod: AppConfig.mongoCollections.mainPage,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["About_Us", "Material_Selection_1", "Material_Selection_2", "Shop_By_Category", "Featured_Products", "createdAt", "updatedAt", "SmallBanner1", "SmallBanner2", "MainBanner"],
        additionalProperties: true,
        properties: {
          _id: { bsonType: "objectId" },
          About_Us: { bsonType: "string" },
          Benefits_of_having_Marble: { bsonType: "string" },
          Material_Selection_1: {
            bsonType: "array",
            items: {
              bsonType: "object",
              additionalProperties: true,
              required: [
                "categoryId",
                "nameOfCategory"
              ],
              properties: {
                categoryId: { bsonType: "objectId" },
                nameOfCategory: { bsonType: "string" },
                priority: { bsonType: "number" },
                images: { bsonType: "objectId" }
              },
            }
          },
          Material_Selection_2: {
            bsonType: "array",
            items: {
              bsonType: "object",
              additionalProperties: true,
              required: [
                "categoryId",
                "nameOfCategory"
              ],
              properties: {
                categoryId: { bsonType: "objectId" },
                nameOfCategory: { bsonType: "string" },
                priority: { bsonType: "number" },
                images: { bsonType: "objectId" }
              },
            }
          },
          Shop_By_Category: {
            bsonType: "array",
            items: {
              bsonType: "object",
              additionalProperties: true,
              required: [
                "categoryId",
                "nameOfCategory"
              ],
              properties: {
                categoryId: { bsonType: "objectId" },
                nameOfCategory: { bsonType: "string" },
                priority: { bsonType: "number" },
                images: { bsonType: "objectId" }
              },
            }
          },
          Featured_Products: {
            bsonType: "array",
            items: {
              bsonType: "object",
              additionalProperties: true,
              required: [
                "productId",
                "nameOfProduct"
              ],
              properties: {
                productId: { bsonType: "objectId" },
                nameOfProduct: { bsonType: "string" },
                priority: { bsonType: "number" },
                images: { bsonType: "objectId" }
              },
            }
          },
          SmallBanner1: { bsonType: "objectId" },
          SmallBanner2: { bsonType: "objectId" },
          MainBanner: {
            bsonType: "array",
            items: { bsonType: "objectId" }
          },
          updatedAt: { bsonType: "double" },
          createdAt: { bsonType: "double" },
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.banner}`)
  await db.command({
    collMod: AppConfig.mongoCollections.banner,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: true,
        required: [
          "Banner_Title",
          "Button_Link",
          "Banner_Type",
          "images",
        ],
        properties: {
          Banner_Title: { bsonType: "string" },
          Button_Title: { bsonType: "string" },
          Button_Link: { bsonType: "string" },
          priority: { bsonType: "number" },
          images: { bsonType: "objectId" },
          Banner_Type: {
            enum: ["Small1", "Small2", "Main"]
          },
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.coupon}`)
  await db.command({
    collMod: AppConfig.mongoCollections.coupon,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: true,
        required: [
          "name",
          "discountType",
          "PriceRange",
          "eligiblity",
          "validity",
          "AccessToMerchantWithProduct"
        ],
        properties: {
          name: { bsonType: "string" },
          discountPerc: { bsonType: "number" },
          PriceRange: {
            bsonType: "object",
            additionalProperties: false,
            required: [
              "max",
              "min"
            ],
            properties: {
              max: { bsonType: "number" },
              min: { bsonType: "number" },
            },
          },
          discountType: { enum: ["PERCENTAGE", "FLAT"] },
          flatValue: { bsonType: "number" },
          eligiblity: {
            bsonType: "object",
            additionalProperties: false,
            required: [
              "cardType",
              "cardName"
            ],
            properties: {
              cardType: { bsonType: "string" },
              cardName: { bsonType: "string" },
            },
          },
          validity: {
            bsonType: "object",
            additionalProperties: false,
            required: [
              "from",
              "to"
            ],
            properties: {
              from: { bsonType: "number" },
              to: { bsonType: "number" },
            },
          },
          AccessToMerchantWithProduct: {
            bsonType: "array",
            items: {
              bsonType: "object",
              additionalProperties: false,
              required: [
                "merchantId",
                "productId"
              ],
              properties: {
                merchantId: { bsonType: "objectId" },
                productId: { bsonType: "objectId" }
              },
            }
          },
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.inventory}`)
  await db.command({
    collMod: AppConfig.mongoCollections.inventory,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: true,
        required: [
          "_id",
          "productId",
          "sellingPrice",
          "variant_Name",
          "stock",
          "availableItems",
          "taxAmount",
          "createdAt",
        ],
        properties: {
          _id: { bsonType: "objectId" },
          productId: { bsonType: "objectId" },
          sellingPrice: { bsonType: "number" },
          variant_Name: { bsonType: "string" },
          stock: { bsonType: "number" },
          availableItems: { bsonType: "number" },
          taxAmount: { bsonType: "number" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  })
  LOG.info(`Validating collection ${AppConfig.mongoCollections.faq}`);
  await db.command({
    collMod: AppConfig.mongoCollections.faq,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["question", "answer"], 
        additionalProperties: true,
        properties: {
          _id: { bsonType: "objectId" },
          question: { bsonType: "string" },
          answer: { bsonType: "string" },
          createdAt: { bsonType: "number" },
        },
      },
    },
  })



};
