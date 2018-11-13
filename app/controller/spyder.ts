import { Controller } from 'egg';

export default class SpyderController extends Controller {
  public async index() {

    const { ctx } = this;

    const r = await ctx.model.User.findAll({ where: { password: 123 } });

    if (r[0]) {
      ctx.logger.debug(r[0]);
    } else {
      ctx.model.User.create({ name: `er${Date.now().toString()}`, notify_count: 3, status: 1, password: '123' });
    }

    ctx.service.spyder.spyderMajorScore();
    ctx.body = await ctx.service.spyder.test();
  }
}