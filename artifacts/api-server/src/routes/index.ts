import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import cartRouter from "./cart";
import catalogRouter from "./catalog";
import prescriptionsRouter from "./prescriptions";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(cartRouter);
router.use(catalogRouter);
router.use(prescriptionsRouter);

export default router;
