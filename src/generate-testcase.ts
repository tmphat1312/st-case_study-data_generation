import { MongoObject } from "../types/mongo-db";
import { Testcase } from "../types/testcase";
import {
  description,
  mongodb,
  precondition,
  testcasePriority,
  testcaseTitle,
} from "../utils/faker-helpers";

export function generateTestcase({
  ofModule,
  ofProject,
}: {
  ofModule: MongoObject;
  ofProject: MongoObject;
}): Promise<Testcase> {
  return Promise.resolve({
    ...mongodb(ofModule),
    Title: testcaseTitle(),
    Priority: testcasePriority(),
    Precondition: precondition(),
    Description: description(),
    ModuleID: ofModule._id,
    ProjectID: ofProject._id,
  });
}
