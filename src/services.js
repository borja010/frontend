import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {

    direccion_ip:"https://www.gasolinera.mitalac.com",
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
    obtenerClientesSaldos(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerClientesSaldos/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTransaccionesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTransaccionesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTotalTransaccionesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerTotalTransaccionesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    guardarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/guardarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/frontend/obtenerUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    verificarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/seguro/verificarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    login(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/login/", parametros);
    },

};
