export type MongoId = string;

export type MongoObject = {
  _id: MongoId;
  CreatedAt: Date;
  UpdatedAt: Date;
};
