import express, { Request, Response, Router } from 'express'
import { LOG } from '../logger';
import { NotifictionService } from '../services/notification.service';
import { ObjectId } from 'mongodb';

const notificationRouter: Router = express.Router()
notificationRouter.use(express.json())

notificationRouter.post('/create', async (req: Request, res: Response) => {
    try {
        let topic: string = req.body.topic
        let OwnerType: string = req.body.OwnerType;
        let typeId: ObjectId = new ObjectId(req.body.typeId);
        let description: string = req.body.description
        let Notification = await NotifictionService.create(topic, OwnerType, typeId, description);
        res.status(200).json({ Notification });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getEveryForAdmin', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ Notifications: await NotifictionService.getAllForAdmin() });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getSelectNotificationById', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        res.status(200).json({ Notification: await NotifictionService.getSelectNotificationById(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

notificationRouter.put('/updateSelectNotificationById', async (req: Request, res: Response) => {
    let Id: string = req?.query?.id ? req?.query?.id.toString() : null;
    try {
        res.status(200).json({ update: await NotifictionService.updateRead(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

notificationRouter.get('/getEveryForThisMerchant', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        res.status(200).json({ Notifications: await NotifictionService.getAllForThisMerchant(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getEveryForThisUser', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        res.status(200).json({ Notifications: await NotifictionService.getAllForThisUser(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getReadForAdmin', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ Notifications: await NotifictionService.getReadForAdmin() });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getReadForThisMerchant', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        res.status(200).json({ Notifications: await NotifictionService.getReadForThisMerchant(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getReadForThisUser', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        let Notifications = await NotifictionService.getReadForThisUser(Id)
        console.log(Notifications)
        res.status(200).json({ Notifications});
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getUnreadForAdmin', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ Notifications: await NotifictionService.getUnreadForAdmin() });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getUnreadForThisMerchant', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        res.status(200).json({ Notifications: await NotifictionService.getUnreadForThisMerchant(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.get('/getUnreadForThisUser', async (req: Request, res: Response) => {
    let Id: ObjectId = req?.query?.id ? new ObjectId(req?.query?.id.toString()) : null;
    try {
        let Notifications = await NotifictionService.getUnreadForThisUser(Id)
        console.log(Notifications)
        res.status(200).json({ Notifications});
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

notificationRouter.delete('/deleteSelectNotificationById', async (req: Request, res: Response) => {
    let Id: string = req?.query?.id ? req?.query?.id.toString() : null;
    try {
        res.status(200).json({ delete: await NotifictionService.delete(Id) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

export { notificationRouter }