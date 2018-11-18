// import Title from '../views/Title/Title';
import Splash from '../layouts/Splash/main.js';
// import Cryptos from '../views/Cryptos/Cryptos';
import Crud from '../views/Crud/Crud';
// import Sunburst from '../views/Sunburst';
import Sankey from '../views/Sankey';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Splash
  },
  // {
  //   path: '/cryptos',
  //   name: 'Cryptos',
  //   component: Cryptos
  // },
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
