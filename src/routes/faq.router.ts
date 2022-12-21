import express, { Request, Response, Router } from "express";
import { IFAQ } from "../interfaces";
import {FaqService } from "../services/faq.service";
import { LOG } from "../logger";
import { uploadImages } from "../multer";
import { DocumentService } from "../services/document.service";
import { AppConfig } from "../config";
import path from "path";
import { rename } from "fs";
const faqRouter: Router = express.Router();
faqRouter.use(express.json());



export { faqRouter }; 