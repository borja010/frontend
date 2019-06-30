<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Clientes</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="deleting" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Eliminar cliente
          </v-card-title>

          <v-card-text>
            ¿Esta seguro que desea eliminar al cliente?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="eliminarCliente(false)">
              No
            </v-btn>
            <v-btn color="primary" flat @click="eliminarCliente(true)">
              Si
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details @change="reload()" @click:append-outer="reload()"></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Agregar cliente</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-form :key="form" v-model="valid">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-text-field v-model="cliente.nombres" :rules="validaciones.nombres" label="Nombres"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field v-model="cliente.apellidos" :rules="validaciones.apellidos" label="Apellidos"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md12>
                    <v-text-field v-model="cliente.dpi" :rules="validaciones.dpi" label="DPI"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field v-model="cliente.telefono" :rules="validaciones.telefonos" label="Telefono"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field v-model="cliente.celular" :rules="validaciones.telefonos" label="Celular"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field v-model="cliente.nit" :rules="validaciones.nit" label="Nit"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-select v-model="cliente.genero" :items="genero" :rules="validaciones.requerido" item-text="genero" item-value="codigo_genero" label="Genero"></v-select>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn v-if="clienteActivo == -1" color="blue darken-1" flat @click="save" :disabled="!valid">Guardar</v-btn>
            <v-btn v-else color="blue darken-1" flat @click="update">Modificar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="clientes" :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems" :total-items="totalClientes" @update:pagination="reload()" loading:="loading" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.nombres }}</td>
        <td>{{ props.item.apellidos }}</td>
        <td>{{ props.item.dpi }}</td>
        <td>{{ props.item.telefono }}</td>
        <td>{{ props.item.celular }}</td>
        <td>{{ props.item.nit }}</td>
        <td v-if="props.item.genero == 'm'">Hombre</td>
        <td v-else>Mujer</td>
        <td>
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="clienteActivo = props.item.codigo_cliente; deleting = true;">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        No ha datos
      </template>
    </v-data-table>
    <v-snackbar v-model="deleted" :color="'error'" :timeout="3000">El cliente se ha eliminado correctamente <v-btn dark flat @click="deleted = false"> Cerrar </v-btn> </v-snackbar>
    <v-snackbar v-model="updated" :color="'success'" :timeout="3000">El cliente se ha actualizado correctamente <v-btn dark flat @click="updated = false"> Cerrar </v-btn> </v-snackbar>
    <v-snackbar v-model="exist" :color="'error'" :timeout="3000">El cliente con dpi {{ this.cliente.dpi }} ya existe <v-btn dark flat @click="exist = false"> Cerrar </v-btn> </v-snackbar>
  </div>
</template>

