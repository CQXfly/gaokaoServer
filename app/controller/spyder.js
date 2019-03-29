"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class SpyderController extends egg_1.Controller {
    async index() {
        const { ctx } = this;
        const r = await ctx.model.User.findAll({ where: { password: 123 } });
        if (r[0]) {
            ctx.logger.debug(r[0]);
        }
        else {
            ctx.model.User.create({ name: `er${Date.now().toString()}`, notify_count: 3, status: 1, password: '123' });
        }
        // tslint:disable-next-line:no-string-literal
        if (ctx.request.query['type'] === 'major') {
            ctx.service.spyder.spyderMajorScore();
            ctx.body = await ctx.service.spyder.findMajor();
            // tslint:disable-next-line:no-string-literal
        }
        else if (ctx.request.query['type'] === 'area') {
            ctx.body = await ctx.service.spyder.spyderAreaScore();
            // tslint:disable-next-line:no-string-literal
        }
        else if (ctx.request.query['type'] === 'schoolScore') {
            ctx.body = await ctx.service.spyder.spyderSchoolScore();
            // tslint:disable-next-line:no-string-literal
        }
        else if (ctx.request.query['type'] === 'school') {
            ctx.body = await ctx.service.spyder.spyderSchool();
        }
    }
}
exports.default = SpyderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5ZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3B5ZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWlDO0FBRWpDLE1BQXFCLGdCQUFpQixTQUFRLGdCQUFVO0lBQy9DLEtBQUssQ0FBQyxLQUFLO1FBRWhCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1RztRQUNELDZDQUE2QztRQUM3QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE9BQU8sRUFBRTtZQUN6QyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoRCw2Q0FBNkM7U0FDOUM7YUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtZQUMvQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdEQsNkNBQTZDO1NBQzlDO2FBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxhQUFhLEVBQUU7WUFDdEQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDeEQsNkNBQTZDO1NBQzlDO2FBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDakQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztDQUNGO0FBekJELG1DQXlCQyJ9