import axios from "axios";
import { Request, Response, NextFunction } from "express";

async function Token(req: Request, res: Response, next: NextFunction) {
  try {
    const result: any = await axios({
      method: "POST",
      url: `https://perks.optum.com/api/oauth/token`,
    });

    const account: any = await axios({
      method: "post",
      url: "https://api.perks.optum.com/api/optumperks/v1/account",
      headers: {
        Authorization: `Bearer ${result.data.access_token}`,
        "x-app-id": "Optum Perks",
        "x-correlation-id": "3efb3d7c-16fb-4005-aaa5-85134a2a92c0",
      },
    });

    req.body.headers = {
      Authorization: `Bearer ${result.data.access_token}`,
      "x-account-id": account.data.id,
      "x-app-id": "Optum Perks",
      "x-correlation-id": "d025e17a-8ca5-4a76-a8f6-ea111096ad5a",
    };
    next();
  } catch (e) {
    next(e.message);
  }
}

export default Token;
