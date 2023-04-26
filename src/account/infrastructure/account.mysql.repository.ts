import { inject, injectable } from 'inversify';
import { DataSource } from '../../common/database/database';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';
import { UserId } from '../domain/user-id';
import AccountData from './account.data-mapper';

@injectable()
export class AccountMysqlRepository implements AccountRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async save(account: Account): Promise<void> {
    const sql = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?) ON DUPLICATE KEY UPDATE hashedPassword = ?`;
    const values = [
      account.email,
      account.hashedPassword,
      account.hashedPassword,
    ];
    await this.dataSource.createPool().execute(sql, values);
  }

  async findOneByEmail(email: string): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE email = '${email}' LIMIT 1`;
    const result = await this.dataSource.createPool().query(sql);
    const accountDatas: AccountData[] = result[0] as AccountData[];
    if (accountDatas === undefined || accountDatas.length === 0) {
      console.dir(result);
      return null;
    }

    const accountData = accountDatas[0];
    return Account.create({
      email: accountData.email,
      hashedPassword: accountData.hashedPassword,
      name: 'name',
    });
  }

  async findOneById(id: UserId): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE id = '${id}' LIMIT 1`;
    const result = await this.dataSource.createPool().query(sql);
    const accountDatas: AccountData[] = result[0] as AccountData[];
    if (accountDatas === undefined || accountDatas.length === 0) {
      console.dir(result);
      return null;
    }

    const accountData = accountDatas[0];
    return Account.create({
      email: accountData.email,
      hashedPassword: accountData.hashedPassword,
      name: 'name',
    });
  }

  async removeById(id: UserId): Promise<void> {
    const sql = `DELETE FROM accounts WHERE id = '${id}'`;
    await this.dataSource.createPool().query(sql);
  }
}
