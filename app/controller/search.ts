import { Controller } from 'egg';
export default class SearchController extends Controller {
    public async index() {
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
        } else if (type === 'schoolInfo') {
            ctx.body = await ctx.service.search.searchSchoolInfo(school);
        } else if (type === 'schoolScore') {
            ctx.body = await ctx.service.search.searchSchoolScore(school, area, arts_li_ke);
        } else if (type === 'areaScore') {
            ctx.body = await ctx.service.search.searchAreaSore(area, arts_li_ke);
        }
        ctx.body = 'search type should be majore \ schoolInfo \ schoolScore \ areaScore' ;

    }
}
