'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   const { INTEGER, DATE, STRING } = Sequelize;
   await queryInterface.createTable('majorscores',{
    major: {
      type: STRING(32),
      unique: false,
      allowNull: false,
      comment: '专业',
    },
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
    high_score: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '最高分',
    },
    deleted_at: DATE, // 软删除时间
    created_at: DATE, // 创建时间
    updated_at: DATE, // 更新时间
    })
  },
  

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
