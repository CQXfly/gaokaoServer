// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Home from '../../../app/controller/home';
import Score from '../../../app/controller/score';
import Search from '../../../app/controller/search';
import Spyder from '../../../app/controller/spyder';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: Home;
    score: Score;
    search: Search;
    spyder: Spyder;
    user: User;
  }
}
