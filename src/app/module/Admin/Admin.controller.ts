import { RequestHandler } from "express";

import { successResponse } from "../../Re-useable/CustomResponse";
import { AdminServices } from "./Admin.service";

const getSingleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);

    res
      .status(200)
      .send(successResponse(result, "Admin is retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const result = await AdminServices.getAllAdminsFromDB(req.query);
    res
      .status(200)
      .send(successResponse(result, "Admins are retrieved succesfully"));
  } catch (error) {
    next(error);
  }
};

const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await AdminServices.updateAdminIntoDB(id, admin);

    res
      .status(200)
      .send(successResponse(result, "Admin is updated succesfully"));
  } catch (error) {
    next(error);
  }
};

const deleteAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);
    res
      .status(200)
      .send(successResponse(result, "Admin is deleted succesfully"));
  } catch (error) {
    next(error);
  }
};

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
