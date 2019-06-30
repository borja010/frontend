import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Empleados from './components/Empleados.vue';
import Creditos from './components/Creditos.vue';
import Clientes from './components/Clientes.vue';
import ReporteAnaloga from './components/reportes/ReporteAnaloga.vue';
import ReporteDigital from './components/reportes/ReporteDigital.vue';
import ReportePrecio from './components/reportes/ReportePrecio.vue';
import ReporteEntradaSalida from './components/reportes/ReporteEntradaSalida.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'no-toolbar'},
      component: Login
    },
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: Empleados
    },
    {
      path: '/creditos',
      name: 'creditos',
      component: Creditos
    },
    {
      path: '/reporte_digital',
      name: 'reporte_digital',
      component: ReporteDigital
    },
    {
      path: '/reporte_analoga',
      name: 'reporte_analoga',
      component: ReporteAnaloga
    },
    {
      path: '/reporte_precio',
      name: 'reporte_precio',
      component: ReportePrecio
    },
    {
      path: '/reporte_entrada_salida',
      name: 'reporte_entrada_salida',
      component: ReporteEntradaSalida
    }
  ]
});
