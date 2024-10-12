import { createRouter, createWebHistory } from 'vue-router';
import TaskManager from '@/views/TaskManager.vue';
import TaskCreate from '@/views/TaskCreate.vue';
import TaskEdit from '@/views/TaskEdit.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TaskManager,
  },
  {
    path: '/tasks',
    name: 'TaskManager',
    component: TaskManager,
  },
  {
    path: '/tasks/create',
    name: 'TaskCreate',
    component: TaskCreate,
  },
  {
    path: '/tasks/edit/:id',
    name: 'TaskEdit',
    component: TaskEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;