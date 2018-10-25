import ProductController from "../controllers/Product.controller";
import { Router } from "express";
/**
 * @class Product Router
 */
export default class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get(["/get", "/get/:page"], ProductController.get);
    this.router.get(["/count"], ProductController.count);
    this.router.post([""], ProductController.create);
    this.router.patch(["/:id"], ProductController.update);
    this.router.delete(["/:id"], ProductController.delete);
  }
}
