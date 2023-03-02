import { injectable } from 'inversify';
import { Connection } from '../../common/database/database';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';
import AccountData from './account.data-mapper';

@injectable()
export class AccountMysqlRepository implements AccountRepository {
  async save(account: Account): Promise<void> {
    const sql = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?) ON DUPLICATE KEY UPDATE hashedPassword = ?`;
    const values = [
      account.email,
      account.hashedPassword,
      account.hashedPassword,
    ];
    await Connection.execute(sql, values);
  }

  async findOneByEmail(email: string): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE email = '${email}' LIMIT 1`;
    const result = await Connection.query(sql);
    const accountDatas: AccountData[] = result[0] as AccountData[];
    if (accountDatas === undefined || accountDatas.length === 0) {
      console.dir(result);
      return null;
    }

    const accountData = accountDatas[0];
    return new Account(accountData.email, accountData.hashedPassword);
  }
}
