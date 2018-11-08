import { Model, SequelizeStatic, Sequelize } from 'sequelize';
import { SchoolScore } from './SchoolScore';
import { MajorScore } from './majorScore'
import { User } from './user';
declare module 'egg' {
  interface Application {
    Sequelize: SequelizeStatic
    model: Sequelize
  }

  interface Context {
    model: {
      SchoolScore: Model<SchoolScore, {}>,
      MajorScore: Model<MajorScore, {}>,
      User: Model<User, {}>,
    }
  }
}

declare module 'sequelize' {
  interface Model<TInstance, TAttributes> {
    fillable(): string[];
    hidden(): string[];
    visible(): string[];
    getAttributes(): string[];
    findAttribute(attribute: string): object | undefined;

    getDataValue(key: string): any;

    setDataValue(key: string, value: any): void;
  }
}