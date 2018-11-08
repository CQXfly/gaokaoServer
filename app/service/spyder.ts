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
    return 'spyder';
  }

  public async spyderMajorScore() {

    // const { ctx } = this;

    // 爬取数据
    const rooturl = 'http://college.gaokao.com/school/tinfo/1/result';
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
      console.log(result);
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
              m.low_score = parseInt(ele.childNodes[0].data!, 10);
            }
          } else if (index === 2) {
            if (typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.high_score = parseInt(ele.childNodes[0].data!, 10);
            }
          } else if (index === 3) {
            if (typeof (ele.childNodes[0].childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.av_score = parseInt(ele.childNodes[0].childNodes[0].data!, 10);
            }
          } else if (index === 4) {
            if (typeof (ele.childNodes[0].data) === 'undefined') {
              m.error = true;
            } else {
              m.enroll_number = parseInt(ele.childNodes[0].data!, 10);
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
  av_score: number;
  enroll_lot: string;
  enroll_area: string;
  enroll_age: number;
  low_score: number;
  high_score: number;
  enroll_number: number;
  error: boolean = false;

  constructor() {
  }

  public hash() {
    // return this.school. ^ this.arts_li_ke
  }
}