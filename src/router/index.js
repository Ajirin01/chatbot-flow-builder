import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import ChatBuilder from "../components/ChatBuilder.vue"
import ConversationFlow from '@/views/ConversationFlow.vue';
import ChatFlowView from '@/views/ChatFlowView.vue';
import FabricTest from '@/components/FabricTest.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ConversationFlow
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/chat/:id',
    name: 'ChatFlow',
    component: ChatFlowView
  },
  {
    path: '/fabric',
    name: 'fabric',
    component: FabricTest
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
