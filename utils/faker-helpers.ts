import { faker } from "@faker-js/faker";
import { config } from "../config";
import { toTitleCase, makeFirstLetterCapital } from "./string-helpers";
import { ObjectId } from "bson";

// === Shared
export const mongodb = () => {
  const createdDate = faker.date.past();

  return {
    _id: new ObjectId().toHexString(),
    CreatedAt: createdDate,
    UpdatedAt: createdDate,
  };
};

export const description = () =>
  makeFirstLetterCapital(faker.word.words({ count: { min: 15, max: 25 } }));

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
export const projectName = () => `Project ${toTitleCase(faker.food.fruit())}`;

// === Testcase
export const testcaseTitle = () =>
  `Verity ${faker.word.verb()} ${faker.word.noun()}`;
export const testcasePriority = () =>
  faker.helpers.arrayElement(config.testcase.priority);
export const precondition = () =>
  makeFirstLetterCapital(faker.word.words({ count: { min: 5, max: 10 } }));

// === Module
export const moduleName = () => `Module ${toTitleCase(faker.food.vegetable())}`;
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
export const stepsToReproduce = () =>
  makeFirstLetterCapital(faker.word.words({ count: { min: 10, max: 20 } }));
