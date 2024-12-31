import { User } from "../types/user";
import {
  auth,
  birthYear,
  designation,
  domain,
  gender,
  language,
  mongodb,
  phone,
  status,
  userImg,
} from "../utils/faker-helpers";

export async function generateUser(): Promise<User> {
  return Promise.resolve({
    ...mongodb(),
    ...auth(),
    Gender: gender(),
    BirthYear: birthYear(),
    Phone: phone(),
    UserImg: userImg(),
    Language: language(),
    Designation: designation(),
    Status: status(),
    Domain: domain(),
  });
}
