"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandle_1 = __importDefault(require("../src/app/Error-Handle/globalErrorHandle"));
const normalMiddleware_1 = __importDefault(require("../src/app/middleware/normalMiddleware"));
const student_route_1 = require("./app/module/Student/student.route");
const User_route_1 = require("./app/module/User/User.route");
const Semester_route_1 = require("./app/module/Semester/Semester.route");
const AcademicFaculty_route_1 = require("./app/module/Academic Faculty/AcademicFaculty.route");
const AcademicDepartment_route_1 = require("./app/module/Academic Department/AcademicDepartment.route");
const app = (0, express_1.default)();
(0, normalMiddleware_1.default)(app);
app.use("/api/v1/students/", student_route_1.studentRoute);
app.use("/api/v1/users", User_route_1.userRoute);
app.use("/api/v1/academic-semester", Semester_route_1.academicSemester);
app.use("/api/v1/academic-faculty", AcademicFaculty_route_1.academicFacultyRoute);
app.use("/api/v1/academic-department", AcademicDepartment_route_1.academicDepartmentRoute);
app.get("/", (req, res) => {
    res.send("Level-2 setup ");
});
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find ${req.url} on the server`);
    next(error);
});
// global error handle
app.use(globalErrorHandle_1.default);
exports.default = app;
