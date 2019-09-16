<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Empleados</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="deleting" persistent width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Eliminar empleado</v-card-title>

          <v-card-text>¿Esta seguro que desea eliminar al empleado?</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="eliminarEmpleado(false)">No</v-btn>
            <v-btn color="primary" flat @click="eliminarEmpleado(true)">Si</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar"
        single-line
        hide-details
        @change="reload()"
        @click:append-outer="reload()"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Agregar empleado</v-btn>
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
                    <v-text-field
                      v-model="empleado.nombres"
                      :rules="validaciones.nombres"
                      label="Nombres"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="empleado.apellidos"
                      :rules="validaciones.apellidos"
                      label="Apellidos"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md12>
                    <v-text-field v-model="empleado.dpi" :rules="validaciones.dpi" label="DPI"></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="empleado.telefono"
                      :rules="validaciones.telefonos"
                      label="Telefono"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="empleado.celular"
                      :rules="validaciones.telefonos"
                      label="Celular"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-select
                      v-model="empleado.genero"
                      :items="genero"
                      :rules="validaciones.requerido"
                      item-text="genero"
                      item-value="codigo_genero"
                      label="Genero"
                    ></v-select>
                  </v-flex>

                  <v-flex xs12 md6>
                    <v-select
                      v-model="empleado.tipoEmpleado"
                      :items="tipoEmpleado"
                      :rules="validaciones.requerido"
                      item-text="descripcion"
                      item-value="codigo_tipo_empleado"
                      label="Tipo empleado"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn
              v-if="empleadoActivo == -1"
              color="blue darken-1"
              flat
              @click="save"
              :disabled="!valid"
            >Guardar</v-btn>
            <v-btn v-else color="blue darken-1" flat @click="update">Modificar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="account" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Crear acceso</span>
          </v-card-title>

          <v-card-text>
            <v-form :key="cuentaForm" v-model="valid">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select
                      @change="cargarUsuario"
                      v-model="cuenta.tipoAcceso"
                      :items="tipoAcceso"
                      :rules="validaciones.requerido"
                      item-text="descripcion"
                      item-value="valor"
                      label="Tipo acceso"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="cuenta.usuario"
                      :rules="validaciones.nombres"
                      label="Usuario"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="cuenta.password"
                      type="password"
                      :rules="validaciones.apellidos"
                      label="Contraseña"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      v-model="cuenta.validar"
                      type="password"
                      :rules="validaciones.apellidos"
                      label="Validar contraseña"
                      @blur="validarContrasena"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeAccount">Cancelar</v-btn>
            <v-btn
              color="blue darken-1"
              flat
              @click="saveAccount"
              :disabled="iguales || !valid"
            >Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="empleados"
      :pagination.sync="pagination"
      :rows-per-page-items="rowsPerPageItems"
      :total-items="totalEmpleados"
      @update:pagination="reload()"
      :loading="load"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.nombres }}</td>
        <td>{{ props.item.apellidos }}</td>
        <td>{{ props.item.tipo_empleado }}</td>
        <td>{{ props.item.dpi }}</td>
        <td>{{ props.item.telefono }}</td>
        <td>{{ props.item.celular }}</td>
        <td v-if="props.item.genero == 'm'">Hombre</td>
        <td v-else>Mujer</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="editItem(props.item)" v-on="on">edit</v-icon>
            </template>
            <span>Editar empleado</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon
                small
                @click="empleadoActivo = props.item.codigo_empleado; deleting = true;"
                v-on="on"
              >delete</v-icon>
            </template>
            <span>Eliminar empleado</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small class="mr-2" @click="editAccount(props.item)" v-on="on">account_box</v-icon>
            </template>
            <span>Generar accesos</span>
          </v-tooltip>
        </td>
      </template>
      <template v-slot:no-data>No hay datos</template>
      <template v-slot:no-results>No hay datos</template>
    </v-data-table>
    <v-snackbar v-model="deleted" :color="'error'" :timeout="3000">
      El empleado se ha eliminado correctamente
      <v-btn dark flat @click="deleted = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar v-model="updated" :color="'success'" :timeout="3000">
      El empleado se ha actualizado correctamente
      <v-btn dark flat @click="updated = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar v-model="exist" :color="'error'" :timeout="3000">
      El empleado con dpi {{ empleado.dpi }} ya existe
      <v-btn dark flat @click="exist = false">Cerrar</v-btn>
    </v-snackbar>
    <v-snackbar v-model="iguales" :color="'error'">Las contraseñas no son iguales</v-snackbar>
    <v-snackbar v-model="creado" :color="'success'">
      El Usuario se ha actualizado exitosamente
      <v-btn dark flat @click="creado = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import services from "../services";

