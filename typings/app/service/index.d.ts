// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Test from '../../../app/service/Test';
import Search from '../../../app/service/search';
import Spyder from '../../../app/service/spyder';

declare module 'egg' {
  interface IService {
    test: Test;
    search: Search;
    spyder: Spyder;
  }
}
