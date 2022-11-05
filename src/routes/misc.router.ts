import express, { Request, Response, Router } from 'express'
import { LOG } from '../logger';
import { Banner, Banner_Type, DisplayCategory, DisplayProducts, IColor, ICoupon, IUnit, MainPage } from '../interfaces';
import { ColorService } from '../services/color.service';
import { UnitService } from '../services/unit.service';
import { mainPageService } from '../services/mainPage.service';
import { ObjectID } from 'bson';
import { couponService } from '../services/coupon.service';

const miscRouter: Router = express.Router()
miscRouter.use(express.json())

miscRouter.get('/getAllColors', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ colors: (await ColorService.getAll()) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})
miscRouter.get('/getColor/:colorId', async (req: Request, res: Response) => {
    const colorId = req?.params?.colorId;
    try {
        res.status(200).json({
            color: await ColorService.get(colorId),
        });
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: `Unable to find matching color with colorId: ${req.params.colorId}` });
    }
})

miscRouter.post("/mainBannerCreation", async (req: Request, res: Response) => {
    try {
        let banner: Banner = req.body;
        if (banner.Banner_Type == Banner_Type.Main) {
            if (banner.images)
                banner.images = new ObjectID(banner.images)
            console.log(banner.images)
            banner = await mainPageService.createNewMainB(banner);
        }
        res.status(200).json({ banner });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.post("/smallBanner2Creation", async (req: Request, res: Response) => {
    try {
        let banner: Banner = req.body;
        if (banner.Banner_Type == Banner_Type.Small2) {
            if (banner.images)
                banner.images = new ObjectID
            console.log(banner.images)
            banner = await mainPageService.createOrReplaceSmallB2(banner);
        }
        res.status(200).json({ banner });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.post("/smallBanner1Creation", async (req: Request, res: Response) => {
    try {
        let banner: Banner = req.body;
        if (banner.Banner_Type == Banner_Type.Small1) {
            if (banner.images)
                banner.images = new ObjectID
            console.log(banner.images)
            banner = await mainPageService.createOrReplaceSmallB1(banner);
        }
        res.status(200).json({ banner });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.get("/getAllBanners", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ banners: await mainPageService.getAllBanner() });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.get("/getSmallBannersAfterAdding", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ smallBanner1: await mainPageService.getSmallBanner1Id(), smallBanner2: await mainPageService.getSmallBanner2Id() });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.get("/getMainPage", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ MainPage: await mainPageService.getMainPageIfAdded() });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

function doInDCforImageCatObjectId(m: DisplayCategory[]) {
    let k = []
    m.forEach(element => {
        let newelement: DisplayCategory = element;
        newelement.categoryId = new ObjectID(element.categoryId)
        newelement.images = new ObjectID(element.images)
        k.push(newelement)
    });
    return k
}

function doInDCforImageProObjectId(m: DisplayProducts[]) {
    let k = []
    m.forEach(element => {
        let newelement: DisplayProducts = element;
        newelement.productId = new ObjectID(element.productId)
        newelement.images = new ObjectID(element.images)
        k.push(newelement)
    });
    return k
}


miscRouter.post("/HomePageCreation", async (req: Request, res: Response) => {
    try {
        let main: MainPage = req.body;
        main.Material_Selection_1 = doInDCforImageCatObjectId(main.Material_Selection_1)
        main.Material_Selection_2 = doInDCforImageCatObjectId(main.Material_Selection_2)
        main.Shop_By_Category = doInDCforImageCatObjectId(main.Shop_By_Category)
        main.Featured_Products = doInDCforImageProObjectId(main.Featured_Products)
        let MainPage = await mainPageService.mainPageCreation(main);
        res.status(200).json({ MainPage });
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.get("/getAllMainBannerIds", async (req: Request, res: Response) => {
    try {
        res.status(200).json(await mainPageService.getAllMainBannerIds());
    } catch (e: any) {
        LOG.error(e)
        res.status(500).json({ error: e.message });
    }
})

miscRouter.post('/createColor', async (req: Request, res: Response) => {
    try {
        let color: IColor = req.body;
        color = await ColorService.create(color);
        res.status(200).json({ color });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});
miscRouter.post("/updateColor", async (req: Request, res: Response) => {
    try {
        let { color } = req.body;
        if (await ColorService.update(color)) {
            res.status(200).json({})
        } else res.status(304).send(`IColor with colorId: ${color._id} not updated`);
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});
miscRouter.delete("/deleteColor/:colorId", async (req: Request, res: Response) => {
    const colorId = req?.params?.colorId;
    try {
        await ColorService.delete(colorId)
        res.status(200).json({})
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});

miscRouter.get('/getAllUnits', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ units: (await UnitService.getAll()) });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

miscRouter.post('/createUnit', async (req: Request, res: Response) => {
    try {
        let unit: IUnit = req.body;
        unit = await UnitService.create(unit);
        res.status(200).json({ unit });
    } catch (error: any) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});
miscRouter.get('/getUnit/:unitId', async (req: Request, res: Response) => {
    const unitId = req?.params?.unitId;
    try {
        res.status(200).json({
            unitId: await UnitService.get(unitId),
        });
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: `Unable to find matching unit with UnitId: ${req.params.unitId}` });
    }
})
miscRouter.post("/updateUnit", async (req: Request, res: Response) => {
    try {
        let { unit } = req.body;
        if (await UnitService.update(unit)) {
            res.status(200).json({})
        } else res.status(304).send(`IUnit with unitId: ${unit._id} not updated`);
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});
miscRouter.delete("/deleteUnit/:unitId", async (req: Request, res: Response) => {
    const unitId = req?.params?.unitId;
    try {
        await UnitService.delete(unitId)
        res.status(201).json({})
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
});
miscRouter.post("/createCoupon", async (req: Request, res: Response) => {
    const coupon: ICoupon = req.body?.coupon;
    console.log(coupon)
    try {
        res.status(200).json({ createdCoupon: await couponService.createCoupon(coupon) })
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

miscRouter.put("/giveAccessOfCouponToThisMerchant", async (req: Request, res: Response) => {
    const couponName: string = req.body?.couponName;
    const merchantId: string = req.body.merchantId;
    console.log(couponName, merchantId)
    try {
        res.status(200).json({ createdCoupon: await couponService.giveAccessOfCouponToThisMerchant(couponName, merchantId) })
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

miscRouter.get("/getAllCoupons", async (req: Request, res: Response) => {
    try {
        res.status(200).json({ result: await couponService.getAllCoupons() })
    } catch (error) {
        LOG.error(error)
        res.status(500).json({ error: error.message });
    }
})

export { miscRouter }