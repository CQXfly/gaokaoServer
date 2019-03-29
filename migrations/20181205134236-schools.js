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
   await queryInterface.createTable('schools',{
    school: {
      type: STRING(32),
      unique: true,
      allowNull: false,
      comment: '学校',
    },
    school_icon: {
      type: STRING(32),
      unique: false,
      allowNull: false,
      comment: '学校Icon',
    },
    school_area: {
      type: STRING(8),
      unique: false,
      allowNull: false,
      comment: '学校所在地',
    },
    school_type: {
      type: STRING(8),
      unique: false,
      allowNull: true,
      comment: '高校类型',
    },
    school_special: {
      type: STRING(8),
      unique: false,
      allowNull: true,
      comment: '学校特色',
    },
    school_net: {
      type: STRING(8),
      unique: false,
      allowNull: true,
      comment: '学校网址',
    },
    school_nature: {
      type: STRING(8),
      unique: false,
      allowNull: true,
      comment: '高校性质',
    },
    school_attach: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '高校隶属',
    },
    academician_number: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '院士数',
    },
    doctor_station_num: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '博士点数量',
    },
    master_station_num: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '硕士点数量',
    },
    school_id: {
      type: INTEGER(8),
      unique: false,
      allowNull: true,
      comment: '学校id 爬虫',
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
