import { generateModule } from "./src/generate-module";
import { generateProject } from "./src/generate-project";
import { generateUser } from "./src/generate-user";
import { generateTestcase } from "./src/generate-testcase";
import { generateBug } from "./src/generate-bug";

// TODO: handle dates (before, after)

(async function index() {
  const person1 = await generateUser();
  const project1 = await generateProject({ createdBy: person1._id });
  const module1 = await generateModule({
    projectId: project1._id,
  });
  const module2 = await generateModule({
    projectId: project1._id,
    parentId: module1._id,
  });
  const testcase1 = await generateTestcase({
    moduleId: module1._id,
    projectId: project1._id,
  });
  const bug1 = await generateBug({
    projectId: project1._id,
    createdBy: person1._id,
  });

  console.log(person1);
  console.log(project1);
  console.log(module1);
  console.log(module2);
  console.log(testcase1);
  console.log(bug1);
})();
