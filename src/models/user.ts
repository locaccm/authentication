import { User as UserDb } from "@prisma/client";

class User {
  constructor(
    private readonly USEC_MAIL: string,
    private USEC_PASSWORD?: string,
    private USEC_FNAME?: string,
    private USEC_LNAME?: string,
    private USED_BIRTH?: Date,
    private USEC_TYPE?: string,
    private USEN_ID?: number,
  ) {
    this.USEC_TYPE = USEC_TYPE || "OWNER";
  }

  public hasAllAttributesForRegister(): boolean {
    return (
      !!this.USEC_LNAME &&
      !!this.USEC_FNAME &&
      !!this.USEC_MAIL &&
      !!this.USEC_PASSWORD &&
      !!this.USED_BIRTH &&
      !!this.USEC_TYPE
    );
  }

  public hasAllAttributesForConnection() {
    return this.USEC_MAIL && this.USEC_PASSWORD;
  }

  public mapDbUserToModel(userDb: UserDb) {
    this.USEC_LNAME = userDb.USEC_LNAME ?? undefined;
    this.USEC_FNAME = userDb.USEC_FNAME ?? undefined;
    this.USEC_PASSWORD = userDb.USEC_PASSWORD ?? undefined;
    this.USEC_TYPE = userDb.USEC_TYPE ?? undefined;
    this.USEN_ID = userDb.USEN_ID ?? undefined;
    this.USED_BIRTH = userDb.USED_BIRTH ?? undefined;

    return this;
  }

  public setStatus(status: string) {
    this.USEC_TYPE = status;
  }

  public removePassword() {
    this.USEC_PASSWORD = undefined;
  }

  public getMail() {
    return this.USEC_MAIL;
  }
  public getPassword() {
    return this.USEC_PASSWORD;
  }
  public setPassword(password: string) {
    this.USEC_PASSWORD = password;
    return this;
  }
  public getId() {
    return this.USEN_ID;
  }
  public getType() {
    return this.USEC_TYPE;
  }
}

export default User;
