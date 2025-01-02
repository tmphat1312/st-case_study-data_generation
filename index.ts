import { generateBug } from "./src/generate-bug";
import { generateModule } from "./src/generate-module";
import { generateProject } from "./src/generate-project";
import { generateTestcase } from "./src/generate-testcase";
import { generateUser } from "./src/generate-user";
import { yesno } from "./utils/boolean-helpers";
import { saveToFile } from "./utils/file-helpers";
import { randomIndices, randomInt } from "./utils/number-helpers";

const NUMBER_OF_USERS = 30;
const NUMBER_OF_PROJECTS = 12;
const NUMBER_OF_MODULES_PER_PROJECT = 20;
const NUMBER_OF_TESTCASES_PER_MODULE = 10;
const NUMBER_OF_BUGS_PER_MODULE = 5;

(async function index() {
  const users = await Promise.all(
    Array.from({ length: NUMBER_OF_USERS }, () => generateUser())
  );
  const usersMap = new Map(users.map((user) => [user._id, user]));

  const projects = await Promise.all(
    Array.from({ length: NUMBER_OF_PROJECTS }, () =>
      generateProject({
        createdBy: users[randomInt({ max: NUMBER_OF_USERS - 1 })]!,
      })
    )
  );
  const projectsMap = new Map(
    projects.map((project) => [project._id, project])
  );

  const modules = await Promise.all(
    projects.flatMap((project) =>
      Array.from({ length: NUMBER_OF_MODULES_PER_PROJECT }, () =>
        generateModule({
          ofProject: project,
        })
      )
    )
  );

  const modulesByProjectIdMap = new Map(
    projects.map((project) => [
      project._id,
      modules.filter((module) => module.ProjectID === project._id),
    ])
  );

  modulesByProjectIdMap.forEach((modules) => {
    const parentModule = modules[randomInt({ max: modules.length - 1 })]!;
    const childModuleIndices = randomIndices({
      max: modules.length - 1,
      length: randomInt({ max: modules.length - 1 }),
    });

    childModuleIndices.forEach((index) => {
      modules[index]!.ParentID = parentModule._id;
    });
  });

  const testcases = await Promise.all(
    modules.flatMap((module) =>
      Array.from({ length: NUMBER_OF_TESTCASES_PER_MODULE }, () =>
        generateTestcase({
          ofModule: module,
          ofProject: projectsMap.get(module.ProjectID)!,
        })
      )
    )
  );

  const bugs = await Promise.all(
    modules.flatMap((module) =>
      Array.from({ length: NUMBER_OF_BUGS_PER_MODULE }, () =>
        generateBug({
          createdBy: users[randomInt({ max: NUMBER_OF_USERS - 1 })]!,
          ofProject: projectsMap.get(module.ProjectID)!,
          assignedTo: yesno({ probability: 0.8 })
            ? users[randomInt({ max: NUMBER_OF_USERS - 1 })]!
            : undefined,
        })
      )
    )
  );

  // log lengths of generated data
  console.log("Users:", users.length);
  console.log("Projects:", projects.length);
  console.log("Modules:", modules.length);
  console.log("Testcases:", testcases.length);
  console.log("Bugs:", bugs.length);

  await Promise.all(
    [
      {
        path: "./generated/users.json",
        data: users,
      },
      {
        path: "./generated/projects.json",
        data: projects,
      },
      {
        path: "./generated/modules.json",
        data: modules,
      },
      {
        path: "./generated/testcases.json",
        data: testcases,
      },
      {
        path: "./generated/bugs.json",
        data: bugs,
      },
    ].map(saveToFile)
  );
})();
