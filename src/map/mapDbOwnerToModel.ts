import User from "../models/user";
import { owner } from "@prisma/client";

export const mapDbOwnerToModel = (dbOwner: null | owner): User | null => {
  if (!dbOwner) {
    return dbOwner;
  }


  const user: User = {
    id: dbOwner.OWNN_ID,
    lname: dbOwner.OWNC_LNAME,
    fname: dbOwner.OWNC_FNAME,
    tel: dbOwner.OWNN_TEL,
    email: dbOwner.OWNC_MAIL,
    password: dbOwner.OWNC_MDP ?? "",
    status: "owner",
  };
  return user;
};
