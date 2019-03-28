import { Controller } from 'egg';
export default class SearchController extends Controller {
    public async index() {
        const { ctx } = this;

        const type = ctx.request.query['type'];
        const school = ctx.request.query['school'];
        const area = ctx.request.query['area'];
        const majore = ctx.request.query['majore'];
        const arts_li_ke = ctx.request.query['arts'];
        this.logger.info(ctx.request.query);
        if (type === 'majore') {
            ctx.body = await ctx.service.search.searchMajore(majore, school, area, arts_li_ke);
        } else if (type === 'schooleInfo') {
            ctx.body = await ctx.service.search.searchSchoolInfo(school);
        } else if (type === 'schoolScore') {
            ctx.body = await ctx.service.search.searchSchoolScore(school, area, arts_li_ke);
        } else if (type === 'areaScore') {
            ctx.body = await ctx.service.search.searchAreaSore(area, arts_li_ke);
        }
    }
}