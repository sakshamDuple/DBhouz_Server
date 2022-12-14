import express, { Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IAdmin, IContact, IMerchant, IUser } from "../interfaces";
import { AppConfig } from "../config";
import { MerchantService } from "../services/merchant.service";
import { AdminService } from "../services/admin.service";
import { userService } from "../services/user.service";
import nodemailer from "nodemailer"
import { ObjectID } from "bson";
import { EmailHTML } from "./emailHtml";
import { NotifictionService } from "../services/notification.service";

const authRouter: Router = express.Router();
authRouter.use(express.json());

const sendEmail = async (email: string, subject: string, text: any) => {
  try {
    console.log("email", email, "subject", subject, text)
    let HTML = EmailHTML(subject, text)
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: '587',
      auth: { user: "sdbhous@gmail.com", pass: "flfcxkpnpymbcaju" }, // todo in process.env
      secure: false,
      logger: true
    });
    await transporter.sendMail({
      from: "sdbhous@gmail.com",
      to: email,
      subject: subject,
      html: HTML,
    });
    console.log("email sent sucessfully");
    return true
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    return false
  }
};

authRouter.get("/test", (req, res, next) => {
  res.json({ hello: "world" });
});

authRouter.post(
  "/merchantsignup",
  passport.authenticate("merchantsignup", { session: false }),
  async (req: Request, res: Response, next) => {
    let user: IMerchant = (req as any).user;
    // let merchantexist = await userService.getByEmailM(user.email);
    // if (merchantexist) return res.status(403).json({ message: "Merchant With This Email Already Exist" });
    const body = { _id: user._id, email: user.email, type: "merchant" }; //firstName: user.firstName, lastName: user.lastName
    const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
    const message = `http://${process.env.BASE_URL}:${process.env.SERVER_PORT}/rest/auth/verify/${user._id}/${token}`;
    // const merchant = await MerchantService.get(user._id)
    let emailSent = await sendEmail(user.email, "Verify Email Merchant", message);
    await NotifictionService.create("New Merchant Created", "Admin", null, `Merchant With Id: ${user._id} & emailId: ${user.email} is created`)
    if (emailSent){
      return res.json({ user, token, message: "An Email sent to your account please verify" });
    }
    return res.json({ message: "Email NOt Sent" })
  }
);

