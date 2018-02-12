import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '@/dal';
import HelloWorld from '@/components/HelloWorld';
import SignUp from '@/components/SignUp';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp,
      props: { firebaseAuth: auth },
    },
  ],
});
