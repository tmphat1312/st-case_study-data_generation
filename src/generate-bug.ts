import { Issue } from "../types/issue";
import { MongoId } from "../types/mongo-db";
import {
  description,
  issueEnvironment,
  issuePriority,
  issueSeverity,
  issueStatus,
  issueTitle,
  issueType,
  mongodb,
  stepsToReproduce,
} from "../utils/faker-helpers";

export function generateBug({
  projectId,
  createdBy,
  assignedTo,
}: {
  projectId: MongoId;
  createdBy: MongoId;
  assignedTo?: MongoId;
}): Promise<Issue> {
  return Promise.resolve({
    ...mongodb(),
    Title: issueTitle(),
    Category: "Bug",
    Status: issueStatus(),
    Priority: issuePriority(),
    StartDate: new Date(),
    EndDate: new Date(),
    IssueType: issueType(),
    Severity: issueSeverity(),
    Environment: issueEnvironment(),
    Description: description(),
    AssignedTo: assignedTo,
    StepsToReproduce: stepsToReproduce(),
    ProjectID: projectId,
    CreatedBy: createdBy,
  });
}
