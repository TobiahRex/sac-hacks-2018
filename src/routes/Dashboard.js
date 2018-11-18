// import Splash from '../views/Splash/main';
// import Splash from '../views/Splash/main';
import Title from '../views/Title/Title';
import Crud from '../views/Crud/Crud';
import Sankey from '../views/Sankey';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Title
  },
  {
    path: '/crud',
    name: 'Crud',
    component: Crud
  },
  {

    path: '/sankey',
    name: 'Sankey',
    component: Sankey,

  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    name: 'Dashboard',
    component: Title
  }
];

export default dashboardRoutes;
