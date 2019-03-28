import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/spyder', controller.spyder.index);

  router.get('/search', controller.search.index);

  // app.model.MajorScore.sync({ alter: true });
  // app.model.School.sync({alter: true});
};
