import { inject, injectable } from 'inversify';
import { DataSource } from '../../common/database/database';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';
import { UserId } from '../domain/user-id';
import AccountData from './account.data-mapper';
import FollowData from './follow.data-mapper';

@injectable()
export class AccountMysqlRepository implements AccountRepository {
  constructor(
    @inject('DataSource')
    private readonly dataSource: DataSource,
  ) {}

  async save(account: Account): Promise<void> {
    const pool = this.dataSource.createPool();
    const createAccountSql = `INSERT IGNORE INTO accounts (email, hashedPassword, id) VALUES (?, ?, ?)`;
    await pool.execute(createAccountSql, [
      account.email,
      account.hashedPassword,
      account.id.toString(),
    ]);

    const removeFollowListSql = `DELETE FROM follow_list WHERE userId='${account.id.toString()}'`;
    await pool.execute(removeFollowListSql);

    account.following.forEach(
      async (followingUserId) =>
        await pool.execute(
          `INSERT INTO follow_list (userId, followingUserId) VALUES (?, ?)`,
          [account.id.toString(), followingUserId.toString()],
        ),
    );
  }

  async findOneByEmail(email: string): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE email = '${email}' LIMIT 1`;
    const result = await this.dataSource.createPool().query(sql);
    const accountDatas: AccountData[] = result[0] as AccountData[];
    if (accountDatas === undefined || accountDatas.length === 0) {
      return null;
    }

    const accountData = accountDatas[0];

    const account = await Account.create({
      email: accountData.email,
      hashedPassword: accountData.hashedPassword,
      name: 'name',
      id: new UserId(accountData.id),
    });
    const following = await this.getFollowingList(new UserId(accountData.id));
    following.forEach((followingUserId) => account.follow(followingUserId));

    return account;
  }

  async findOneById(id: UserId): Promise<Account> {
    const sql = `SELECT * FROM accounts WHERE id = '${id.toString()}' LIMIT 1`;
    const result = await this.dataSource.createPool().query(sql);
    const accountDatas: AccountData[] = result[0] as AccountData[];
    if (accountDatas === undefined || accountDatas.length === 0) {
      return null;
    }

    const accountData = accountDatas[0];

    const account = await Account.create({
      email: accountData.email,
      hashedPassword: accountData.hashedPassword,
      name: 'name',
      id: new UserId(accountData.id),
    });

    const following = await this.getFollowingList(id);
    following.forEach((followingUserId) => account.follow(followingUserId));

    return account;
  }

  private async getFollowingList(id: UserId): Promise<UserId[]> {
    const sql = `SELECT * FROM follow_list WHERE userId = ?`;
    const result = await this.dataSource
      .createPool()
      .query(sql, [id.toString()]);
    const followDatas: FollowData[] = result[0] as FollowData[];

    return followDatas.map(
      (followData) => new UserId(followData.followingUserId),
    );
  }

  async removeById(id: UserId): Promise<void> {
    const sql = `DELETE FROM accounts WHERE id = '${id}'`;
    await this.dataSource.createPool().query(sql);
  }
}
