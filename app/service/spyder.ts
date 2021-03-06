// import Axios from 'axios';
import * as cheerio from 'cheerio';
import { Service } from 'egg';
import * as request from 'superagent';
import * as charset from 'superagent-charset';

export default class Spyder extends Service {
  private allProvince = ['北京', '天津', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江'
    , '安徽', '福建', '山东', '湖北', '湖南', '广东', '重庆', '四川', '陕西', '甘肃', '河北', '山西', '内蒙古'
    , '河南', '海南', '广西', '贵州', '云南', '西藏', '青海', '宁夏', '新疆', '江西', '香港', '澳门', '台湾'];

  private allSubjects = ['理科', '文科', '综合', '其他', '艺术理', '艺术文'];

  public async test() {
    return 'spyderSchool';
  }

  public async findMajor() {
    return 'spyderMajor';
  }

  public async findSchool() {
    return 'spyderSchool';
  }

  // 学校分数线
  public async spyderSchoolScore() {

    // const { ctx } = this;
    // 爬取数据
    let index = 0;
    while (index <= 2660) {
      const rooturl = `http://college.gaokao.com/school/tinfo/${index}/result`;
      console.log(rooturl);
      const urls: string[] = [];
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
        } catch (error) {
          this.ctx.logger.error(error);
          break;
        }
      }
      index += 1;
    }

  }

  // 专业分数线
  public async spyderMajorScore() {
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
            const  res =  this.spyderMajorScoreData(seeds);
            await this.asyncPool(20, res, this.schoolMajorDBOperation.bind(this));
          } catch (error) {
            this.logger.info(error.message);
            if (error.message === 'no more data') {
              page = 1;
              break;
            } else {
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
  public async spyderSchool() {
    let iiiii = 1;

    while (iiiii <= 120) {
      const rootUrl = `http://college.gaokao.com/schlist/p${iiiii}`;
      try {
        const seeds = await this.spyderStart(rootUrl);
        const  res =  this.spyderSchooleData(seeds);
        await this.asyncPool(20, res, this.schoolDBOperation.bind(this));
        // console.log(res);
        iiiii += 1;
        console.log(iiiii);
      } catch (e) {
        console.log(e);
      }

    }
  }

  // 地区批次线
  public async spyderAreaScore() {
    let index = 23;
    while (index <= 300) {
      const rootUrl = `http://college.gaokao.com/areapoint/a100/p${index}`;
      console.log(rootUrl);
      // 每一頁的數據一起提交入庫
      try {
        const res = await this.spyderStart(rootUrl);
        const result = this.spyderAreaScoreData(res);
        await this.asyncPool(10, result, this.areaScoreDBOperation.bind(this));
      } catch (error) {
        this.ctx.logger.error(error);
        continue;
      }
      index += 1;
    }
  }

  private async schoolScoreDBOperation(model: SchoolScoreModel) {
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
    } else {
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
  private async schoolMajorDBOperation(model: MajorScoreModel) {
    const { ctx } = this;
    const m = await ctx.model.MajorScore.find({where: {
      major: model.major,
      school: model.school,
      av_score: model.av_score,
      enroll_lot: model.enroll_lot,
      enroll_area: model.enroll_area,
      enroll_age: model.enroll_age,
      high_score: model.high_score,
      arts_li_ke: model.arts_li_ke,
    }});

    if (m) {
      this.logger.info(`${m}\n has saved`);
    } else {
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

  private async schoolDBOperation(model: SchoolModel) {
    const {ctx} = this;
    const m = await ctx.model.School.find({where:
      {
        school : model.school,
        school_type: model.school_type,
        school_special: model.school_special,
      },
    });

    if (m) {return; };

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

  private async areaScoreDBOperation(model: AreaScore) {
    const { ctx } = this;

    const m = await ctx.model.AreaScore.find({
      where:
      {
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

  private  spyderSchooleData(res: string): SchoolModel[]  {
    const $ = cheerio.load(res);
    const s = $('body').find('#wrapper').find('.ts').find('h3').text();
    if (s === '抱歉，没有找到相关内容') {
      throw new Error('no more data');
    }
    // id #   class .
    const result: SchoolModel[] = [];
    $('body').find('#wrapper').find('.scores_List').find('dl').each((indexx, elee) => {
      const sc = new SchoolModel();
        // tslint:disable-next-line:no-unused-expression
        indexx;
        $(elee).find('dt').each((index, element) => {
          if (element.childNodes[1].childNodes[0].attribs !== undefined) {
            // tslint:disable-next-line:no-string-literal
            sc.school_icon = element.childNodes[1].childNodes[0].attribs["src"];
          }
          sc.school = element.childNodes[2].childNodes[0].childNodes[0].data!;
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
              const area = e.childNodes[0].data!;
              sc.school_area = area.substr(6, area.length);
            } else if (i === 1) {
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

            } else if (i === 2) {
                const school_type = e.childNodes[0].data!;
                sc.school_type = school_type.substr(5, school_type.length);
            } else if (i === 3) {
              const school_attach = e.childNodes[0].data!;
              sc.school_attach = school_attach.substr(5, school_attach.length);
            } else if ( i === 4) {
              const school_nature = e.childNodes[0].data!;
              sc.school_nature = school_nature.substr(5, school_nature.length);
            } else if (i === 5) {
              const school_net = e.childNodes[0].data!;
              sc.school_net =  school_net.substr(5, school_net.length);
            }
          });
          result.push(sc);
        });
    });

    return result;
  }

  private spyderMajorScoreData(res: string): MajorScoreModel[] {
    const $ = cheerio.load(res);
    // 判断该url 是否为错误 如果出错抛弃
    const s = $('body').find('#wrapper').find('.ts').find('h3').text();
    if (s === '抱歉，没有找到相关内容') {
      throw new Error('no more data');
    }
    const result: MajorScoreModel[] = [];
    $('body').find('#wrapper').find('table').find('tbody').find('tr').each((indexx, elee) => {
      if (indexx > 0) {
        const r = new MajorScoreModel();
        $(elee).find('td').each((index, element) => {
          if (index === 0) {
            r.major = element.childNodes[0].childNodes[0].data!;
          } else if (index === 1) {
            r.school = element.childNodes[0].childNodes[0].data!;
          } else if (index === 2) {
            const av = parseInt(element.childNodes[0].childNodes[0].data!, 10);
            if (isNaN(av)) {
              r.av_score = 0;
            } else {
              r.av_score = av;
            }
          } else if (index === 3) {
            const highscore = parseInt(element.childNodes[0].data!, 10);
            if (isNaN(highscore)) {
              r.high_score = 0;
            } else {
              r.high_score = highscore;
            }
          } else if (index === 4) {
            r.enroll_area = element.childNodes[0].data!;
          } else if (index === 5) {
            r.arts_li_ke = element.childNodes[0].data!;
          } else if (index === 6) {
            r.enroll_age = parseInt(element.childNodes[0].data!, 10);
          } else if (index === 7) {
            r.enroll_lot = element.childNodes[0].data!;
          }
        });
        result.push(r);
      }
    });

    return result;

  }

  private spyderAreaScoreData(res: string): AreaScore[] {
    const $ = cheerio.load(res);
    const result: AreaScore[] = [];
    $('body').find('#wrapper').find('table').find('tbody').find('tr').each((indexx, ele) => {
      if (indexx > 0) {
        const r = new AreaScore();
        $(ele).find('td').each((index, element) => {
          if (index === 0) {
            r.enroll_year = parseInt(element.childNodes[0].data!, 10);
          } else if (index === 1) {
            try {
              r.area = element.childNodes[0].data!;
            } catch (err) {
              console.log(err);
            }
          } else if (index === 2) {
            r.arts_li_ke = element.childNodes[0].data!;
          } else if (index === 3) {
            r.enroll_lot = element.childNodes[0].data!;
          } else  {
            r.low_score = parseInt(element.childNodes[0].data!, 10);
          }
        });
        result.push(r);
      }
    });
    return result;
  }

  private spyderData(res: string, area: string, subject: string): SchoolScoreModel[] {

    const $ = cheerio.load(res);
    let school = '';
    $('body').find('.wrap').find('.bg_sez').find('h2').each((index, ele) => {
      this.logger.info(index);
      school = ele.childNodes[0].data!;
    });
    const result: SchoolScoreModel[] = [];

    let err: boolean = false;
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
            } else {
              m.enroll_age = parseInt(ele.childNodes[0].data!, 10);
            }
          } else if (index === 1) {
            if (typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.low_score = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
            }
          } else if (index === 2) {
            if (typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.high_score = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
            }
          } else if (index === 3) {
            if (typeof (ele.childNodes[0].childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              const s = ele.childNodes[0].childNodes[0].data;
              m.av_score = parseInt(s !== '------' ? s : '0', 10);
            }
          } else if (index === 4) {
            if (typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.enroll_number = parseInt(ele.childNodes[0].data !== '------' ? ele.childNodes[0].data : '0', 10);
            }
          } else if (index === 5) {
            if (ele.childNodes.length > 0 && typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else if (typeof (ele.childNodes[0]) === 'undefined') {
              m.error = true;
            } else {
              m.enroll_lot = ele.childNodes[0].data!;
            }
          }
        });
        result.push(m);
      }
    });
    return result;
  }

  private async spyderStart(url: string): Promise<string> {
    const p = new Promise<string>((resolve, reject) => {
      charset(request).get(url).charset('gbk').end((err, res) => {

        if (err) {
          reject(err);
        } else {
          resolve(res.text as string);
          // ctx.app.logger.debug(res);
        }
      });
    });
    return p;
  }

  private asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret: Array<Promise<any>> = [];
    const executing: Array<Promise<any>> = [];
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

  // async requestKcx(url: string): Promise<any> {
    //  return Axios.get(url);
  // }

  // 从api 中填补缺失数据 16-18
  public async spyderFromgkcx() {
    // req:
    // school_id 622
    // year 16-18
    // local_type_id 3
    // local_province_id 32

    // res :
    // proscore 省控线
    // local_batch_name 批次
    // local_type_name 文理科
    // local_province_name 招生地区
    // name 学校名称
    // max 最高分数
    // min 最低分数
    // average 平均分数
    // https://gkcx.eol.cn/api?uri=hxsjkqt/api/gk/score/province&school_id=37
    // &year=2018&local_province_id=31&local_type_id=3

    let school_id = 0;
    let local_province_id = 0;
    let local_type_id = 1;
    let year = 2018;
    while (year <= 2018) {
      if (year === 2018) {
        local_province_id = 32;
      } else {
        local_province_id = 0;
      }
      while (local_province_id <= 32) {
        if (year === 2018 && local_province_id === 32 ) {
          local_type_id = 3;
        } else {
          local_type_id = 1;
        }
        while (local_type_id <= 3) {
          school_id = 0;
          while (school_id <= 624) {
            // tslint:disable-next-line:max-line-length
            const url = `https://gkcx.eol.cn/api?uri=hxsjkqt/api/gk/score/province&school_id=${school_id}&year=${year}&local_province_id=${local_province_id}&local_type_id=${local_type_id}`;
            this.logger.info(url);
            try {
              // const res = await this.requestKcx(url);
              const res = [];
              await this.dealWithGkcxRes(res);
            } catch (error) {
              this.logger.error(error);
            }
            school_id += 1;
          }
          local_type_id += 1;
        }
        local_province_id += 1;
      }
      year += 1;
    }
  }

  async dealWithGkcxRes(res: any) {
      if (res.data.data.numFound <= 0) {
        return;
      }

      for (const item of res.data.data.item) {
        if (item.proscore !== '--') {
          const area: AreaScore = new AreaScore();
          area.area = item.local_province_name;
          area.arts_li_ke = item.local_type_name;
          area.enroll_lot = item.local_batch_name;
          area.enroll_year = item.year;
          area.low_score = Number(item.proscore);
          await this.areaScoreDBOperation(area);
        }
        if (item.average !== undefined && item.average !== '--') {
          const schoolScore = new SchoolScoreModel();
          schoolScore.arts_li_ke = item.local_type_name;
          schoolScore.av_score = item.average;
          schoolScore.enroll_age = item.year;
          schoolScore.enroll_area = item.local_province_name;
          schoolScore.enroll_lot = item.local_batch_name;
          schoolScore.enroll_number = 0;
          if (item.max === '--') {
            schoolScore.high_score = 0;
          }else {
            schoolScore.high_score = item.max;
          }
          if (item.min === '--') {
            schoolScore.low_score = 0;
          }else {
            schoolScore.low_score = item.min;
          }
          schoolScore.school = item.name;
          await this.schoolScoreDBOperation(schoolScore);
        }
      }
  }
}

class SchoolScoreModel {
  school: string;
  arts_li_ke: string;
  av_score: number = 0;
  enroll_lot: string;
  enroll_area: string;
  enroll_age: number;
  low_score: number = 0;
  high_score: number = 0;
  enroll_number: number;
  error: boolean = false;
  public hash() {
    // return this.school. ^ this.arts_li_ke
  }
}

class AreaScore {
  enroll_year: number;
  area: string;
  arts_li_ke: string;
  enroll_lot: string;
  low_score: number; // 最低分控线

}

class MajorScoreModel {
  major: string;
  school: string;
  arts_li_ke: string = '';
  av_score: number;
  enroll_lot: string;
  enroll_area: string;
  enroll_age: number;
  low_score: number;
  high_score: number;
}

class SchoolModel {
  school: string;
  school_area: string;
  school_icon: string;
  school_type: string;
  school_nature: string;
  school_special: string;
  school_net: string;
  school_attach: string;
  academician_number: number;
  doctor_station_num: number;
  master_station_num: number;
  school_id: number;
}
