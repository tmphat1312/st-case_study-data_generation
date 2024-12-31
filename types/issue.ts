import { config } from "../config";
import { MongoId, MongoObject } from "./mongo-db";

type Priority = (typeof config.bug.priority)[number];
type Category = (typeof config.bug.category)[number];
type Status = (typeof config.bug.status)[number];
type IssueType = (typeof config.bug.type)[number];
type Severity = (typeof config.bug.severity)[number];
type Environment = (typeof config.bug.environment)[number];

export type Issue = MongoObject & {
  Title: string;
  Category: Category;
  Status: Status;
  Priority: Priority;
  StartDate: Date;
  EndDate: Date;
  IssueType: IssueType;
  Severity: Severity;
  Environment: Environment;
  Description: string;
  AssignedTo?: MongoId;
  StepsToReproduce: string;
  ProjectID: MongoId;
  CreatedBy: MongoId;
};
