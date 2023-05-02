import { RowDataPacket } from 'mysql2';

export default interface CommentData extends RowDataPacket {
  id: number;
  authorUserId: string;
  postId: number;
  comment: string;
}
