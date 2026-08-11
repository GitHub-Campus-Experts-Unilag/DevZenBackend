import { Request, Response } from "express";
import { Feedbacks } from "../models";
import { Context, HttpStatus } from "../../core";


export class FeedbackController {
    createFeedback = async ({ input }: Context<any>) => {
        // let input = req.body;
        let feedback = await Feedbacks.create(input);

        return {
            code: HttpStatus.OK,
            message: "Created Feedback successfully",
            data: {
                feedback: feedback.toJSON()
            },
        };
    }

}

export const feedbackController = new FeedbackController();