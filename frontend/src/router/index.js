import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import trasactionList from '../components/Transaction/transactionList.vue';
import addTransaction from '../components/Transaction/addTransaction.vue';
import editTransaction from '../components/Transaction/editTransaction.vue';


const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/Transaction",
    name: "trasactionList",
    component: trasactionList,
  },
  {
    path: "/createTransaction",
    name: "addTransaction",
    component: addTransaction,
  },
  {
    path: "/editTransaction",
    name: "editTransaction",
    component: editTransaction,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;