authRouter.post("/merchantlogin", async (req, res, next) => {
  passport.authenticate("merchantlogin", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(info?.message ? info.message : "An error occurred.");
      }
      (req as any).login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email, type: "merchant" };
        const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
        return res.json({ user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.post(
  "/adminsignup",
  passport.authenticate("adminsignup", { session: false }),
  async (req: Request, res: Response, next) => {
    let admin: IAdmin = (req as any).user;
    const body = { _id: admin._id, email: admin.email, type: "admin" };
    const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
    return res.json({ admin, token });
  }
);

authRouter.post("/adminlogin", async (req, res, next) => {
  passport.authenticate("adminlogin", async (err, admin, info) => {
    try {
      if (err || !admin) {
        return next(info?.message ? info.message : "An error occurred.");
      }
      (req as any).login(admin, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: admin._id, email: admin.email, type: "admin" };
        const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
        return res.json({ admin, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.post(
  "/verifyMJwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (req.user && (req.user as any)._id) {
      const merchant: IMerchant = await MerchantService.get((req.user as any)._id);
      if (merchant) {
        res.status(200).json({ merchant });
      } else res.status(500).json({ error: `Failed to fetch merchant` });
    } else res.status(500).json({ error: `Failed to fetch merchant` });
  }
);

authRouter.post(
  "/verifyAJwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (req.user && (req.user as any)._id) {
      const admin: IAdmin = await AdminService.get((req.user as any)._id);
      if (admin) {
        res.status(200).json({ admin });
      } else res.status(500).json({ error: `Failed to fetch admin` });
    } else res.status(500).json({ error: `Failed to fetch admin` });
  }
);

authRouter.post(
  "/usersignup",
  passport.authenticate("usersignup", { session: false }),
  async (req: Request, res: Response, next) => {
    let user: IUser = (req as any).user;
    // let userexist = await userService.getByEmail(user.email);
    // if (userexist) return res.status(403).send({ message: "User with given email already exist!" });
    const body = { _id: user._id, email: user.email, type: "user" };
    const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
    const message = `http://${process.env.BASE_URL}:${process.env.SERVER_PORT}/rest/auth/verify/${user._id}/${token}`;
    // const usera = await userService.getSpecificUser(new ObjectID(user._id));
    let emailSent = await sendEmail(user.email, "Verify Email User", message);
    await NotifictionService.create("New User Created", "Admin", null, `User With Id: ${user._id} & emailId: ${user.email} is created`)
    if (emailSent)
      return res.json({ user, token, message: "An Email sent to your account please verify" });
    return res.json({ message: "Email NOt Sent" })
  }
);

authRouter.get("/verify/:id/:token", async (req, res) => {
  try {
    let userId: ObjectID = new ObjectID(req.params.id)
    const user = await userService.getSpecificUser(userId);
    const merchant = await MerchantService.get(req.params.id)
    const token: string = req.params.token
    let decoded: any = jwt.decode(token);
    let emailSent
    let verify = false
    if (user) {
      if (decoded.user._id == req.params.id)
        verify = await userService.verifyUser(userId);
      if (verify) {
        emailSent = await sendEmail(user.email, "user email verified", "");
        await NotifictionService.create("New User Verified", "Admin", null, `User With Id: ${user._id} & emailId: ${user.email} is now verified`)
        res.send("user email verified sucessfully");
      }
    }
    if (merchant) {
      if (decoded.user._id == req.params.id)
        verify = await MerchantService.verifyMerchant(userId);
      if (verify) {
        emailSent = await sendEmail(merchant.email, "merchant email verified", merchant?.firstName ? merchant.firstName : "Anonymous")
        await NotifictionService.create("New Merchant Verified", "Admin", null, `Merchant With Id: ${user._id} & emailId: ${user.email} is now verified`)
        res.send("merchant email verified sucessfully");
      }
    }
    if (!user) return res.status(400).send("Invalid link");
    res.send("Something Went Wrong");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

authRouter.post("/userlogin", async (req, res, next) => {
  passport.authenticate("userlogin", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(info?.message ? info.message : "An error occurred.");
      }
      (req as any).login(user, { session: false }, async (error) => {
        if (error) return next(error);
        if (user.isEmailVerified != true) return res.json({ message: "your email is not verified, kindly verify your email first" })
        const body = { _id: user._id, email: user.email, type: "user" };
        const token = jwt.sign({ user: body }, AppConfig.jwtSalt);
        return res.json({ user, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.post(
  "/verifyUJwt",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    if (req.user && (req.user as any)._id) {
      const merchant: IUser = await userService.get((req.user as any)._id);
      if (merchant) {
        res.status(200).json({ merchant });
      } else res.status(500).json({ error: `Failed to fetch user` });
    } else res.status(500).json({ error: `Failed to fetch user` });
  }
);

authRouter.post('/contactUs',
  async (req, res) => {
    let name: string = req.body.name;
    let phone: number = req.body.phone;
    let email: string = req.body.email;
    let message: string = req.body.message;
    let newContact: IContact = { _id: undefined, name, email, phone, message, createdAt: Date.now() }
    let contact = await userService.makeContact(newContact)
    res.status(200).json(contact);
  }
)

authRouter.get('/contactAll', async (req, res) => {
  try {
    let all = await userService.getAllContact()
    res.status(200).json(all)
  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})

authRouter.delete('/contactUsDel/:Id', async (req, res) => {
  try {
    const Id = req?.params?.Id;
    let resp = await userService.deleteC(Id)
    res.status(200).json(resp);
  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})

authRouter.put('/contactUsUpdate', async (req, res) => {
  try {
    const contact: IContact = req?.body?.contact;
    // let contactId:ObjectID = contact._id
    await userService.updateC(contact)
    res.status(200).json({});
  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})

export { authRouter, sendEmail };