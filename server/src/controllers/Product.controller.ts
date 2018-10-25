import ProductModel from "../models/Product.model";
import * as express from "express";
import { commonDBqueryHandler } from "./_helpers";

class ProductController {
  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public get(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const { filter, sort, skip, limit } = req.query;
    const findQuery =
      filter && filter.length
        ? {
            $or: [
              {
                name: {
                  $regex: isNaN(filter) ? filter.toLowerCase() : filter,
                  $options: "i"
                }
              },
              {
                category: {
                  $regex: isNaN(filter) ? filter.toLowerCase() : filter,
                  $options: "i"
                }
              },
              ...(parseInt(filter)
                ? [
                    {
                      $where: ` function() { return this.price.toString().contains(${filter});}`
                    }
                  ]
                : [])
            ]
          }
        : {};
    const query = ProductModel.find(findQuery)
      .sort(sort || "")
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 0);
    commonDBqueryHandler(req, res, next, query);
  }

  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const { body } = req;
    const query = ProductModel.create(body);
    commonDBqueryHandler(req, res, next, query);
  }

  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public count(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const query = ProductModel.count({});
    commonDBqueryHandler(req, res, next, query);
  }

  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const { body } = req;
    const { id } = req.params;
    const query = ProductModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    commonDBqueryHandler(req, res, next, query);
  }
  /**
   * @param  {express.Request} req
   * @param  {express.Response} res
   * @param  {express.NextFunction} next
   */
  public delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const { id } = req.params;
    const query = ProductModel.findByIdAndRemove(id);
    commonDBqueryHandler(req, res, next, query);
  }
}

export default new ProductController();
