"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const moment = require("moment");
function BaseModel(app, table, attributes, options = {}) {
    const { Op, UUID, UUIDV4 } = app.Sequelize;
    const modelSchema = app.model.define(table, Object.assign({ id: {
            type: UUID,
            unique: true,
            primaryKey: true,
            allowNull: false,
            defaultValue: UUIDV4,
        } }, attributes, getDefaultAttributes(options, app.Sequelize)), Object.assign({ timestamps: true, underscored: true, 
        // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
        // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        freezeTableName: false }, options, { scopes: {
            // 定义全局作用域，使用方法如: .scope('onlyTrashed') or .scope('onlyTrashed1', 'onlyTrashed12') [ 多个作用域 ]
            onlyTrashed: {
                // 只查询软删除数据
                where: {
                    deleted_at: {
                        [Op.not]: null,
                    },
                },
            },
        } }));
    modelSchema.getAttributes = () => {
        return Object.keys(attributes);
    };
    modelSchema.findAttribute = (attribute) => {
        return attributes[attribute];
    };
    modelSchema.fillable = () => {
        return [];
    };
    modelSchema.hidden = () => {
        return [];
    };
    modelSchema.visible = () => {
        return [];
    };
    return modelSchema;
}
exports.default = BaseModel;
function getDefaultAttributes(options, sequelize) {
    const { DATE } = sequelize;
    const defaultAttributes = {
        created_at: {
            type: DATE,
            get() {
                return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        updated_at: {
            type: DATE,
            get() {
                return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    };
    // 需要从 options 读取的配置信息，用于下方做过滤的条件
    const attributes = ['createdAt', 'updatedAt', 'deletedAt'];
    Object.keys(options).forEach((value) => {
        if (attributes.includes(value) && options[value] === false) {
            delete defaultAttributes[lodash_1.snakeCase(value)];
        }
    });
    return defaultAttributes || {};
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFtQztBQUNuQyxpQ0FBaUM7QUFFakMsU0FBd0IsU0FBUyxDQUMvQixHQUFnQixFQUNoQixLQUFhLEVBQ2IsVUFBNEIsRUFDNUIsVUFBa0IsRUFBRTtJQUVwQixNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTNDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssa0JBQ3hDLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUUsSUFBSTtZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsTUFBTTtTQUNyQixJQUNFLFVBQVUsRUFDVixvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFFN0MsVUFBVSxFQUFFLElBQUksRUFDaEIsV0FBVyxFQUFFLElBQUk7UUFDakIseURBQXlEO1FBQ3pELGdDQUFnQztRQUNoQyxlQUFlLEVBQUUsS0FBSyxJQUNuQixPQUFPLElBQ1YsTUFBTSxFQUFFO1lBQ04sNEZBQTRGO1lBQzVGLFdBQVcsRUFBRTtnQkFDWCxXQUFXO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxVQUFVLEVBQUU7d0JBQ1YsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSTtxQkFDZjtpQkFDRjthQUNGO1NBQ0YsSUFDRCxDQUFDO0lBRUwsV0FBVyxDQUFDLGFBQWEsR0FBRyxHQUFhLEVBQUU7UUFDekMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztJQUVGLFdBQVcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxTQUFpQixFQUFzQixFQUFFO1FBQ3BFLE9BQVEsVUFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUM7SUFFRixXQUFXLENBQUMsUUFBUSxHQUFHLEdBQWEsRUFBRTtRQUNwQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQztJQUVGLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBYSxFQUFFO1FBQ2xDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFDO0lBRUYsV0FBVyxDQUFDLE9BQU8sR0FBRyxHQUFhLEVBQUU7UUFDbkMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUM7SUFFRixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBM0RELDRCQTJEQztBQUVELFNBQVMsb0JBQW9CLENBQUMsT0FBZSxFQUFFLFNBQTBCO0lBQ3ZFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFFM0IsTUFBTSxpQkFBaUIsR0FBRztRQUN4QixVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUc7Z0JBQ0QsT0FBTyxNQUFNLENBQUUsSUFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7U0FDRjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRztnQkFDRCxPQUFPLE1BQU0sQ0FBRSxJQUFZLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDeEYsQ0FBQztTQUNGO0tBQ0YsQ0FBQztJQUVGLGlDQUFpQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUM3QyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUssT0FBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNuRSxPQUFRLGlCQUF5QixDQUFDLGtCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxpQkFBaUIsSUFBSSxFQUFFLENBQUM7QUFDakMsQ0FBQyJ9