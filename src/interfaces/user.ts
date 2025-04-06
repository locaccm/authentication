interface IUser {
  USEN_ID?: number;
  USEC_URLPP?: string;
  USEC_LNAME?: string;
  USEC_FNAME?: string;
  USEC_TYPE?: string;
  USEC_BIO?: string;
  USED_BIRTH?: Date;
  USEC_TEL?: string;
  USEC_ADDRESS?: string;
  USEC_MAIL: string;
  USEC_PASSWORD?: string;
  USEN_INVITE?: number;

  invitedBy?: undefined;
  invites?: IUser[];
}


export default IUser;
