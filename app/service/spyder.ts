import { Service } from 'egg';
import * as request from 'superagent';
import * as charset from 'superagent-charset';
import * as cheerio from 'cheerio';

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

  public async spyderMajorScore() {

    const { ctx } = this;

    // 爬取数据
    let index = 2;
    while (index <= 2660) {
      const rooturl = `http://college.gaokao.com/school/tinfo/${index}/result`;
      console.log(rooturl);
      const urls: string[] = []
      this.allProvince.forEach((e, index) => {
        this.allSubjects.forEach((e2, index2) => {
          const url = `${rooturl}/${index + 1}/${index2 + 1}/`;
          urls.push(`${url}+${e}+${e2}`);
        });
      });

      for (const url of urls) {
        const subUrls = url.split('+');
        const res = await this.spyderStart(subUrls[0]);
        let result = this.spyderData(res, subUrls[1], subUrls[2]);
        for (const model of result) {
          if (model.error) {
            continue;
          }
          let m = await ctx.model.SchoolScore.find({
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
            continue;
          } else {
            let r = await ctx.model.SchoolScore.insertOrUpdate({
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
              console.log("success");
            }
          }
        }
      }
      index += 1;
    }

  }

  private spyderData(res: string, area: string, subject: string): SchoolScoreModel[] {

    const $ = cheerio.load(res);

    let school = '';
    $('body').find('.wrap').find('.bg_sez').find('h2').each((index, ele) => {
      console.log(index);
      school = ele.childNodes[0].data!;
    });
    const result: SchoolScoreModel[] = [];

    let err: boolean = false;
    let rr = $('body').find('.wrap').find('#cont_l in').find('#ts').find('h3').text();
    if (rr === '抱歉，没有找到相关内容') {
      err = true;
      let m = new SchoolScoreModel();
      m.error = err;
      result.push(m);
      return result;
    }

    $('body').find('#pointbyarea').find('table').find('tbody').find('tr').each((index, ele) => {
      if (index !== 0) {
        let m = new SchoolScoreModel();
        m.school = school;
        m.enroll_area = area;
        m.arts_li_ke = subject;
        $(ele).find('td').each((index, ele) => {
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
              m.av_score = parseInt(ele.childNodes[0].childNodes[0].data !== '------' ? ele.childNodes[0].childNodes[0].data : '0', 10);
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
          resolve(res.text as string)
          // ctx.app.logger.debug(res);
        }
      });
    });
    return p;
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

  constructor() {

  }

  public hash() {
    // return this.school. ^ this.arts_li_ke
  }
}