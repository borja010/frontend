import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default{
    
    direccion_ip: "http://localhost:8080",
    obtenerClientes(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerClientes/", parametros);
    },
    obtenerClientesTotal(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerClientesTotal/", parametros);
    },
    insertarCliente(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/insertarCliente/", parametros);
    },
    modificarCliente(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/modificarCliente/", parametros);
    },
    eliminarCliente(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/eliminarCliente/", parametros);
    },

    obtenerEmpleados(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerEmpleados/", parametros);
    },
    obtenerEmpleadosTotal(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerEmpleadosTotal/", parametros);
    },
    insertarEmpleado(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/insertarEmpleado/", parametros);
    },
    modificarEmpleado(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/modificarEmpleado/", parametros);
    },
    eliminarEmpleado(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/eliminarEmpleado/", parametros);
    },

    obtenerTipoEmpleado(){
        return Vue.http.post(this.direccion_ip+"/api/obtenerTipoEmpleado/");
    },
    obtenerTotalBombaManguera(){
        return Vue.http.post(this.direccion_ip+"/api/obtenerTotalBombaManguera/");
    },

    obtenerAnalogasFechas(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerAnalogasFechas/", parametros);
    },
    obtenerDigitalesFechas(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerDigitalesFechas/", parametros);
    },
    obtenerPrecioFechas(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerPrecioFechas/", parametros);
    },
    obtenerEntradaSalidaFechas(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerEntradaSalidaFechas/", parametros);
    },
    obtenerClientesSaldos(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerClientesSaldos/", parametros);
    },
    obtenerTransaccionesCliente(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerTransaccionesCliente/", parametros);
    },
    obtenerTotalTransaccionesCliente(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/obtenerTotalTransaccionesCliente/", parametros);
    },
    login(parametros){
        return Vue.http.post(this.direccion_ip+"/api/frontend/login/", parametros);
    }

};