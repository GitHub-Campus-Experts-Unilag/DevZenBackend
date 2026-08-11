import { Router } from "express";
import { feedbackController } from "../services";
import { controlHandler } from "../../core";
import { createFeedbackSchema } from "./schema";

export const feedbackRouter = Router();


feedbackRouter.post("/", controlHandler.handle(feedbackController.createFeedback, createFeedbackSchema));