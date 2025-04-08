import { Request, Response } from "express";
import {unlink} from "fs";

const logsController = {

    test: async (req: Request, res: Response) : Promise<any> => {
        return res.status(200).send({
            message: "test"
        });
    }
};

export default logsController;