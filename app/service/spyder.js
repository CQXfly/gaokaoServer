"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const egg_1 = require("egg");
const request = require("superagent");
const charset = require("superagent-charset");
class Spyder extends egg_1.Service {
    constructor() {
        super(...arguments);
        this.allProvince = ['北京', '天津', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江',
            '安徽', '福建', '山东', '湖北', '湖南', '广东', '重庆', '四川', '陕西', '甘肃', '河北', '山西', '内蒙古',
            '河南', '海南', '广西', '贵州', '云南', '西藏', '青海', '宁夏', '新疆', '江西', '香港', '澳门', '台湾'];
        this.allSubjects = ['理科', '文科', '综合', '其他', '艺术理', '艺术文'];
    }
    async test() {
        return 'spyderSchool';
    }
    async findMajor() {
        return 'spyderMajor';
    }
    async findSchool() {
        return 'spyderSchool';
    }
    // 学校分数线
    async spyderSchoolScore() {
        // const { ctx } = this;
        // 爬取数据
        let index = 0;
        while (index <= 2660) {
            const rooturl = `http://college.gaokao.com/school/tinfo/${index}/result`;
            console.log(rooturl);
            const urls = [];
            // tslint:disable-next-line:no-shadowed-variable
            this.allProvince.forEach((e, index) => {
                this.allSubjects.forEach((e2, index2) => {
                    const url = `${rooturl}/${index + 1}/${index2 + 1}/`;
                    urls.push(`${url}+${e}+${e2}`);
                });
            });
            for (const url of urls) {
                const subUrls = url.split('+');
                try {
                    const res = await this.spyderStart(subUrls[0]);
                    const result = this.spyderData(res, subUrls[1], subUrls[2]);
                    await this.asyncPool(20, result, this.schoolScoreDBOperation.bind(this));
                }
                catch (error) {
                    this.ctx.logger.error(error);
                    break;
                }
            }
            index += 1;
        }
    }
    // 专业分数线
    async spyderMajorScore() {
        // 年份  2017 - 2013
        let year = 2016;
        while (year >= 2013) {
            let idx = 1;
            if (year === 2016) {
                idx = 18;
            }
            for (const iterator of this.allProvince) {
                let page = 1;
                if (idx === 18 && year === 2016) {
                    page = 6;
                }
                this.logger.info(iterator);
                while (true) {
                    const rootUrl = `http://college.gaokao.com/spepoint/a${idx}/y${year}/p${page}`;
                    this.logger.info(rootUrl);
                    // 爬虫 没有找到相关内容 break;
                    try {
                        const seeds = await this.spyderStart(rootUrl);
                        const res = this.spyderMajorScoreData(seeds);
                        await this.asyncPool(20, res, this.schoolMajorDBOperation.bind(this));
                    }
                    catch (error) {
                        this.logger.info(error.message);
                        if (error.message === 'no more data') {
                            page = 1;
                            break;
                        }
                        else {
                            page += 1;
                            continue;
                        }
                    }
                    page += 1;
                }
                idx += 1;
            }
            year -= 1;
        }
        // page
    }
    // 学校信息
    async spyderSchool() {
        let iiiii = 1;
        while (iiiii <= 120) {
            const rootUrl = `http://college.gaokao.com/schlist/p${iiiii}`;
            try {
                const seeds = await this.spyderStart(rootUrl);
                const res = this.spyderSchooleData(seeds);
                await this.asyncPool(20, res, this.schoolDBOperation.bind(this));
                // console.log(res);
                iiiii += 1;
                console.log(iiiii);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    // 地区批次线
    async spyderAreaScore() {
        let index = 1;
        while (index <= 190) {
            const rootUrl = `http://college.gaokao.com/areapoint/a100/p${index}`;
            // 每一頁的數據一起提交入庫
            try {
                const res = await this.spyderStart(rootUrl);
                const result = this.spyderAreaScoreData(res);
                await this.asyncPool(10, result, await this.areaScoreDBOperation.bind(this));
            }
            catch (error) {
                this.ctx.logger.error(error);
                continue;
            }
            index += 1;
        }
    }
    async schoolScoreDBOperation(model) {
        if (model.error) {
            return;
        }
        const { ctx } = this;
        const m = await ctx.model.SchoolScore.find({
            where: {
                school: model.school,
                arts_li_ke: model.arts_li_ke,
                av_score: model.av_score,
                enroll_lot: model.enroll_lot,
                enroll_number: model.enroll_number,
                enroll_age: model.enroll_age,
                enroll_area: model.enroll_area,
                low_score: model.low_score,
                high_score: model.high_score,
            },
        });
        if (m) {
            return;
        }
        else {
            const r = await ctx.model.SchoolScore.insertOrUpdate({
                school: model.school,
                arts_li_ke: model.arts_li_ke,
                av_score: model.av_score,
                enroll_lot: model.enroll_lot,
                enroll_number: model.enroll_number,
                enroll_age: model.enroll_age,
                enroll_area: model.enroll_area,
                low_score: model.low_score,
                high_score: model.high_score,
            });
            if (r) {
                this.logger.info('success');
            }
            return;
        }
    }
    async schoolMajorDBOperation(model) {
        const { ctx } = this;
        const m = await ctx.model.MajorScore.find({ where: {
                major: model.major,
                school: model.school,
                av_score: model.av_score,
                enroll_lot: model.enroll_lot,
                enroll_area: model.enroll_area,
                enroll_age: model.enroll_age,
                high_score: model.high_score,
                arts_li_ke: model.arts_li_ke,
            } });
        if (m) {
            this.logger.info(`${m}\n has saved`);
        }
        else {
            await ctx.model.MajorScore.insertOrUpdate({
                major: model.major,
                school: model.school,
                av_score: model.av_score,
                enroll_lot: model.enroll_lot,
                enroll_area: model.enroll_area,
                enroll_age: model.enroll_age,
                high_score: model.high_score,
                arts_li_ke: model.arts_li_ke,
            });
        }
    }
    async schoolDBOperation(model) {
        const { ctx } = this;
        const m = await ctx.model.School.find({ where: {
                school: model.school,
                school_type: model.school_type,
                school_special: model.school_special,
            },
        });
        if (m) {
            return;
        }
        ;
        await ctx.model.School.insertOrUpdate({
            school: model.school,
            school_area: model.school_area,
            school_icon: model.school_icon,
            school_type: model.school_type,
            school_nature: model.school_nature,
            school_special: model.school_special,
            school_net: model.school_net,
            school_attach: model.school_attach,
            academician_number: model.academician_number,
            doctor_station_num: model.doctor_station_num,
            master_station_num: model.master_station_num,
            school_id: model.school_id,
        });
    }
    async areaScoreDBOperation(model) {
        const { ctx } = this;
        const m = await ctx.model.AreaScore.find({
            where: {
                area: model.area,
                enroll_age: model.enroll_year,
                enroll_lot: model.enroll_lot,
                arts_li_ke: model.arts_li_ke,
                low_score: model.low_score,
            },
        });
        if (m) {
            return;
        }
        const r = await ctx.model.AreaScore.insertOrUpdate({
            area: model.area,
            enroll_age: model.enroll_year,
            enroll_lot: model.enroll_lot,
            arts_li_ke: model.arts_li_ke,
            low_score: model.low_score,
        });
        if (r) {
            this.logger.info('insert area score success');
        }
    }
    spyderSchooleData(res) {
        const $ = cheerio.load(res);
        const s = $('body').find('#wrapper').find('.ts').find('h3').text();
        if (s === '抱歉，没有找到相关内容') {
            throw new Error('no more data');
        }
        // id #   class .
        const result = [];
        $('body').find('#wrapper').find('.scores_List').find('dl').each((indexx, elee) => {
            const sc = new SchoolModel();
            // tslint:disable-next-line:no-unused-expression
            indexx;
            $(elee).find('dt').each((index, element) => {
                if (element.childNodes[1].childNodes[0].attribs !== undefined) {
                    // tslint:disable-next-line:no-string-literal
                    sc.school_icon = element.childNodes[1].childNodes[0].attribs["src"];
                }
                sc.school = element.childNodes[2].childNodes[0].childNodes[0].data;
                // tslint:disable-next-line:no-unused-expression
                index;
            });
            $(elee).find('dd').each((index, element) => {
                // tslint:disable-next-line:no-unused-expression
                index;
                $(element).find('ul').find('li').each((i, e) => {
                    if (e.childNodes[0].data === undefined && i !== 1) {
                        return;
                    }
                    if (i === 0) {
                        const area = e.childNodes[0].data;
                        sc.school_area = area.substr(6, area.length);
                    }
                    else if (i === 1) {
                        if (e.childNodes[1] !== undefined) {
                            const a = e.childNodes[1].childNodes[0].data;
                            sc.school_special = `${a ? a : 'null'}`;
                        }
                        if (e.childNodes[2] === undefined) {
                            return;
                        }
                        if (e.childNodes[1].childNodes[0].data !== undefined
                            || e.childNodes[2].childNodes[0].data !== undefined) {
                            const a = e.childNodes[1].childNodes[0].data;
                            const b = e.childNodes[2].childNodes[0].data;
                            sc.school_special = `${a ? a : 'null'},${b ? b : 'null'}`;
                        }
                    }
                    else if (i === 2) {
                        const school_type = e.childNodes[0].data;
                        sc.school_type = school_type.substr(5, school_type.length);
                    }
                    else if (i === 3) {
                        const school_attach = e.childNodes[0].data;
                        sc.school_attach = school_attach.substr(5, school_attach.length);
                    }
                    else if (i === 4) {
                        const school_nature = e.childNodes[0].data;
                        sc.school_nature = school_nature.substr(5, school_nature.length);
                    }
                    else if (i === 5) {
                        const school_net = e.childNodes[0].data;
                        sc.school_net = school_net.substr(5, school_net.length);
                    }
                });
                result.push(sc);
            });
        });
        return result;
    }
    spyderMajorScoreData(res) {
        const $ = cheerio.load(res);
        // 判断该url 是否为错误 如果出错抛弃
        const s = $('body').find('#wrapper').find('.ts').find('h3').text();
        if (s === '抱歉，没有找到相关内容') {
            throw new Error('no more data');
        }
        const result = [];
        $('body').find('#wrapper').find('table').find('tbody').find('tr').each((indexx, elee) => {
            if (indexx > 0) {
                const r = new MajorScoreModel();
                $(elee).find('td').each((index, element) => {
                    if (index === 0) {
                        r.major = element.childNodes[0].childNodes[0].data;
                    }
                    else if (index === 1) {
                        r.school = element.childNodes[0].childNodes[0].data;
                    }
                    else if (index === 2) {
                        const av = parseInt(element.childNodes[0].childNodes[0].data, 10);
                        if (isNaN(av)) {
                            r.av_score = 0;
                        }
                        else {
                            r.av_score = av;
                        }
                    }
                    else if (index === 3) {
                        const highscore = parseInt(element.childNodes[0].data, 10);
                        if (isNaN(highscore)) {
                            r.high_score = 0;
                        }
                        else {
                            r.high_score = highscore;
                        }
                    }
                    else if (index === 4) {
                        r.enroll_area = element.childNodes[0].data;
                    }
                    else if (index === 5) {
                        r.arts_li_ke = element.childNodes[0].data;
                    }
                    else if (index === 6) {
                        r.enroll_age = parseInt(element.childNodes[0].data, 10);
                    }
                    else if (index === 7) {
                        r.enroll_lot = element.childNodes[0].data;
                    }
                });
                result.push(r);
            }
        });
        return result;
    }
    spyderAreaScoreData(res) {
        const $ = cheerio.load(res);
        const result = [];
        $('body').find('#wrapper').find('table').find('tbody').find('tr').each((indexx, ele) => {
            if (indexx > 0) {
                const r = new AreaScore();
                $(ele).find('td').each((index, element) => {
                    if (index === 0) {
                        r.enroll_year = parseInt(element.childNodes[0].data, 10);
                    }
                    else if (index === 1) {
                        r.area = element.childNodes[0].data;
                    }
                    else if (index === 2) {
                        r.arts_li_ke = element.childNodes[0].data;
                    }
                    else if (index === 3) {
                        r.enroll_lot = element.childNodes[0].data;
                    }
                    else {
                        r.low_score = parseInt(element.childNodes[0].data, 10);
                    }
                });
                result.push(r);
            }
        });
        return result;
    }
    spyderData(res, area, subject) {
        const $ = cheerio.load(res);
        let school = '';
        $('body').find('.wrap').find('.bg_sez').find('h2').each((index, ele) => {
            this.logger.info(index);
            school = ele.childNodes[0].data;
        });
        const result = [];
        let err = false;
        const rr = $('body').find('.wrap').find('#cont_l in').find('#ts').find('h3').text();
        if (rr === '抱歉，没有找到相关内容') {
            err = true;
            const m = new SchoolScoreModel();
            m.error = err;
            result.push(m);
            return result;
        }
        $('body').find('#pointbyarea').find('table').find('tbody').find('tr').each((indexx, elee) => {
            if (indexx !== 0) {
                const m = new SchoolScoreModel();
                m.school = school;
                m.enroll_area = area;
                m.arts_li_ke = subject;
                $(elee).find('td').each((index, ele) => {
                    if (index === 0) {
                        if (typeof (ele.childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            m.enroll_age = parseInt(ele.childNodes[0].data, 10);
                        }
                    }
                    else if (index === 1) {
                        if (typeof (ele.childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            m.low_score = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
                        }
                    }
                    else if (index === 2) {
                        if (typeof (ele.childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            m.high_score = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
                        }
                    }
                    else if (index === 3) {
                        if (typeof (ele.childNodes[0].childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            const s = ele.childNodes[0].childNodes[0].data;
                            m.av_score = parseInt(s !== '------' ? s : '0', 10);
                        }
                    }
                    else if (index === 4) {
                        if (typeof (ele.childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            m.enroll_number = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
                        }
                    }
                    else if (index === 5) {
                        if (ele.childNodes.length > 0 && typeof (ele.childNodes[0].data) === 'undefined') {
                            m.error = true;
                        }
                        else if (typeof (ele.childNodes[0]) === 'undefined') {
                            m.error = true;
                        }
                        else {
                            m.enroll_lot = ele.childNodes[0].data;
                        }
                    }
                });
                result.push(m);
            }
        });
        return result;
    }
    async spyderStart(url) {
        const p = new Promise((resolve, reject) => {
            charset(request).get(url).charset('gbk').end((err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.text);
                    // ctx.app.logger.debug(res);
                }
            });
        });
        return p;
    }
    asyncPool(poolLimit, array, iteratorFn) {
        let i = 0;
        const ret = [];
        const executing = [];
        const enqueue = () => {
            // 边界处理，array为空数组
            if (i === array.length) {
                return Promise.resolve();
            }
            // 每调一次enqueue，初始化一个promise
            const item = array[i++];
            const p = Promise.resolve().then(() => iteratorFn(item, array));
            // 放入promises数组
            ret.push(p);
            // promise执行完毕，从executing数组中删除
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            // 插入executing数字，表示正在执行的promise
            executing.push(e);
            // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
            let r = Promise.resolve();
            if (executing.length >= poolLimit) {
                r = Promise.race(executing);
            }
            // 递归，直到遍历完array
            return r.then(() => enqueue());
        };
        return enqueue().then(() => Promise.all(ret));
    }
}
exports.default = Spyder;
class SchoolScoreModel {
    constructor() {
        this.av_score = 0;
        this.low_score = 0;
        this.high_score = 0;
        this.error = false;
    }
    hash() {
        // return this.school. ^ this.arts_li_ke
    }
}
class AreaScore {
}
class MajorScoreModel {
    constructor() {
        this.arts_li_ke = '';
    }
}
class SchoolModel {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3B5ZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3B5ZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLDZCQUE4QjtBQUM5QixzQ0FBc0M7QUFDdEMsOENBQThDO0FBRTlDLE1BQXFCLE1BQU8sU0FBUSxhQUFPO0lBQTNDOztRQUNVLGdCQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtZQUNsRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO1lBQzdFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFFLGdCQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBbWdCL0QsQ0FBQztJQWpnQlEsS0FBSyxDQUFDLElBQUk7UUFDZixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVM7UUFDcEIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ3JCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRO0lBQ0QsS0FBSyxDQUFDLGlCQUFpQjtRQUU1Qix3QkFBd0I7UUFDeEIsT0FBTztRQUNQLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLE9BQU8sS0FBSyxJQUFJLElBQUksRUFBRTtZQUNwQixNQUFNLE9BQU8sR0FBRywwQ0FBMEMsS0FBSyxTQUFTLENBQUM7WUFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7WUFDMUIsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTtvQkFDdEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxPQUFPLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtnQkFDdEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFL0IsSUFBSTtvQkFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTtnQkFBQyxPQUFPLEtBQUssRUFBRTtvQkFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLE1BQU07aUJBQ1A7YUFDRjtZQUNELEtBQUssSUFBSSxDQUFDLENBQUM7U0FDWjtJQUVILENBQUM7SUFFRCxRQUFRO0lBQ0QsS0FBSyxDQUFDLGdCQUFnQjtRQUMzQixrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLEdBQUcsR0FBRyxFQUFFLENBQUM7YUFDVjtZQUNELEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDdkMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO29CQUMvQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNWO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQixPQUFPLElBQUksRUFBRTtvQkFDWCxNQUFNLE9BQU8sR0FBRyx1Q0FBdUMsR0FBRyxLQUFLLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFCLHFCQUFxQjtvQkFDckIsSUFBSTt3QkFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlDLE1BQU8sR0FBRyxHQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDL0MsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUN2RTtvQkFBQyxPQUFPLEtBQUssRUFBRTt3QkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxjQUFjLEVBQUU7NEJBQ3BDLElBQUksR0FBRyxDQUFDLENBQUM7NEJBQ1QsTUFBTTt5QkFDUDs2QkFBTTs0QkFDTCxJQUFJLElBQUksQ0FBQyxDQUFDOzRCQUNWLFNBQVM7eUJBQ1Y7cUJBQ0Y7b0JBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Y7WUFDRCxJQUFJLElBQUksQ0FBQyxDQUFDO1NBQ1g7UUFDRCxPQUFPO0lBQ1QsQ0FBQztJQUVELE9BQU87SUFDQSxLQUFLLENBQUMsWUFBWTtRQUN2QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFZCxPQUFPLEtBQUssSUFBSSxHQUFHLEVBQUU7WUFDbkIsTUFBTSxPQUFPLEdBQUcsc0NBQXNDLEtBQUssRUFBRSxDQUFDO1lBQzlELElBQUk7Z0JBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxNQUFPLEdBQUcsR0FBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDakUsb0JBQW9CO2dCQUNwQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1NBRUY7SUFDSCxDQUFDO0lBRUQsUUFBUTtJQUNELEtBQUssQ0FBQyxlQUFlO1FBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLE9BQU8sS0FBSyxJQUFJLEdBQUcsRUFBRTtZQUNuQixNQUFNLE9BQU8sR0FBRyw2Q0FBNkMsS0FBSyxFQUFFLENBQUM7WUFDckUsZUFBZTtZQUNmLElBQUk7Z0JBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixTQUFTO2FBQ1Y7WUFDRCxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ1o7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLHNCQUFzQixDQUFDLEtBQXVCO1FBQzFELElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDekMsS0FBSyxFQUFFO2dCQUNMLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDcEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO2dCQUNsQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDN0I7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsRUFBRTtZQUNMLE9BQU87U0FDUjthQUFNO1lBQ0wsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7Z0JBQ25ELE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDcEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO2dCQUNsQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUMxQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7YUFDN0IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7WUFFRCxPQUFPO1NBQ1I7SUFDSCxDQUFDO0lBQ08sS0FBSyxDQUFDLHNCQUFzQixDQUFDLEtBQXNCO1FBQ3pELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUU7Z0JBQ2hELEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNwQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2FBQzdCLEVBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLEVBQUU7WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2dCQUN4QyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQkFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVO2dCQUM1QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTthQUM3QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBa0I7UUFDaEQsTUFBTSxFQUFDLEdBQUcsRUFBQyxHQUFHLElBQUksQ0FBQztRQUNuQixNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFDMUM7Z0JBQ0UsTUFBTSxFQUFHLEtBQUssQ0FBQyxNQUFNO2dCQUNyQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzlCLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYzthQUNyQztTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxFQUFFO1lBQUMsT0FBTztTQUFFO1FBQUEsQ0FBQztRQUVsQixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUN0QyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO1lBQzlCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDOUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO1lBQ2xDLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztZQUNwQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDNUIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO1lBQ2xDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxrQkFBa0I7WUFDNUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLGtCQUFrQjtZQUM1QyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsa0JBQWtCO1lBQzVDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLEtBQWdCO1FBQ2pELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFckIsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkMsS0FBSyxFQUNMO2dCQUNBLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM3QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7Z0JBQzVCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtnQkFDNUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEVBQUU7WUFDTCxPQUFPO1NBQ1I7UUFDRCxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUNqRCxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7WUFDaEIsVUFBVSxFQUFFLEtBQUssQ0FBQyxXQUFXO1lBQzdCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM1QixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDNUIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUMvQztJQUVILENBQUM7SUFFUSxpQkFBaUIsQ0FBQyxHQUFXO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLGFBQWEsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsaUJBQWlCO1FBQ2pCLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMvRSxNQUFNLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzNCLGdEQUFnRDtZQUNoRCxNQUFNLENBQUM7WUFDUCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO29CQUM3RCw2Q0FBNkM7b0JBQzdDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNyRTtnQkFDRCxFQUFFLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFLLENBQUM7Z0JBQ3BFLGdEQUFnRDtnQkFDaEQsS0FBSyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLENBQUM7WUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDekMsZ0RBQWdEO2dCQUNoRCxLQUFLLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNqRCxPQUFPO3FCQUNSO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDWCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQzt3QkFDbkMsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzlDO3lCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTs0QkFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUM3QyxFQUFFLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO3lCQUN6Qzt3QkFDRCxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFOzRCQUNqQyxPQUFPO3lCQUNSO3dCQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFNBQVM7K0JBQy9DLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7NEJBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUM3QyxFQUFFLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxF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