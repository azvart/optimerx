import express, { Router, Request, Response, NextFunction } from "express";
import Example from "../model/example.model";
import Zip from "../model/example.zip.model";
import Token from "../middleware/accessToken";
import Price from "../model/price.model";
import axios from "axios";
import fs from "fs";
class Controllers {
  public router = Router();

  constructor() {
    this.Routes();
  }

  public Routes() {
    this.router.post("/model", this.get_name);
    this.router.get("/model", this.get_all_pharm);
    this.router.get("/zips", this.get_all_zips);
    this.router.post("/zips", this.get_current_zip);
    this.router.post("/price", Token, this.get_price);
  }
  get_name = async (req: Request, res: Response) => {
    const me: any = await Example.findByName(req.body.pharm);
    const result: any = me[0].data.variants.concat({
      id: `2810001010|${me[0].data.name}`,
      name: me[0].data.name,
      drugType: me[0].data.drugType,
      urlSlug: me[0].data.name,
    });

    return res.status(200).json({
      variants: result.reverse(),
      formulations: me[0].data.formulations,
    });
  };

  get_all_pharm = async (req: Request, res: Response) => {
    const all = await fs.readFileSync("med.json", "utf-8");

    return res.status(200).json(JSON.parse(all));
  };
  get_all_zips = async (req: Request, res: Response) => {
    const all = await Zip.findAll();
    return res.status(200).json(all);
  };

  get_current_zip = async (req: Request, res: Response) => {
    const current = await Zip.findByZip(req.body.zip);
    return res.status(200).json(current);
  };

  get_price = async (req: Request, res: Response) => {
    const search =
      req.body.location !== undefined
        ? `&searchLocation=${req.body.location}`
        : "";
    const url = `https://api.perks.optum.com/api/optumperks/v1/prices?quantity=${req.body.quantity}&formulationId=${req.body.formId}${search}`;

    const price = await Price.findPrice(
      req.body.formId,
      req.body.quantity,
      req.body.location
    );
    console.log(price);
    if (price === undefined || price === null) {
      const optumPrice = await axios({
        method: "GET",
        url: url,
        headers: req.body.headers,
      });
      const newPrice = {
        formId: req.body.formId,
        location: req.body.location,
        quantity: req.body.quantity,
        ...optumPrice.data,
      };
      console.log("New Price :", newPrice);
      const dbPrice = await new Price(newPrice).save();
      return res.status(200).json(dbPrice);
    } else {
      return res.status(200).json(price);
    }
  };
}

export default Controllers;
