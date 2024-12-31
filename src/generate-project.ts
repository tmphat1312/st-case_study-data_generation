import { MongoId } from "../types/mongo-db";
import { Project } from "../types/project";
import { mongodb, projectImg, projectName } from "../utils/faker-helpers";

export async function generateProject({
  createdBy,
}: {
  createdBy: MongoId;
}): Promise<Project> {
  return Promise.resolve({
    ...mongodb(),
    Name: projectName(),
    ProjectImage: projectImg(),
    CreatedBy: createdBy,
  });
}
