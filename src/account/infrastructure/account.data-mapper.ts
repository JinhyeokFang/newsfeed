import { RowDataPacket } from 'mysql2';

export default interface AccountData extends RowDataPacket {
  email: string;
  hashedPassword: string;
}
