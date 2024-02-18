// 参考案例: https://github.com/hastackdev/nuxt3-blog/tree/master
import { useBase, createRouter, defineEventHandler } from 'h3';

import * as IndexController from '~~/server/controller/index';

const router = createRouter();

// Index Test
router.get('/index', defineEventHandler(IndexController.getIndexList));

export default useBase('/api', router.handler);
