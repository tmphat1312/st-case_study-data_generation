import { Issue } from "../types/issue";
import { MongoObject } from "../types/mongo-db";
import {
  dateRange,
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
  ofProject,
  createdBy,
  assignedTo,
}: {
  ofProject: MongoObject;
  createdBy: MongoObject;
  assignedTo?: MongoObject;
}): Promise<Issue> {
  const mongoObject = mongodb(ofProject);
  const [startDate, endDate] = dateRange({ from: mongoObject.CreatedAt });

  return Promise.resolve({
    ...mongoObject,
    Title: issueTitle(),
    Category: "Bug",
    Status: issueStatus(),
    Priority: issuePriority(),
    StartDate: startDate,
    EndDate: endDate,
    IssueType: issueType(),
    Severity: issueSeverity(),
    Environment: issueEnvironment(),
    Description: description(),
    AssignedTo: assignedTo?._id,
    StepsToReproduce: stepsToReproduce(),
    ProjectID: ofProject._id,
    CreatedBy: createdBy._id,
  });
}
