import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

export default plugin;
