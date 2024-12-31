import { config } from "../config";
import { MongoId } from "../types/mongo-db";
import { Testcase } from "../types/testcase";
import {
  description,
  mongodb,
  precondition,
  testcasePriority,
  testcaseTitle,
} from "../utils/faker-helpers";

export function generateTestcase({
  moduleId,
  projectId,
}: {
  moduleId: MongoId;
  projectId: MongoId;
}): Promise<Testcase> {
  return Promise.resolve({
    ...mongodb(),
    Title: testcaseTitle(),
    Priority: testcasePriority(),
    Precondition: precondition(),
    Description: description(),
    ModuleID: moduleId,
    ProjectID: projectId,
  });
}
