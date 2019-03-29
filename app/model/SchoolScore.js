"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function SchoolScore(app) {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    // 学校录取分数线
    const modelSchema = model_1.default(app, 'schoolscores', {
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
        deleted_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    }, {
        paranoid: true,
        setterMethods: {},
    });
    return modelSchema;
}
exports.default = SchoolScore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Nob29sU2NvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTY2hvb2xTY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFnQztBQUVoQyxTQUF3QixXQUFXLENBQUMsR0FBZ0I7SUFDbEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNoRCxVQUFVO0lBQ1YsTUFBTSxXQUFXLEdBQUcsZUFBUyxDQUFDLEdBQUcsRUFBRSxjQUFjLEVBQUU7UUFDakQsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFBRTtRQUNDLFFBQVEsRUFBRSxJQUFJO1FBRWQsYUFBYSxFQUFFLEVBQ2Q7S0FDRixDQUFDLENBQUM7SUFDTCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBcEVELDhCQW9FQyJ9