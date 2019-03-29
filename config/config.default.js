"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1541386859726_6924';
    // add your egg config in here
    config.middleware = [];
    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
        redis: {
            client: {
                host: '127.0.0.1',
                port: 6379,
                password: '',
                db: '0',
            },
            agent: true,
        },
        // log 配置
        logrotator: {
            maxFileSize: 2 * 1024 * 1024,
            maxDays: 31,
        },
        // egg-sequelize 配置
        sequelize: {
            dialect: 'mysql',
            database: 'gaokao-dev',
            host: '118.24.149.220',
            port: '3306',
            username: 'root',
            password: 'fox123456',
            // 禁用日志; 默认值: console.log
            // logging: false,
            // 链接数据库时的可选参数
            dialectOptions: {
                charset: 'utf8mb4',
                // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
                supportBigNumbers: true,
                // 这个选项需要bigNumberStrings与 supportBigNumbers同时启用，
                // 强制把数据库中大数(BIGINT和DECIMAL)
                // 数据类型的值转换为javascript字符对象串对象返回。(默认:false)
                bigNumberStrings: true,
            },
            // 指定在调用 sequelize.define 时使用的选项
            define: {
                underscored: true,
                charset: 'utf8mb4',
            },
            timezone: '+08:00',
        },
    };
    // the return config will combines to EggAppConfig
    return Object.assign({}, config, bizConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQWdDLENBQUM7SUFFaEQsMENBQTBDO0lBQzFDLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7SUFFbkQsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBRXZCLGtDQUFrQztJQUNsQyxNQUFNLFNBQVMsR0FBRztRQUNoQixTQUFTLEVBQUUsaURBQWlELE9BQU8sQ0FBQyxJQUFJLEVBQUU7UUFDMUUsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFO2dCQUNOLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsSUFBSTtnQkFDVixRQUFRLEVBQUUsRUFBRTtnQkFDWixFQUFFLEVBQUUsR0FBRzthQUNSO1lBQ0QsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNELFNBQVM7UUFDVCxVQUFVLEVBQUU7WUFDVixXQUFXLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJO1lBQzVCLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxtQkFBbUI7UUFDbkIsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLHlCQUF5QjtZQUN6QixrQkFBa0I7WUFDbEIsY0FBYztZQUNkLGNBQWMsRUFBRTtnQkFDZCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsMkRBQTJEO2dCQUMzRCxpQkFBaUIsRUFBRSxJQUFJO2dCQUN2QixpREFBaUQ7Z0JBQ2pELDRCQUE0QjtnQkFDNUIsMENBQTBDO2dCQUMxQyxnQkFBZ0IsRUFBRSxJQUFJO2FBQ3ZCO1lBQ0QsZ0NBQWdDO1lBQ2hDLE1BQU0sRUFBRTtnQkFDTixXQUFXLEVBQUUsSUFBSTtnQkFDakIsT0FBTyxFQUFFLFNBQVM7YUFDbkI7WUFDRCxRQUFRLEVBQUUsUUFBUTtTQUNuQjtLQUNGLENBQUM7SUFFRixrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUNOLFNBQVMsRUFDWjtBQUNKLENBQUMsQ0FBQyJ9