<script>
import services from '../services';

  export default {
    data: () => ({
      form: 1,
      dialog: false,
      loading: true,
      valid: false,
      deleted: false,
      updated: false,
      exist: false,
      deleting: false,
      search: '',
      rowsPerPageItems: [5, 10, 15, 20],
      pagination: {
          page: 1,
          rowsPerPage: 5,
      },
      totalClientes: 0,
      headers: [
        {text: 'Nombres', value: 'nombres', sortable: false },
        { text: 'Apellidos', value: 'apellidos', sortable: false },
        { text: 'DPI', value: 'dpi', sortable: false },
        { text: 'Telefono', value: 'telefono', sortable: false },
        { text: 'Celular', value: 'celular', sortable: false },
        { text: 'Nit', value: 'nit', sortable: false },
        { text: 'Genero', value: 'genero', sortable: false },
        { text: 'Accion', value: 'accion', sortable: false }
      ],
      clientes: [],
      clienteActivo: -1,
      cliente: 
      {
        nombres: '',
        apellidos: '',
        apellido1: '',
        apellido2: '',
        dpi: '',
        telefono: '',
        celular: '',
        nit: '',
        genero: ''
      },
      genero:
      [
        {codigo_genero: 'm', genero: 'Masculino'}, 
        {codigo_genero: 'f', genero: 'Femenino'}
      ],
      validaciones:
      {
        nombres:[
          v => !!v || 'Campo requerido',
          v => (v && v.length < 100) || 'Campo no puede ser mayor a 100 caracteres'
        ],
        apellidos:[
          v => !!v || 'Campo requerido',
          v => (v && v.length < 100) || 'Campo no puede ser mayor a 100 caracteres'
        ],
        telefonos:[
          v => (v.length < 11 && /^([0-9]*)$/.test(v)) || 'Campo no puede ser mayor a 11 caracteres y solo pueden ser números'
        ],
        dpi:[
          v => !!v || 'Campo requerido',
          v => (v && v.length < 15 && /^([0-9]*)$/.test(v)) || 'Campo no puede ser mayor a 15 caracteres y solo pueden ser números'
        ],
        nit:[
          v => (v.length < 11 && /^([0-9]*)$/.test(v)) || 'Campo no puede ser mayor a 10 caracteres y solo pueden ser números'
        ],
        requerido:[
          v => !!v || 'Campo requerido'
        ]
      }

      
    }),

    computed: {
      formTitle () {
        return this.clienteActivo === -1 ? 'Nuevo cliente' : 'Editar cliente'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.reload();
      },

      reload(){
        let params = {busqueda: this.search, limit: this.pagination.rowsPerPage, offset: (this.pagination.page-1)*this.pagination.rowsPerPage};
        services.obtenerClientes(params).then(response =>{
          this.clientes = response.data;
          services.obtenerClientesTotal(params).then(response =>{
            this.totalClientes = Number(response.data[0].count);
            this.loading = false;
          }, errorResponse =>{
            console.error(errorResponse);
          });
        }, errorResponse =>{
          console.error(errorResponse);
        });
      },

      editItem (item) {
        this.clienteActivo = item.codigo_cliente;
        this.cliente = Object.assign({}, item);
        this.dialog = true
      },

      eliminarCliente(evt) {
        this.deleting = false;
        if(evt){
          services.eliminarCliente({codigo_cliente: this.clienteActivo}).then(response =>{
            this.eliminado = true;
            this.reload();
          }, errorResponse =>{
              console.error(errorResponse);
          });
        }else{
          this.reload();
        }
      },

      close() {
        this.dialog = false;
        this.resetearForm();
      },

      save () {
        let apellidos = this.cliente.apellidos.trim().split(' ');
        this.cliente.apellido1 = apellidos.shift();
        if(apellidos.length > 0){
          this.cliente.apellido2 = apellidos.pop();
        }
        services.insertarCliente(this.cliente).then(response =>{
          if(response.body[0].insertar_cliente == -1){
            this.exist = true;
          }else{
            this.close();
            this.reload();
          }
        }, errorResponse =>{
            console.error(errorResponse);
        });
      },

      update(){
        let apellidos = this.cliente.apellidos.trim().split(' ');
        this.cliente.apellido1 = apellidos.shift();
        if(apellidos.length > 0){
          this.cliente.apellido2 = apellidos.pop();
        }
        services.modificarCliente(this.cliente).then(response =>{
          if(response.body[0].modificar_cliente == -1){
            this.exist = true;
          }else{
            this.close();
            this.reload();
            this.updated = true;
          }
        }, errorResponse =>{
            console.error(errorResponse);
        });
      },

      resetearForm(){
        this.clienteActivo = -1;
        this.form++;
        this.cliente.nombres = '';
        this.cliente.apellidos = '';
        this.cliente.apellido1 = '';
        this.cliente.apellido2 = '';
        this.cliente.dpi = '';
        this.cliente.telefono = '';
        this.cliente.celular = '';
        this.cliente.nit = '';
        this.cliente.genero = '';
      }
    }
  }
</script>