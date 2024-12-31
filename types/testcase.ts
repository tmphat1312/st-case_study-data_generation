import { config } from "../config";
import { MongoId, MongoObject } from "./mongo-db";

type Priority = (typeof config.testcase.priority)[number];

export type Testcase = MongoObject & {
  Title: string;
  Priority: Priority;
  Precondition: string;
  Description: string;
  ModuleID: MongoId;
  ProjectID: MongoId;
};
