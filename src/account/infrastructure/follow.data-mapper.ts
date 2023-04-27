import { RowDataPacket } from 'mysql2';

export default interface FollowData extends RowDataPacket {
  userId: string;
  followingUserId: string;
}
