import { Module } from "../types/module";
import { MongoObject } from "../types/mongo-db";
import { moduleName, moduleOrder, mongodb } from "../utils/faker-helpers";

export function generateModule({
  parentModule,
  ofProject,
}: {
  parentModule?: MongoObject;
  ofProject: MongoObject;
}): Promise<Module> {
  return Promise.resolve({
    ...mongodb(parentModule || ofProject),
    Name: moduleName(),
    Order: moduleOrder(),
    ParentID: parentModule?._id,
    ProjectID: ofProject._id,
  });
}
