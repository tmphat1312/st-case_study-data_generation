import { Module } from "../types/module";
import { MongoId } from "../types/mongo-db";
import { moduleName, moduleOrder, mongodb } from "../utils/faker-helpers";

export function generateModule({
  parentId,
  projectId,
}: {
  parentId?: MongoId;
  projectId: MongoId;
}): Promise<Module> {
  return Promise.resolve({
    ...mongodb(),
    Name: moduleName(),
    Order: moduleOrder(),
    ParentID: parentId,
    ProjectID: projectId,
  });
}
