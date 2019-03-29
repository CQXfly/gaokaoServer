"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class SearchController extends egg_1.Controller {
    async index() {
        const { ctx } = this;
        // tslint:disable-next-line:no-string-literal
        const type = ctx.request.query['type'];
        // tslint:disable-next-line:no-string-literal
        const school = ctx.request.query['school'];
        // tslint:disable-next-line:no-string-literal
        const area = ctx.request.query['area'];
        // tslint:disable-next-line:no-string-literal
        const majore = ctx.request.query['majore'];
        // tslint:disable-next-line:no-string-literal
        const arts_li_ke = ctx.request.query['arts'];
        this.logger.info(ctx.request.query);
        if (type === 'majore') {
            ctx.body = await ctx.service.search.searchMajore(majore, school, area, arts_li_ke);
        }
        else if (type === 'schooleInfo') {
            ctx.body = await ctx.service.search.searchSchoolInfo(school);
        }
        else if (type === 'schoolScore') {
            ctx.body = await ctx.service.search.searchSchoolScore(school, area, arts_li_ke);
        }
        else if (type === 'areaScore') {
            ctx.body = await ctx.service.search.searchAreaSore(area, arts_li_ke);
        }
    }
}
exports.default = SearchController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWlDO0FBQ2pDLE1BQXFCLGdCQUFpQixTQUFRLGdCQUFVO0lBQzdDLEtBQUssQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVyQiw2Q0FBNkM7UUFDN0MsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsNkNBQTZDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLDZDQUE2QztRQUM3QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2Qyw2Q0FBNkM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsNkNBQTZDO1FBQzdDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDdEY7YUFBTSxJQUFJLElBQUksS0FBSyxhQUFhLEVBQUU7WUFDL0IsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hFO2FBQU0sSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFFO1lBQy9CLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25GO2FBQU0sSUFBSSxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztDQUNKO0FBekJELG1DQXlCQyJ9