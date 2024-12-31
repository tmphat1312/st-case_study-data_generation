import { MongoId, MongoObject } from "./mongo-db";

export type Project = MongoObject & {
  Name: string;
  ProjectImage: string;
  CreatedBy: MongoId;
};
