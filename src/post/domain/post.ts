export class Post {
  public title: string;
  public content: string;
  public likes: unknown[] = [];
  public comments: unknown[] = [];

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  static create(title: string, content: string) {
    return new Post(title, content);
  }
}
