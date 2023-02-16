import { hash, compare } from 'bcrypt';

export class Account {
  private constructor(
    public readonly email: string,
    private readonly hashedPassword: string,
  ) {}

  async comparePassword(plainPassword: string): Promise<boolean> {
    return await compare(plainPassword, this.hashedPassword);
  }

  static async create(email: string, password: string) {
    const hashedPassword = await Account.createHashedPassword(password);
    return new Account(email, hashedPassword);
  }

  private static async createHashedPassword(password: string) {
    return await hash(password, 10);
  }
}
