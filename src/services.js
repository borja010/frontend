import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {

    direccion_ip: "https://www.gasolinera.mitalac.com",
    obtenerClientesMovil() {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerClientesMovil/", {}, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerClientes(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerClientes/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerClientesTotal(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerClientesTotal/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/insertarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    modificarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/modificarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/eliminarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerEmpleados(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerEmpleados/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerEmpleadosTotal(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerEmpleadosTotal/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/insertarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    modificarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/modificarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/eliminarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerTipoEmpleado() {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTipoEmpleado/", {}, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerMangueras() {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerMangueras/", {}, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerAnalogasFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerAnalogasFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerDigitalesFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerDigitalesFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerPrecioFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerPrecioFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerEntradaSalidaFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerEntradaSalidaFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerVales(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerVales/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerPagos(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerPagos/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTotalPagos(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTotalPagos/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerValesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerValesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTotalValesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTotalValesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    guardarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/guardarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTipoCombustible(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTipoCombustible/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarTipoEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/eliminarTipoEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarManguera(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/eliminarManguera/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarTipoCombustible(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/eliminarTipoCombustible/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarTipoEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/insertarTipoEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarManguera(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/insertarManguera/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarTipoCombustible(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/insertarTipoCombustible/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    verificarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/verificarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    login(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/login/", parametros);
    },

};
