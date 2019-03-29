"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function AreaScore(app) {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    // 学校录取分数线
    const modelSchema = model_1.default(app, 'areascores', {
        arts_li_ke: {
            type: STRING(8),
            unique: false,
            allowNull: false,
            comment: '文科还是理科',
        },
        enroll_lot: {
            type: STRING(8),
            unique: false,
            allowNull: true,
            comment: '录取批次',
        },
        area: {
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
            comment: '最低分控线',
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
exports.default = AreaScore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYVNjb3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJlYVNjb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQWdDO0FBRWhDLFNBQXdCLFNBQVMsQ0FBQyxHQUFnQjtJQUVoRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ2hELFVBQVU7SUFDVixNQUFNLFdBQVcsR0FBRyxlQUFTLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRTtRQUMvQyxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNELFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLEVBQUU7UUFDQyxRQUFRLEVBQUUsSUFBSTtRQUVkLGFBQWEsRUFBRSxFQUNkO0tBQ0YsQ0FBQyxDQUFDO0lBQ0wsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQTdDRCw0QkE2Q0MifQ==