"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function MajorScore(app) {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    // 学校录取分数线
    const modelSchema = model_1.default(app, 'majorscores', {
        major: {
            type: STRING(32),
            unique: false,
            allowNull: false,
            comment: '学校',
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
        deleted_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    }, {
        paranoid: true,
        setterMethods: {
            async password(value) {
                app.logger.debug(value);
                // (this as any).setDataValue('password', await app.createBcrypt(value));
            },
        },
        indexs: [
            {
                name: 'unique_index_name',
                unique: true,
                fields: ['school', 'arts_li_ke', 'enroll_lot', 'enroll_age', 'enroll_area'],
            },
        ],
    });
    return modelSchema;
}
exports.default = MajorScore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFqb3JTY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1ham9yU2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBZ0M7QUFFaEMsU0FBd0IsVUFBVSxDQUFDLEdBQWdCO0lBQ2pELE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDaEQsVUFBVTtJQUNWLE1BQU0sV0FBVyxHQUFHLGVBQVMsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFO1FBQ2hELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsUUFBUTtTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUUsSUFBSTtRQUNoQixVQUFVLEVBQUUsSUFBSTtLQUNqQixFQUFFO1FBQ0MsUUFBUSxFQUFFLElBQUk7UUFFZCxhQUFhLEVBQUU7WUFDYixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQVU7Z0JBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4Qix5RUFBeUU7WUFDM0UsQ0FBQztTQUNGO1FBRUQsTUFBTSxFQUFFO1lBQ047Z0JBQ0UsSUFBSSxFQUFFLG1CQUFtQjtnQkFDekIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQzthQUM1RTtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBQ0wsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQTFFRCw2QkEwRUMifQ==