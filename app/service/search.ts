import { Service } from 'egg';
import {Op} from 'sequelize';
export default class Search extends Service {
    public async searchMajoreScore(majore: string, school: string | null,
        area: string = '江苏',
        arts_li_ke: string = '文科') {
        // 缓存中查询
        // redis key = 'searchMajore_majore_school_area'
        const redis_key = `searchMajore_${majore}_${school}_${area}_${arts_li_ke}`;

        console.log(school);
        try {
            const r: any[] = await this.app.redis.smembers(redis_key);

            if (r === null || r.length <= 0) {
                let result: any[];
                if (school === null) {
                    result = await this.ctx.model.MajorScore.
                    findAll({attributes: ['av_score', 'enroll_lot', 'enroll_age', 'high_score', 'arts_li_ke'] ,
                    where: {
                        arts_li_ke,
                        major: majore,
                        enroll_area: area,
                        enroll_age: {[Op.gte]: 2014},
                    }} );
                } else {
                    result = await this.ctx.model.MajorScore.
                    findAll({attributes: ['av_score', 'enroll_lot', 'enroll_age', 'high_score', 'arts_li_ke'] ,
                    where: {
                        arts_li_ke,
                        major: majore,
                        school,
                        enroll_area: area,
                        enroll_age: {[Op.gte]: 2014},
                    }} );
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
        } catch (e) {
            this.logger.error(e);
        }

        this.logger.info(school, majore );
    }

    public async searchSchoolInfo(school: string) {
        const redis_key = `searchScoreInfo_${school}`;

        console.log(school);
        try {
            const r: any[] = await this.app.redis.smembers(redis_key);

            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.School.
                    findAll({
                    where: {
                        school,
                    }} );
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
        } catch (e) {
            this.logger.error(e);
        }
        this.logger.info(school);
    }

    public async searchSchoolScore(school: string, area: string = '江苏', arts_li_ke: string = '文科') {
        const redis_key = `searchSchoolScore_${school}_${area}_${arts_li_ke}`;

        console.log(school);
        try {
            const r: string[] = await this.app.redis.smembers(redis_key);

            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.SchoolScore.
                    findAll({
                    where: {
                        arts_li_ke,
                        school,
                        enroll_area: area,
                        enroll_age: {[Op.gte]: 2014},
                    }} );
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
        } catch (e) {
            this.logger.error(e);
        }
        this.logger.info(school, area);
    }

    public async searchAreaSore(area: string = '江苏', arts_li_ke: string = '文科') {
        const redis_key = `searchAreaSore_${area}_${arts_li_ke}`;
        try {
            const r: any[] = await this.app.redis.smembers(redis_key);
            if (r === null || r.length <= 0) {
                const result = await this.ctx.model.AreaScore.
                    findAll({
                    where: {
                        arts_li_ke,
                        area,
                        enroll_age: {[Op.gte]: 2014},
                    }} );
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
        } catch (e) {
            this.logger.error(e);
        }
        this.logger.info( area);
    }

    public async searchSchool(name: string) {
        return await this.ctx.model.School.findAll({
            where: {
                school: {
                    [Op.like]: `%${name}%`,
                },
            },
        });
    }

    public async searchSchoolAndMajor(major: string, school: string, arts_li_ke: string,
        area: string) {
        return await this.ctx.model.MajorScore.findAll({
            where: {
                major: {
                    [Op.like]: `%${major}%`,
                },
                school,
                area,
                arts_li_ke,
            },
        });
    }

}
