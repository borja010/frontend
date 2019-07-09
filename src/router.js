import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Empleados from './components/Empleados.vue';
import Creditos from './components/Creditos.vue';
import Clientes from './components/Clientes.vue';
import ReporteAnaloga from './components/reportes/ReporteAnaloga.vue';
import ReporteDigital from './components/reportes/ReporteDigital.vue';
import ReportePrecio from './components/reportes/ReportePrecio.vue';
import ReporteEntradaSalida from './components/reportes/ReporteEntradaSalida.vue';
import services from "./services";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'no-toolbar' },
      component: Login
    },
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: Clientes,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: Empleados,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/creditos',
      name: 'creditos',
      component: Creditos,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/reporte_digital',
      name: 'reporte_digital',
      component: ReporteDigital,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/reporte_analoga',
      name: 'reporte_analoga',
      component: ReporteAnaloga,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/reporte_precio',
      name: 'reporte_precio',
      component: ReportePrecio,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/reporte_entrada_salida',
      name: 'reporte_entrada_salida',
      component: ReporteEntradaSalida,
      meta: { requiereAutorizacion: true }
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiereAutorizacion)) {
    let aux = await estaAutorizado();
    if (!aux) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const estaAutorizado = () => {
  return new Promise((resolve) => {
    if (localStorage.token) {
      services.verificarUsuario({ token: localStorage.token }).then(response => {
        if (response.body.autorizado) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } else {
      resolve(false);
    }
  })
}

export default router;