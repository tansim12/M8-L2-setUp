import { RequestHandler } from "express";
import { errorResponse, successResponse } from "../../Re-useable/CustomResponse";
import { semesterService } from "./Semester.service";



const createSemester:RequestHandler = async(req, res)=>{
try {
    const semesterBody = req.body
    const result = await semesterService.createSemesterDB(semesterBody)
    res.status(200).send(successResponse(result, "Semester Create Successfully done"))
} catch (error) {
    res.status(500).send(errorResponse(error))
}




}

export const semesterController = {
    createSemester
}