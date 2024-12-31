import { config } from "../config";
import { MongoId, MongoObject } from "./mongo-db";

export type Module = MongoObject & {
  Name: string;
  ProjectID: MongoId;
  ParentID?: MongoId;
  Order: number;
};
