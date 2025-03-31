import { tenant } from "@prisma/client";
import User from "../models/user";

export const mapDbTenantToModel = (dbTenant: tenant | null): User | null => {
  if (!dbTenant) {
    return dbTenant;
  }

  const user: User = {
    id: dbTenant.TENN_ID,
    lname: dbTenant.TENC_LNAME,
    fname: dbTenant.TENC_FNAME,
    tel: dbTenant.TENN_TEL,
    email: dbTenant.TENC_MAIL,
    password: dbTenant.TENC_MDP ?? "",
    status: "tenant",
  };
  return user;
};
