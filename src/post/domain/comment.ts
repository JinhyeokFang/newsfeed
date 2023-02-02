import { UserId } from './user-id';

export class Comment {
  constructor(readonly userId: UserId, readonly content: string) {}
}
