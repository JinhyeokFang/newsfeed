import { RowDataPacket } from 'mysql2';

export default interface PostLikeData extends RowDataPacket {
  postId: number;
  userId: string;
}
