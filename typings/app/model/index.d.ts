// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import MajorScore from '../../../app/model/majorScore';
import Model from '../../../app/model/model';
import SchoolScore from '../../../app/model/schoolScore';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    MajorScore: ReturnType<typeof MajorScore>;
    Model: ReturnType<typeof Model>;
    SchoolScore: ReturnType<typeof SchoolScore>;
    User: ReturnType<typeof User>;
  }
}
