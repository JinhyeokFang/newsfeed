export class Post {
  static create(title: string, content: string) {
    return {
      title,
      content,
      likes: [],
      comments: [],
    };
  }
}
