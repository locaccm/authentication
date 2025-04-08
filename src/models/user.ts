import { User as UserDb } from "@prisma/client";

class User {
  constructor(
    private USEC_MAIL: string,
    private USEC_PASSWORD?: string,
    private USEC_FNAME?: string,
    private USEC_LNAME?: string,
    private USED_BIRTH?: Date,
    private USEC_TYPE?: string,
    private USEN_ID?: number,
  ) {}

  public hasAllAttributesForRegister(): boolean {
    return (
      !!this.USEC_LNAME &&
      !!this.USEC_FNAME &&
      !!this.USEC_MAIL &&
      !!this.USEC_PASSWORD &&
      !!this.USED_BIRTH
    );
  }

  public hasAllAttributesForConnection() {
    return this.USEC_MAIL && this.USEC_PASSWORD;
  }

  public mapDbUserToModel(userDb: UserDb) {
    this.USEC_LNAME = userDb.USEC_LNAME ?? undefined;
    this.USEC_FNAME = userDb.USEC_FNAME ?? undefined;
    this.USEC_PASSWORD = userDb.USEC_PASSWORD ?? undefined;
    this.USEC_TYPE = userDb.USEC_TYPE ?? "owner";
    this.USEN_ID = userDb.USEN_ID ?? undefined;
    this.USED_BIRTH = userDb.USED_BIRTH ?? undefined;

    return this;
  }

  public removePassword() {
    this.USEC_PASSWORD = undefined;
  }

  public getMail() {
    return this.USEC_MAIL;
  }
  public getFname() {
    return this.USEC_FNAME;
  }
  public getLname() {
    return this.USEC_LNAME;
  }
  public getPassword() {
    return this.USEC_PASSWORD;
  }
  public getType() {
    return this.USEC_TYPE;
  }
  public getBirth() {
    return this.USED_BIRTH;
  }
  public getId() {
    return this.USEN_ID;
  }
  public setEmail(email: string) {
    this.USEC_MAIL = email;
    return this;
  }
  public setFname(fname: string) {
    this.USEC_FNAME = fname;
    return this;
  }
  public setLname(lname: string) {
    this.USEC_LNAME = lname;
    return this;
  }
  public setPassword(password: string) {
    this.USEC_PASSWORD = password;
    return this;
  }
  public setType(type: string) {
    this.USEC_TYPE = type;
    return this;
  }
  public setBirth(birth: Date) {
    this.USED_BIRTH = birth;
    return this;
  }
  public setId(id: number) {
    this.USEN_ID = id;
    return this;
  }
}

export default User;