export default {
  props: {
    loading: {
      show: Boolean
    }
  },
  data: () => ({
    form: 1,
    cuentaForm: 1,
    dialog: false,
    load: true,
    valid: false,
    deleted: false,
    updated: false,
    exist: false,
    deleting: false,
    account: false,
    iguales: false,
    creado: false,
    search: "",
    rowsPerPageItems: [5, 10, 15, 20],
    pagination: {
      page: 1,
      rowsPerPage: 5
    },
    totalEmpleados: 0,
    headers: [
      { text: "Nombres", value: "nombres", sortable: false },
      { text: "Apellidos", value: "apellidos", sortable: false },
      { text: "Tipo empleado", value: "tipo_empleado", sortable: false },
      { text: "DPI", value: "dpi", sortable: false },
      { text: "Telefono", value: "telefono", sortable: false },
      { text: "Celular", value: "celular", sortable: false },
      { text: "Genero", value: "genero", sortable: false },
      { text: "Accion", value: "accion", sortable: false }
    ],
    empleados: [],
    empleadoActivo: -1,
    cuenta: {
      codigoUsuario: "",
      usuario: "",
      password: "",
      validar: "",
      tipoAcceso: ""
    },
    tipoAcceso: [
      { valor: "admin", descripcion: "Administrador" },
      { valor: "supervisor", descripcion: "Supervisor" }
    ],
    empleado: {
      nombres: "",
      apellido1: "",
      apellido2: "",
      apellidos: "",
      tipoEmpleado: "",
      dpi: "",
      telefono: "",
      celular: "",
      genero: ""
    },
    genero: [
      { codigo_genero: "m", genero: "Masculino" },
      { codigo_genero: "f", genero: "Femenino" }
    ],
    tipoEmpleado: [],
    validaciones: {
      nombres: [
        v => !!v || "Campo requerido",
        v =>
          (v && v.length < 100) || "Campo no puede ser mayor a 100 caracteres"
      ],
      apellidos: [
        v => !!v || "Campo requerido",
        v =>
          (v && v.length < 100) || "Campo no puede ser mayor a 100 caracteres"
      ],
      telefonos: [
        v =>
          (v.length < 11 && /^([0-9]*)$/.test(v)) ||
          "Campo no puede ser mayor a 11 caracteres y solo pueden ser números"
      ],
      dpi: [
        v => !!v || "Campo requerido",
        v =>
          (v && v.length < 15 && /^([0-9]*)$/.test(v)) ||
          "Campo no puede ser mayor a 15 caracteres y solo pueden ser números"
      ],
      requerido: [v => !!v || "Campo requerido"]
    }
  }),

  computed: {
    formTitle() {
      return this.empleadoActivo === -1 ? "Nuevo empleado" : "Editar empleado";
    },
    validate() {
      return true;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.reload();
    },

    reload() {
      this.loading.show = true;
      services.obtenerTipoEmpleado().then(response => {
        this.tipoEmpleado = response.data;
        this.loading.show = false;
      });
      let params = {
        busqueda: this.search,
        limit: this.pagination.rowsPerPage,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage
      };
      services.obtenerEmpleados(params).then(response => {
        this.empleados = response.data;
        services.obtenerEmpleadosTotal(params).then(response => {
          this.totalEmpleados = Number(response.data[0].count);
          this.load = false;
        });
      });
    },

    editAccount(item) {
      this.empleadoActivo = item.codigo_empleado;
      this.account = true;
    },

    cargarUsuario() {
      this.loading.show = true;
      services
        .obtenerUsuario({
          codigoUsuario: this.empleadoActivo,
          tipoAcceso: this.cuenta.tipoAcceso
        })
        .then(response => {
          if (response.body.estado === 1) {
            this.cuenta.usuario = response.body.usuario;
          }
          this.loading.show = false;
        });
    },

    validarContrasena() {
      if (this.cuenta.password === this.cuenta.validar) {
        this.iguales = false;
      } else {
        this.iguales = true;
      }
    },

    saveAccount() {
      this.loading.show = true;
      this.cuenta.codigoUsuario = this.empleadoActivo;
      services.guardarUsuario(this.cuenta).then(response => {
        if (response.body.estado === 1) {
          this.creado = true;
          this.account = false;
          this.resetearCuenta();
        } else if (response.body.estado === 2) {
          this.loading.mensaje = response.body.mensaje;
          this.loading.error = true;
        } else {
          this.loading.mensaje = "Error al procesar la transaccion";
          this.loading.error = true;
        }
        this.loading.show = false;
      });
    },

    editItem(item) {
      this.empleadoActivo = item.codigo_empleado;
      this.empleado = Object.assign({}, item);
      this.empleado.tipoEmpleado = this.tipoEmpleado.find(
        x => x.descripcion === item.tipo_empleado
      ).codigo_tipo_empleado;
      this.dialog = true;
    },

    eliminarEmpleado(evt) {
      this.deleting = false;
      if (evt) {
        services
          .eliminarEmpleado({ codigo_empleado: this.empleadoActivo })
          .then(response => {
            this.eliminado = true;
            this.reload();
          });
      } else {
        this.reload();
      }
      this.empleadoActivo = -1;
    },

    close() {
      this.dialog = false;
      this.resetearForm();
    },

    closeAccount() {
      this.account = false;
      this.resetearCuenta();
    },

    save() {
      let apellidos = this.empleado.apellidos.trim().split(" ");
      this.empleado.apellido1 = apellidos.shift();
      if (apellidos.length > 0) {
        this.empleado.apellido2 = apellidos.pop();
      }
      services.insertarEmpleado(this.empleado).then(response => {
        if (response.body[0].insertar_empleado == -1) {
          this.exist = true;
        } else {
          this.close();
          this.reload();
        }
      });
    },

    update() {
      let apellidos = this.empleado.apellidos.trim().split(" ");
      this.empleado.apellido1 = apellidos.shift();
      if (apellidos.length > 0) {
        this.empleado.apellido2 = apellidos.pop();
      }
      services.modificarEmpleado(this.empleado).then(response => {
        if (response.body[0].modificar_empleado == -1) {
          this.exist = true;
        } else {
          this.close();
          this.reload();
          this.updated = true;
        }
      });
    },

    resetearForm() {
      this.form++;
      this.empleadoActivo = -1;
      this.empleado.nombres = "";
      this.empleado.apellidos = "";
      this.empleado.apellido1 = "";
      this.empleado.apellido2 = "";
      this.empleado.tipo_empleado = "";
      this.empleado.dpi = "";
      this.empleado.telefono = "";
      this.empleado.celular = "";
      this.empleado.genero = "";
    },

    resetearCuenta() {
      this.cuentaForm++, (this.empleadoActivo = -1);
      (this.cuenta.usuario = ""),
        (this.cuenta.password = ""),
        (this.cuenta.validar = ""),
        (this.cuenta.tipoAcceso = "");
    }
  }
};
</script>