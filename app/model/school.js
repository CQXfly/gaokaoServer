"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function School(app) {
    const { INTEGER, STRING, DATE, TEXT } = app.Sequelize;
    // 学校录取分数线
    const modelSchema = model_1.default(app, 'schools', {
        school: {
            type: STRING(32),
            unique: true,
            allowNull: false,
            comment: '学校',
        },
        school_icon: {
            type: TEXT,
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
            type: STRING(8),
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
        deleted_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    }, {
        paranoid: true,
        setterMethods: {},
    });
    return modelSchema;
}
exports.default = School;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nob29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nob29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQWdDO0FBRWhDLFNBQXdCLE1BQU0sQ0FBQyxHQUFnQjtJQUM3QyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxVQUFVO0lBQ1YsTUFBTSxXQUFXLEdBQUcsZUFBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDNUMsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsTUFBTSxFQUFFLElBQUk7WUFDWixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxjQUFjLEVBQUU7WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELGtCQUFrQixFQUFFO1lBQ2xCLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxTQUFTO1NBQ25CO1FBQ0QsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFBRTtRQUNDLFFBQVEsRUFBRSxJQUFJO1FBRWQsYUFBYSxFQUFFLEVBQ2Q7S0FDRixDQUFDLENBQUM7SUFDTCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBdEZELHlCQXNGQyJ9