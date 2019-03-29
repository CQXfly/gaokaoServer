"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const sequelize_1 = require("sequelize");
class Search extends egg_1.Service {
    async searchMajore(majore, school, area = '江苏', arts_li_ke = '文科') {
        // 缓存中查询
        // redis key = 'searchMajore_majore_school_area'
        const redis_key = `searchMajore_${majore}_${school}_${area}_${arts_li_ke}`;
        console.log(school);
        try {
            const r = await this.app.redis.smembers(redis_key);
            if (r === null || r.length <= 0) {
                let result;
                if (school === null) {
                    result = await this.ctx.model.MajorScore.
                        findAll({ attributes: ['av_score', 'enroll_lot', 'enroll_age', 'high_score', 'arts_li_ke'],
                        where: {
                            arts_li_ke,
                            major: majore,
                            enroll_area: area,
                            enroll_age: { [sequelize_1.Op.gte]: 2014 },
                        } });
                }
                else {
                    result = await this.ctx.model.MajorScore.
                        findAll({ attributes: ['av_score', 'enroll_lot', 'enroll_age', 'high_score', 'arts_li_ke'],
                        where: {
                            arts_li_ke,
                            major: majore,
                            school,
                            enroll_area: area,
                            enroll_age: { [sequelize_1.Op.gte]: 2014 },
                        } });
                }
                if (result.length <= 0) {
                    return result;
                }
                const rr = JSON.stringify(result);
                await this.app.redis.sadd(redis_key, rr);
                this.logger.info(rr);
                return rr;
            }
            console.log(r);
            return JSON.parse(r[0]);
        }
        catch (e) {
            this.logger.error(e);
        }
        this.logger.info(school, majore);
    }
    async searchSchoolInfo(school) {
        const redis_key = `searchScoreInfo_${school}`;
        console.log(school);
        try {
            const r = await this.app.redis.smembers(redis_key);
            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.School.
                    findAll({
                    where: {
                        school,
                    }
                });
                if (result.length <= 0) {
                    return result;
                }
                const rr = JSON.stringify(result);
                await this.app.redis.sadd(redis_key, rr);
                this.logger.info(rr);
                return rr;
            }
            console.log(r);
            return JSON.parse(r[0]);
        }
        catch (e) {
            this.logger.error(e);
        }
        this.logger.info(school);
    }
    async searchSchoolScore(school, area = '江苏', arts_li_ke = '文科') {
        const redis_key = `searchSchoolScore_${school}_${area}_${arts_li_ke}`;
        console.log(school);
        try {
            const r = await this.app.redis.smembers(redis_key);
            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.SchoolScore.
                    findAll({
                    where: {
                        arts_li_ke,
                        school,
                        enroll_area: area,
                        enroll_age: { [sequelize_1.Op.gte]: 2014 },
                    }
                });
                if (result.length <= 0) {
                    return result;
                }
                const rr = JSON.stringify(result);
                await this.app.redis.sadd(redis_key, rr);
                this.logger.info(rr);
                return rr;
            }
            console.log(r);
            return JSON.parse(r[0]);
        }
        catch (e) {
            this.logger.error(e);
        }
        this.logger.info(school, area);
    }
    async searchAreaSore(area = '江苏', arts_li_ke = '文科') {
        const redis_key = `searchAreaSore_${area}_${arts_li_ke}`;
        try {
            const r = await this.app.redis.smembers(redis_key);
            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.AreaScore.
                    findAll({
                    where: {
                        arts_li_ke,
                        area,
                        enroll_age: { [sequelize_1.Op.gte]: 2014 },
                    }
                });
                if (result.length <= 0) {
                    return result;
                }
                const rr = JSON.stringify(result);
                await this.app.redis.sadd(redis_key, rr);
                this.logger.info(rr);
                return rr;
            }
            console.log(r);
            return JSON.parse(r[0]);
        }
        catch (e) {
            this.logger.error(e);
        }
        this.logger.info(area);
    }
}
exports.default = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQThCO0FBQzlCLHlDQUE2QjtBQUM3QixNQUFxQixNQUFPLFNBQVEsYUFBTztJQUNoQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWMsRUFBRSxNQUFxQixFQUFFLE9BQWUsSUFBSSxFQUFFLGFBQXFCLElBQUk7UUFDM0csUUFBUTtRQUNSLGdEQUFnRDtRQUNoRCxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsTUFBTSxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFLENBQUM7UUFFM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJO1lBQ0EsTUFBTSxDQUFDLEdBQVUsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFMUQsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUM3QixJQUFJLE1BQWEsQ0FBQztnQkFDbEIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUNqQixNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVO3dCQUN4QyxPQUFPLENBQUMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO3dCQUN6RixLQUFLLEVBQUU7NEJBQ0gsVUFBVTs0QkFDVixLQUFLLEVBQUUsTUFBTTs0QkFDYixXQUFXLEVBQUUsSUFBSTs0QkFDakIsVUFBVSxFQUFFLEVBQUMsQ0FBQyxjQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFDO3lCQUMvQixFQUFDLENBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDSCxNQUFNLEdBQUcsTUFBTSxJQUFJ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