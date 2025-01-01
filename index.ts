import { generateBug } from "./src/generate-bug";
import { generateModule } from "./src/generate-module";
import { generateProject } from "./src/generate-project";
import { generateTestcase } from "./src/generate-testcase";
import { generateUser } from "./src/generate-user";

(async function index() {
  const person1 = await generateUser();
  const project1 = await generateProject({ createdBy: person1 });
  const module1 = await generateModule({
    ofProject: project1,
  });
  const module2 = await generateModule({
    ofProject: project1,
    parentModule: module1,
  });
  const testcase1 = await generateTestcase({
    ofModule: module1,
    ofProject: project1,
  });
  const bug1 = await generateBug({
    ofProject: project1,
    createdBy: person1,
  });
  console.log("user: ", person1);
  console.log("project: ", project1);
  console.log("module: ", module1);
  console.log("module: ", module2);
  console.log("testcase: ", testcase1);
  console.log("bug: ", bug1);
})();
