// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import SchoolScore from '../../../app/model/SchoolScore';
import AreaScore from '../../../app/model/areaScore';
import MajorScore from '../../../app/model/majorScore';
import Model from '../../../app/model/model';
import School from '../../../app/model/school';
import SchoolScore from '../../../app/model/schoolScore';
import User from '../../../app/model/user';

declare module 'sequelize' {
  interface Sequelize {
    SchoolScore: ReturnType<typeof SchoolScore>;
    AreaScore: ReturnType<typeof AreaScore>;
    MajorScore: ReturnType<typeof MajorScore>;
    Model: ReturnType<typeof Model>;
    School: ReturnType<typeof School>;
    User: ReturnType<typeof User>;
  }
}
