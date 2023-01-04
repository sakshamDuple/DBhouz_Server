import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { INotification, IOwnerType } from "../interfaces";
import { AdminService } from "./admin.service";

class NotifictionServiceClass {

    async getSelectNotificationById(id: ObjectId): Promise<INotification> {
        return (await collections.notifications.findOne({ _id: id })) as INotification;
    }

    async getAllForAdmin(): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Admin" }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getAllForThisMerchant(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Merchant", typeId: id }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getAllForThisUser(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "User", typeId: id }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getReadForAdmin(): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Admin", read: true }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getUnreadForAdmin(): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Admin", read: false }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getReadForThisMerchant(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Merchant", typeId: id, read: true }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getUnreadForThisMerchant(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "Merchant", typeId: id, read: false }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getReadForThisUser(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "User", typeId: id, read: true }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async getUnreadForThisUser(id: ObjectId): Promise<INotification[]> {
        return (await collections.notifications.find({ OwnerType: "User", typeId: id, read: false }).sort({ createdAt: -1 }).toArray()) as INotification[];
    }

    async create(topic: string, OwnerType: string, typeId: ObjectId, description: string): Promise<any> {
        let thisOwnerType: IOwnerType = (OwnerType == IOwnerType.Admin || OwnerType == IOwnerType.Merchant || OwnerType == IOwnerType.User) ? OwnerType : IOwnerType.Null
        if (OwnerType == IOwnerType.Admin) typeId = await AdminService.getAdminId()
        let notification: INotification = {
            topic: topic,
            OwnerType: thisOwnerType,
            typeId: new ObjectId(typeId),
            description: description,
            createdAt: Date.now()
        }
        this.sanitize(notification)
        console.log("topic, OwnerType, typeId, description",notification)
        const result: InsertOneResult<INotification> = await collections.notifications.insertOne(notification);
        notification._id = result.insertedId
        return notification
    }

    async updateRead(id: string): Promise<boolean> {
        let notification: INotification = await collections.notifications.findOne({ _id: new ObjectId(id) }) as INotification
        let newNotification = { ...notification }
        newNotification.read = true
        let result: UpdateResult = await collections.notifications.updateOne({ _id: new ObjectId(id) }, { $set: newNotification })
        return (result.modifiedCount > 0)
    }

    async delete(id: string): Promise<boolean> {
        let deleteN: DeleteResult = await collections.notifications.deleteOne({ _id: new ObjectId(id) })
        return (deleteN.acknowledged == true)
    }

    sanitize(o: any): INotification {
        if (!o.OwnerType) o.OwnerType = IOwnerType.Null;
        if (!o.description) o.description = "";
        if (!o.read) o.read = false;
        if (!o.topic) o.topic = "";
        if (!o.typeId) o.typeId = null;
        return o
    }
}

export let NotifictionService: NotifictionServiceClass = new NotifictionServiceClass()