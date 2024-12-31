import { config } from "../config";
import { MongoObject } from "./mongo-db";

export type Sex = (typeof config.user.gender)[number];
export type Language = (typeof config.user.language)[number];
export type Designation = (typeof config.user.designation)[number];
export type Status = (typeof config.user.status)[number];

export type User = MongoObject & {
  Name: string;
  Gender: Sex;
  BirthYear: number;
  Phone: string;
  UserImg: string;
  LastLogin: Date;
  Language: Language;
  Designation: Designation;
  Status: Status;
  IsAdmin: boolean;
  Domain: string;
  Email: string;
  Password: string;
  IsVerified: boolean;
};
