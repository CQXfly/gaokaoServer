import { Application } from 'egg';
import BaseModel from '../model';

export default function SchoolScore(app: Application) {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  // 学校录取分数线
  const modelSchema = BaseModel(app, 'schoolscores', {
    school: {
      type: STRING(32),
      unique: false,
      allowNull: false,
      comment: '学校',
    },
    arts_li_ke: {
      type: STRING(8),
      unique: false,
      allowNull: false,
      comment: '文科还是理科',
    },
    av_score: {
      type: INTEGER(8),
      unique: false,
      allowNull: false,
      comment: '平均分',
    },
    enroll_lot: {
      type: STRING(8),
      unique: false,
      allowNull: true,
      comment: '录取批次',
    },
    enroll_area: {
      type: STRING(16),
      unique: false,
      allowNull: false,
      comment: '招生地',
    },
    enroll_age: {
      type: STRING(16),
      unique: false,
      allowNull: false,
      comment: '年份',
    },
    low_score: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '最低分',
    },
    high_score: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '最高分',
    },
    enroll_number: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '录取人数',
    },
    deleted_at: DATE, // 软删除时间
    created_at: DATE, // 创建时间
    updated_at: DATE, // 更新时间
  }, {
      paranoid: true,

      setterMethods: {
      },
    });
  return modelSchema;
}
