import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {

    direccion_ip: "http://localhost:8080",
    obtenerClientes(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerClientes/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerClientesTotal(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerClientesTotal/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/insertarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    modificarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/modificarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/eliminarCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerEmpleados(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerEmpleados/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerEmpleadosTotal(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerEmpleadosTotal/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    insertarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/insertarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    modificarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/modificarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    eliminarEmpleado(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/eliminarEmpleado/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerTipoEmpleado() {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerTipoEmpleado/", {}, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerMangueras() {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerMangueras/", {}, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },

    obtenerAnalogasFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerAnalogasFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerDigitalesFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerDigitalesFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerPrecioFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerPrecioFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerEntradaSalidaFechas(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerEntradaSalidaFechas/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerClientesSaldos(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerClientesSaldos/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTransaccionesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerTransaccionesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    obtenerTotalTransaccionesCliente(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/obtenerTotalTransaccionesCliente/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    guardarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/frontend/guardarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    verificarUsuario(parametros) {
        return Vue.http.post(this.direccion_ip + "/api/verificarUsuario/", parametros, { headers: { authorization: 'Bearer ' + localStorage.token } });
    },
    login(parametros) {
        return Vue.http.post(this.direccion_ip + "/login/", parametros);
    },

};