import { faker } from "@faker-js/faker";

export const yesno = ({ probability }: { probability?: number }) =>
  faker.datatype.boolean({ probability });
