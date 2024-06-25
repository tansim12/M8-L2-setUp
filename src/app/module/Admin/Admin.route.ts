import express from "express";
import { AdminControllers } from "./Admin.controller";
import validationMiddleWare from "../../middleware/ZodSchemaValidationMiddleware";
import { updateAdminValidationSchemaZod } from "./Admin.zodValidation";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch(
  "/:id",
  validationMiddleWare(updateAdminValidationSchemaZod),
  AdminControllers.updateAdmin
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
