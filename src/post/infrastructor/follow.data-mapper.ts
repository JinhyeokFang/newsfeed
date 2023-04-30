import { RowDataPacket } from 'mysql2';

export default interface PostData extends RowDataPacket {
  id: number;
  authorUserId: string;
  title: string;
  content: string;
}
