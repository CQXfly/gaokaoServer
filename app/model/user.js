"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function User(app) {
    const { INTEGER, DATE, STRING, BOOLEAN } = app.Sequelize;
    const modelSchema = model_1.default(app, 'users', {
        name: {
            type: STRING(32),
            unique: true,
            allowNull: false,
            comment: '用户名',
        },
        email: {
            type: STRING(64),
            unique: true,
            allowNull: true,
            comment: '邮箱地址',
        },
        phone: {
            type: STRING(20),
            unique: true,
            allowNull: true,
            comment: '手机号码',
        },
        avatar: {
            type: STRING(150),
            allowNull: true,
            comment: '头像',
        },
        real_name: {
            type: STRING(30),
            allowNull: true,
            comment: '真实姓名',
        },
        signature: {
            type: STRING(255),
            allowNull: true,
            comment: '签名',
        },
        notify_count: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '消息通知个数',
        },
        status: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: 1,
            comment: '用户状态: 1 正常； 0 禁用',
        },
        password: {
            type: STRING(255),
            allowNull: false,
        },
        last_actived_at: DATE,
        deleted_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    }, {
        paranoid: true,
        setterMethods: {
            async password(value) {
                app.logger.debug(value);
                this.setDataValue('password', value);
                // (this as any).setDataValue('password', await app.createBcrypt(value));
            },
        },
    });
    return modelSchema;
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxtQ0FBZ0M7QUFFaEMsU0FBd0IsSUFBSSxDQUFDLEdBQWdCO0lBQzNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRXpELE1BQU0sV0FBVyxHQUFHLGVBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO1FBQzFDLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLEtBQUs7WUFDaEIsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUVELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1lBQ1osU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsTUFBTTtTQUNoQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1lBQ2YsT0FBTyxFQUFFLGtCQUFrQjtTQUM1QjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsZUFBZSxFQUFFLElBQUk7UUFDckIsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFLElBQUk7S0FDakIsRUFBRTtRQUNDLFFBQVEsRUFBRSxJQUFJO1FBRWQsYUFBYSxFQUFFO1lBQ2IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFVO2dCQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkIsSUFBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLHlFQUF5RTtZQUMzRSxDQUFDO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFDTCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBdEVELHVCQXNFQyJ9