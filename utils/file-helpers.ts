import write from "write";

export const saveToFile = async ({
  data,
  path,
}: {
  data: any;
  path: string;
}) => {
  await write(path, JSON.stringify(data, null, 2));
};
