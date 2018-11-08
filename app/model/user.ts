
import { Application } from 'egg';
import BaseModel from './model';

export default function User(app: Application) {
  const { INTEGER, DATE, STRING, BOOLEAN } = app.Sequelize;

  const modelSchema = BaseModel(app, 'user', {
    name: {
      type: STRING(32),
      unique: true,
      allowNull: false,
      comment: '用户名',
    },
    email: {
      type: STRING(64),
      unique: true,
      allowNull: true,
      comment: '邮箱地址',
    },

    phone: {
      type: STRING(20),
      unique: true,
      allowNull: true,
      comment: '手机号码',
    },
    avatar: {
      type: STRING(150),
      allowNull: true,
      comment: '头像',
    },
    real_name: {
      type: STRING(30),
      allowNull: true,
      comment: '真实姓名',
    },
    signature: {
      type: STRING(255),
      allowNull: true,
      comment: '签名',
    },
    notify_count: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '消息通知个数',
    },
    status: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: '用户状态: 1 正常； 0 禁用',
    },
    password: {
      type: STRING(255),
      allowNull: false,
    },
    last_actived_at: DATE,
    deleted_at: DATE, // 软删除时间
    created_at: DATE, // 创建时间
    updated_at: DATE, // 更新时间
  }, {
      paranoid: true,

      setterMethods: {
        async password(value: any) {
          app.logger.debug(value);
          (this as any).setDataValue('password', value)
          // (this as any).setDataValue('password', await app.createBcrypt(value));
        },
      },
    });
  return modelSchema;
}