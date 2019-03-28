import 'egg';
import {Redis} from 'ioredis'
declare module 'egg' {
    redis: Redis;
}