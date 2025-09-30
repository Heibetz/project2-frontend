import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: '/',
    name: 'courses',
    component: () => import('./views/CoursesList.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;