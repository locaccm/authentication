import IUser from "../interfaces/user";
import { User as UserDb } from "@prisma/client";


class User implements IUser {


constructor(
  public USEC_MAIL: string,
  public USEC_ADDRESS?: string,
  public USEC_BIO?: string,
  public USEC_FNAME?: string,
  public USEC_LNAME?: string,
  public USEC_PASSWORD?: string,
  public USEC_TEL?: string,
  public USEC_TYPE?: string,
  public USEC_URLPP?: string,
  public USED_BIRTH?: Date,
  public USEN_ID?: number,
  public USEN_INVITE?: number
) {}

  public hasAllAttributesForRegister(){
    return this.USEC_LNAME && this.USEC_FNAME && this.USEC_MAIL && this.USEC_PASSWORD && this.USEC_TYPE
  }

  public hasAllAttributesForConnection(){
    return this.USEC_MAIL && this.USEC_PASSWORD

  }

  public mapDbUserToModel(userDb: UserDb) {
    this.USEC_LNAME = userDb.USEC_LNAME ?? undefined;
    this.USEC_FNAME = userDb.USEC_FNAME ?? undefined;
    this.USEC_PASSWORD = userDb.USEC_PASSWORD ?? undefined;
    this.USEC_TYPE = userDb.USEC_TYPE ?? undefined;
    this.USEC_TEL = userDb.USEC_TEL ?? undefined;
    this.USEN_ID = userDb.USEN_ID ?? undefined;
    this.USED_BIRTH = userDb.USED_BIRTH ?? undefined;

    return this;
  }

  public removePassword() {
    this.USEC_PASSWORD = undefined;
  }



}


export default User;
