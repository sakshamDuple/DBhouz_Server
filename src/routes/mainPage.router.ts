import express, { Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { MainPage, Banner, Banner_Type } from "../interfaces";
import { AppConfig } from "../config";
import { AdminService } from "../services/admin.service";
import { ObjectID } from "bson";

const mainPageRouter: Router = express.Router();
mainPageRouter.use(express.json());

mainPageRouter.post("HomePageCreation", async (req:Request, res:Response) => {
    
})