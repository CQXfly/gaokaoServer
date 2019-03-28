import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1541386859726_6924';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    redis: {
      client: {
        host: '118.24.152.108',
        port: 6379,
        password: '',
        db: '0',
      },
      agent: true,
    },
    // log 配置
    logrotator: {
      maxFileSize: 2 * 1024 * 1024, // 当文件超过 2G 时进行切割
      maxDays: 31, // 日志保留最大天数
    },
    // egg-sequelize 配置
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'gaokao-dev', // 数据库名称
      host: '118.24.149.220', // 数据库地址
      port: '3306', // 数据库端口
      username: 'root', // 用户名
      password: 'fox123456', // 密码
      // 禁用日志; 默认值: console.log
      // logging: false,
      // 链接数据库时的可选参数
      dialectOptions: {
        charset: 'utf8mb4', // 字符集
        // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
        supportBigNumbers: true,
        // 这个选项需要bigNumberStrings与 supportBigNumbers同时启用，
        // 强制把数据库中大数(BIGINT和DECIMAL)
        // 数据类型的值转换为javascript字符对象串对象返回。(默认:false)
        bigNumberStrings: true,
      },
      // 指定在调用 sequelize.define 时使用的选项
      define: {
        underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
        charset: 'utf8mb4', // 字符集
      },
      timezone: '+08:00', // 东八时区
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
