// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Home from '../../../app/controller/home';
import Spyder from '../../../app/controller/spyder';

declare module 'egg' {
  interface IController {
    home: Home;
    spyder: Spyder;
  }
}
