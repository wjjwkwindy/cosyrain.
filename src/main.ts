import { createApp } from 'vue';
import { createHead } from '@unhead/vue/client';
// import Antd from 'ant-design-vue';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import '@/styles/preflight.css';
import '@/styles/style.css';
import '@/styles/markdown.css';
import '@/styles/github-base.css';
import '@/styles/github-colors-light.css';
import '@/styles/github-markdown.css';
// import 'ant-design-vue/dist/reset.css';

import App from '@/App.vue';
import WrapperArticle from '@/views/WrapperArticle.vue';
import router from '@/routes/index';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.use(ArcoVueIcon);
// app.use(Antd);
app.component('WrapperArticle', WrapperArticle);

app.use(ArcoVue);

app.mount('#app');
