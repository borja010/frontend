<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Creditos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs6 sm3>
        <v-dialog
          ref="dialogInitial"
          v-model="modalInitialDate"
          :return-value.sync="initialDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="initialDate"
              label="Fecha inicial"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="initialDate" locale="es" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalInitialDate = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogInitial.save(initialDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs6 sm3>
        <v-dialog
          ref="dialogFinal"
          v-model="modalFinalDate"
          :return-value.sync="finalDate"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="finalDate"
              label="Fecha final"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="finalDate" locale="es" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalFinalDate = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogFinal.save(finalDate)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm3>
        <v-dialog
          ref="dialogMonth"
          v-model="modalMonth"
          :return-value.sync="month"
          persistent
          lazy
          full-width
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="month" label="Mes" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="month" type="month" locale="es" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalMonth = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="loadMonth(month)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm3>
        <v-btn color="primary" dark class="mb-2" @click="loadReport()">Cargar Reporte</v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="totalClientes != 0" row wrap>
      <v-flex xs1 md4>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex xs10 md4>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
          @change="loadReport()"
          @click:append-outer="loadReport()"
        ></v-text-field>
      </v-flex>
      <v-flex xs1 md4>
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="cliente of clientes" :key="cliente.codigo_cliente" xs12 md3>
        <v-card color="primary" class="tarjeta-cliente" hover tile dark>
          <v-card-title>
            <v-icon large left>account_circle</v-icon>
            {{cliente.nombres + ' ' + cliente.apellidos}}
          </v-card-title>
          <v-card-text>
            DPI: {{cliente.dpi}}
            <br>
            Celular: {{cliente.celular}}
          </v-card-text>
          <v-card-actions>
            <v-btn
              depressed
              small
              light
              @click="loadTransactions(cliente.codigo_cliente)"
            >Ver transacciones</v-btn>
            <v-layout align-center justify-end>
              Saldo: {{cliente.saldo}}
              <v-btn v-if="cliente.saldo>=0" flat icon>
                <v-icon>check</v-icon>
              </v-btn>
              <v-btn v-else flat icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex v-if="totalClientes != 0" xs12 class="text-xs-center">
        <v-pagination v-model="pagination.page" :length="totalPagination"></v-pagination>
      </v-flex>
      <v-dialog v-model="dialog" persistent width="700">
        <v-card>
          <v-card-title>Transacciones</v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="transaccionesClientes" :pagination.sync="paginationTransacciones" :rows-per-page-items="rowsPerPageItemsTransacciones" :total-items="totalTransacciones" loading:="loading" class="elevation-1">
              <template v-slot:items="props">
                <td>{{ props.item.descripcion }}</td>
                <td>{{ props.item.fecha.substr(0, 10) }}</td>
                <td>{{ props.item.hora.substr(0, 8) }}</td>
                <td v-if="props.item.tipo_transaccion == 'c'">Credito</td>
                <td v-else>Pago</td>
                <td>{{ props.item.monto }}</td>
              </template>
              <template v-slot:no-data>
                No hay datos
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-layout align-center justify-end>
              <v-btn color="primary" @click="dialog=false">Aceptar</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
  data() {
    return {
      pagination: {
        page: 1,
        rowsPerPage: 12
      },
      modalInitialDate: false,
      modalFinalDate: false,
      modalMonth: false,
      today: new Date(),
      finalDate: "",
      initialDate: "",
      month: "",
      clientes: [],
      totalClientes: 0,
      search: "",
      transaccionesClientes: [],
      totalTransacciones: 0,
      rowsPerPageItemsTransacciones: [5, 10, 15, 20],
      paginationTransacciones: {
        page: 1,
        rowsPerPage: 5
      },
      headers: [
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Hora", value: "hora", sortable: false },
        { text: "Tipo transacción", value: "tipoTransaccion", sortable: false },
        { text: "monto", value: "monto", sortable: false }
      ],
      dialog: false
    };
  },

  computed: {
    allPumps() {
      return this.pumps.length === this.availablePumps.length;
    },

    somePumps() {
      return this.pumps.length > 0 && !this.allPumps;
    },

    icon() {
      if (this.allPumps) return "close";
      if (this.somePumps) return "indeterminate_check_box";
      return "check_box_outline_blank";
    },

    totalPagination() {
      return Math.ceil(this.totalClientes / this.pagination.rowsPerPage);
    }
  },

  watch: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.month = this.today.toISOString().substr(0, 7);
      this.finalDate = this.today.toISOString().substr(0, 10);
      this.initialDate = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        1
      )
        .toISOString()
        .substr(0, 10);
    },

    loadReport() {
      let params = {
        fecha_inicio: this.initialDate,
        fecha_final: this.finalDate,
        busqueda: this.search,
        limit: this.pagination.rowsPerPage,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage
      };
      this.loading.show = true;
      services.obtenerClientesSaldos(params).then(
        response => {
          this.clientes = response.data;
          services.obtenerClientesTotal(params).then(
            response => {
              this.totalClientes = Number(response.data[0].count);
              this.loading.show = false;
            },
            errorResponse => {
              console.error(errorResponse);
            }
          );
        },
        errorResponse => {
          console.error(errorResponse);
        }
      );
    },

    loadTransactions(codigo_cliente) {
      let params = {
        codigo_cliente: codigo_cliente,
        fecha_inicio: this.initialDate,
        fecha_final: this.finalDate,
        busqueda: this.search,
        limit: this.pagination.rowsPerPage,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage
      };
      this.loading.show = true;
      services.obtenerTransaccionesCliente(params).then(
        response => {
          this.transaccionesClientes = response.data;
          services.obtenerTotalTransaccionesCliente(params).then(
            response => {
              this.totalTransacciones = Number(response.data[0].count);
              this.loading.show = false;
              this.dialog = true;
            },
            errorResponse => {
              console.error(errorResponse);
            }
          );
        },
        errorResponse => {
          console.error(errorResponse);
        }
      );
    },

    toggle() {
      this.$nextTick(() => {
        if (this.allPumps) {
          this.pumps = [];
        } else {
          this.pumps = this.availablePumps.slice();
        }
      });
    },

    loadMonth(month) {
      let aux = month.split("-");
      let tempDate = new Date(aux[0], aux[1], 0);
      this.initialDate = month + "-01";
      this.finalDate = tempDate.toISOString().substr(0, 10);
      this.$refs.dialogMonth.save(month);
    }
  }
};
</script>
<style lang="scss">
.tarjeta-cliente {
  margin: 5%;
}
</style>