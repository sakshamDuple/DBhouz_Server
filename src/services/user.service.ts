import { Double, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { ECommisionType, ICart, IContact, IMerchant, IProduct, IUser } from "../interfaces";

class UserServiceClass {
  async get(userId: string | ObjectId): Promise<IUser> {
    const query = { _id: new ObjectId(userId) };
    return (await collections.users.findOne({})) as IUser;
  }

  async makeContact(contact: IContact): Promise<IContact> {
    contact = { ...contact }
    contact = this.sanitizeContact(contact);
    const result: InsertOneResult<IContact> = await collections.contact.insertOne(contact);
    contact._id = result.insertedId;
    console.log(contact)
    return contact;
  }

  async getAllContact(): Promise<IContact[]> {
    return await collections.contact.find().toArray() as IContact[];
    // return result[];
  }

  async getSpecificUser(userId: string | ObjectId): Promise<IUser> {
    const query = { _id: userId };
    return (await collections.users.findOne({ query })) as IUser;
  }

  async getByEmail(email: string): Promise<IUser> {
    return (await collections.users.findOne({ email })) as IUser;
  }

  async getByEmailM(email: string): Promise<IMerchant> {
    return (await collections.merchants.findOne({ email })) as IMerchant;
  }

  async getAll(): Promise<IUser[]> {
    let query: any = {};
    return (await collections.users.find(query).sort({ createdAt: -1 }).toArray()) as IUser[];
  }

  async create(newUser: IUser): Promise<IUser> {
    newUser = { ...newUser };
    const existingMerchant: IUser = await this.getByEmail(newUser.email);
    if (existingMerchant) {
      throw new Error(`User with this email already exists`);
    }
    newUser.createdAt = Date.now();
    delete newUser._id;
    newUser = this.sanitize(newUser);
    console.log(newUser)
    const result: InsertOneResult<IUser> = await collections.users.insertOne(newUser);
    newUser._id = result.insertedId;
    return newUser;
  }

  async update(merchant: IUser): Promise<boolean> {
    merchant = { ...merchant };
    const existingMerchant: IUser = await this.getByEmail(merchant.email);
    if (existingMerchant && existingMerchant._id.toString() !== merchant._id.toString()) {
      throw new Error(`User with this email already exists`);
    }
    const query = { _id: new ObjectId(merchant._id) };
    delete merchant._id;
    merchant = this.sanitize(merchant);
    let result: UpdateResult = await collections.users.updateOne(query, {
      $set: merchant,
    });
    return result.modifiedCount > 0;
  }

  async updateC(contact: IContact): Promise<boolean> {
    contact = { ...contact };
    const existingMerchant: IUser = await this.getByEmail(contact.email);
    if (existingMerchant && existingMerchant._id.toString() !== contact._id.toString()) {
      throw new Error(`User with this email already exists`);
    }
    const query = { _id: new ObjectId(contact._id) };
    delete contact._id;
    contact = this.sanitizeContact(contact);
    let result: UpdateResult = await collections.users.updateOne(query, {
      $set: contact,
    });
    return result.modifiedCount > 0;
  }

  async verifyUser(userId: ObjectId): Promise<boolean> {
    const query = { _id: userId };
    let result: UpdateResult = await collections.users.updateOne(query, {
      $set: { isEmailVerified: true },
    });
    return result.modifiedCount > 0;
  }

  async delete(merchantId: string | ObjectId): Promise<boolean> {
    const query = { _id: new ObjectId(merchantId) };
    const result = await collections.users.deleteOne(query);
    return result && result.deletedCount > 0;
  }

  async deleteC(contactId: string | ObjectId): Promise<boolean> {
    const query = { _id: new ObjectId(contactId) };
    const result = await collections.contact.deleteOne(query);
    return result && result.deletedCount > 0;
  }

  async update_Cart_Wishlist(userId: string, cart: ICart[], wishList: IProduct[]): Promise<any> {
    let foundUser: IUser = await collections.users.findOne({ _id: new ObjectId(userId) }) as IUser
    foundUser.cart = cart;
    foundUser.wishList = wishList;
    let resultedUser = await collections.users.findOneAndUpdate({_id: foundUser._id},{"$set":foundUser})
    if (resultedUser.ok == 1) {
      return await collections.users.findOne({ _id: new ObjectId(userId) }) as IUser
    }
    return resultedUser
  }

  async getCartAndWishlist(userId:string): Promise<any> {
    let foundUser: IUser = await collections.users.findOne({ _id: new ObjectId(userId) }) as IUser
    return {cart:foundUser.cart,wishList:foundUser.wishList}
  }

  sanitize(o: IUser): IUser {
    if (!o.firstName) delete o.firstName;
    if (!o.lastName) delete o.lastName;
    if (!o.isEmailVerified) o.isEmailVerified = false;
    if (!o.cart) delete o.cart;
    if (!o.wishList) delete o.wishList;
    if (o.identification) {
      o.identification.forEach((i) => {
        i.documentId = new ObjectId(i.documentId);
      });
    }
    return o;
  }

  sanitizeContact(o: IContact): IContact {
    if (!o.name) delete o.name;
    if (!o.message) delete o.message;
    if (!o.phone) delete o.phone;
    if (!o.email) delete o.email;
    return o;
  }
}

export let userService: UserServiceClass = new UserServiceClass();
