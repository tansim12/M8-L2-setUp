// Define a type for months
export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
export type TName = "Autumn" | "Summer" | "Fall";
export type TCode = "01" | "02" | "03";

// Define an interface for semesters
export interface TSemester {
  name: TName;
  code: TCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
}
