import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';

const Routes = [
    {
        path: '/',
        sidebarName: 'Home',
        component: Home
    },
    {
        path: '/about',
        sidebarName: 'About',
        component: About
    }
];

export default Routes;