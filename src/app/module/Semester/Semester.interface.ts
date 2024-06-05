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

// Define an interface for semesters
export interface TSemester {
  name: "Autumn" | "Summer" | "Fall";
  code: "01" | "02" | "03";
  year: Date;
  startMonth: TMonth;
  endMonth: TMonth;
}
