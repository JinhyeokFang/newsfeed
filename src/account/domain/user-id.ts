export class UserId {
  constructor(private readonly stringifiedId: string) {}

  toString() {
    return this.stringifiedId;
  }

  equal(anotherUserId): boolean {
    return this.stringifiedId === anotherUserId.stringifiedId;
  }
}
