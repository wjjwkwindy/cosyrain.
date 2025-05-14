import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import MainLayout from '@/views/MainLayout.vue';

// 读取所有的 markdown 文件
const markdownFiles = import.meta.glob('../../pages/blogs/*.md', {
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
const routes = [
  {
    path: '/',
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
        name: 'Photo Composition',
        meta: {
          icon: 'IconFileImage',
          bg: 'tool-bg1.png'
        },
        component: () => import('../../pages/tools/Img.vue'),
      },
      // Blogs
      {
        path: '/posts',
        name: 'PostsView',
        component: () => import('@/views/PostsView.vue'),
      },
      ...markdownRoutes,
    ],
  },
  {
    path: '/404',
    component: NotFoundView,
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

console.log(routes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
