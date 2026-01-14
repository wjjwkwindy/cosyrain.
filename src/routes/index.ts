import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import MainLayout from '@/views/MainLayout.vue';

// 读取所有的 markdown 文件
const markdownFiles = import.meta.glob('../../pages/posts/*.md', {
  eager: true,
});
console.log('🚀 ~ markdownFiles:', markdownFiles);

const markdownRoutes = Object.entries(markdownFiles).map(([file, loader]) => {
  const mod = loader as { default?: any };
  const { title, date, tag } = mod as {
    title?: string;
    date?: string;
    tag?: string;
    default?: any;
  };
  const path = file.replace('../../pages', '').replace('.md', '');

  return {
    path,
    component: mod.default || mod,
    meta: {
      title,
      date,
      tag,
    },
  } as RouteRecordRaw;
});

// 定义路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '首页',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      // Tools
      {
        path: '/tools',
        name: 'ToolsView',
        component: () => import('@/views/ToolsView.vue'),
      },
      {
        path: '/tools/img',
        name: '照片构图分析',
        meta: {
          icon: 'IconFileImage',
          bg: 'tool-bg1.png',
          memo: '上传照片，使用划线工具进行画面结构分析',
          title: '',
          date: '',
        },
        component: () => import('../../pages/tools/Img.vue'),
      },
      {
        path: '/tools/calc',
        name: '计算器',
        meta: {
          icon: 'IconBarChart',
          bg: 'tool-bg2.png',
          memo: '根据定投金额和周期计算收益',
          title: '',
          date: '',
        },
        component: () => import('../../pages/tools/Img.vue'),
      },
      // Blogs
      {
        path: '/posts',
        name: 'PostsView',
        component: () => import('@/views/PostsView.vue'),
      },
      // Movies
      {
        path: '/movies',
        name: 'MoviesView',
        component: () => import('@/views/MoviesView.vue')
      },
      ...markdownRoutes,
    ],
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/:pathMatch(.*)',
    name: '404 All',
    redirect: '/404',
  },
];

console.log("🚀 ~ 路由定义页面 - 所有路由:", routes)

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
