import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";
import { default as Sentencer } from "sentencer";
import { config } from "../config";
import { MongoObject } from "../types/mongo-db";
import { makeFirstLetterCapital, toTitleCase } from "./string-helpers";

Sentencer.configure({
  actions: {
    project_name: () =>
      toTitleCase(`${faker.food.adjective()} ${faker.food.ingredient()}`),
    module_name: () => toTitleCase(faker.food.dish()),
    testcase_title: () => `${faker.word.verb()} ${faker.word.noun()}`,
    testcase_expectation: () =>
      faker.helpers.arrayElement(["successfully", "failed to"]),
    testcase_verb: () => faker.hacker.verb(),
    precondition_prefix: () => faker.helpers.arrayElement(["Given", "When"]),
    precondition_body: () => faker.food.description().toLowerCase(),
  },
});

// === Shared
export const dateRange = ({ from, to }: { from?: Date; to?: Date }) => {
  return faker.date.betweens({
    from: from || faker.date.past({ years: 10 }),
    to: to || faker.date.soon({ days: faker.number.int({ min: 5, max: 25 }) }),
    count: 2,
  }) as [Date, Date];
};

export const mongodb = (createdAfter?: MongoObject) => {
  const createdDate = createdAfter
    ? faker.date.between({
        from: createdAfter.CreatedAt,
        to: new Date(),
      })
    : faker.date.past({ years: 10 });

  return {
    _id: new ObjectId().toHexString(),
    CreatedAt: createdDate,
    UpdatedAt: createdDate,
  };
};

export const description = () => makeFirstLetterCapital(faker.hacker.phrase());

// === User
export const auth = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    Name: `${firstName} ${lastName}`,
    Email: faker.internet.email({ firstName, lastName }).toLocaleLowerCase(),
    Password: faker.internet.password(),
    LastLogin: faker.date.recent(),
    IsAdmin: faker.datatype.boolean({
      probability: config.user.isAdminProbability,
    }),
    IsVerified: faker.datatype.boolean({
      probability: config.user.isVerifiedProbability,
    }),
  };
};

export const birthYear = () =>
  faker.number.int({
    min: config.user.minBirthYear,
    max: config.user.maxBirthYear,
  });
export const phone = () => faker.phone.number({ style: "international" });
export const userImg = faker.image.avatar;
export const gender = () => faker.helpers.arrayElement(config.user.gender);
export const language = () => faker.helpers.arrayElement(config.user.language);
export const designation = () =>
  faker.helpers.arrayElement(config.user.designation);
export const status = () => faker.helpers.arrayElement(config.user.status);
export const domain = () => faker.internet.domainName();

// === Project
export const projectImg = faker.image.url;
export const projectName = () => Sentencer.make("Project {{ project_name }}");

// === Testcase
export const testcaseTitle = () =>
  Sentencer.make(
    `Verify {{ testcase_title }} that {{ testcase_expectation}} {{ testcase_verb }} {{ noun }}`
  );
export const testcasePriority = () =>
  faker.helpers.arrayElement(config.testcase.priority);
export const precondition = () =>
  faker.datatype.boolean()
    ? Sentencer.make(`{{ precondition_prefix }} {{ precondition_body }}`)
    : undefined;

// === Module
export const moduleName = () => Sentencer.make("Module {{ module_name }}");
export const moduleOrder = () => faker.number.int({ min: 1, max: 8 });

// === Issue
export const issueTitle = () =>
  `Issue ${toTitleCase(faker.hacker.abbreviation())}`;
export const issueCategory = () =>
  faker.helpers.arrayElement(config.bug.category);
export const issueStatus = () => faker.helpers.arrayElement(config.bug.status);
export const issuePriority = () =>
  faker.helpers.arrayElement(config.bug.priority);
export const issueType = () => faker.helpers.arrayElement(config.bug.type);
export const issueSeverity = () =>
  faker.helpers.arrayElement(config.bug.severity);
export const issueEnvironment = () =>
  faker.helpers.arrayElement(config.bug.environment);
export const stepsToReproduce = () => {
  const noSteps = faker.number.int({ min: 2, max: 6 });
  return Array.from(
    { length: noSteps },
    (_, index) => `${index + 1}. ${faker.hacker.phrase()}`
  ).join("\n");
};
