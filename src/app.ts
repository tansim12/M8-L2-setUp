import express, { Application, Request, Response } from "express";
import globalErrorHandler from "../src/app/Error-Handle/globalErrorHandle";
import normalMiddleware from "../src/app/middleware/normalMiddleware";
import { studentRoute } from "./app/module/Student/student.route";
import { userRoute } from "./app/module/User/User.route";
import { academicSemester } from "./app/module/Semester/Semester.route";
import { academicFacultyRoute } from "./app/module/Academic Faculty/AcademicFaculty.route";
import { academicDepartmentRoute } from "./app/module/Academic Department/AcademicDepartment.route";
import { courseRoute } from "./app/module/Course/Course.route";
import { semesterRegistrationRoutes } from "./app/module/SemisterRegistration/SemisterRegistration.route";
import { FacultyRoutes } from "./app/module/Faculty/Faculty.route";
import { offeredCourseRoutes } from "./app/module/OfferedCourse/OfferedCourse.route";

const app: Application = express();
normalMiddleware(app);

app.use("/api/v1/students/", studentRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/academic-semester", academicSemester);
app.use("/api/v1/faculty", FacultyRoutes);
app.use("/api/v1/academic-faculty", academicFacultyRoute);
app.use("/api/v1/academic-department", academicDepartmentRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/semester-registrations", semesterRegistrationRoutes);
app.use("/api/v1/offered-course", offeredCourseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Level-2 setup ");
});

app.all("*", (req: Request, res: Response, next) => {
  const error = new Error(`Can't find ${req.url} on the server`);
  next(error);
});

// global error handle
app.use(globalErrorHandler);

export default app;
