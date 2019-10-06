import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Politica from './components/Politica.vue';
import Empleados from './components/Empleados.vue';
import Vales from './components/Vales.vue';
import Clientes from './components/Clientes.vue';
import Configuraciones from './components/Configuraciones.vue';
import ReporteAnaloga from './components/reportes/ReporteAnaloga.vue';
import ReporteDigital from './components/reportes/ReporteDigital.vue';
import ReportePrecio from './components/reportes/ReportePrecio.vue';
import ReporteEntradaSalida from './components/reportes/ReporteEntradaSalida.vue';
import services from "./services";

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      meta: { layout: 'no-toolbar' },
      component: Login
    },
    {
      path: '/politica-privacidad',
      name: '',
      meta: { layout: 'no-toolbar' },
      component: Politica
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
      path: '/vales',
      name: 'vales',
      component: Vales,
      meta: { requiereAutorizacion: true }
    },
    {
      path: '/configuraciones',
      name: 'configuraciones',
      component: Configuraciones,
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
    },
    {
      path: '*',
      redirect: "/empleados"
    }
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiereAutorizacion)) {
    let aux = await estaAutorizado();
    if (!aux) {
      next({
        path: '',
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