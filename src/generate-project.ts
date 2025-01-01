import { MongoObject } from "../types/mongo-db";
import { Project } from "../types/project";
import { mongodb, projectImg, projectName } from "../utils/faker-helpers";

export async function generateProject({
  createdBy,
}: {
  createdBy: MongoObject;
}): Promise<Project> {
  return Promise.resolve({
    ...mongodb(createdBy),
    Name: projectName(),
    ProjectImage: projectImg(),
    CreatedBy: createdBy._id,
  });
}
