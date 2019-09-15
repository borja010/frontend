<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Vales</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs1 sm1></v-flex>
      <v-flex xs11 sm2>
        <v-select v-model="estado" :items="estados" label="Seleccione estado"></v-select>
      </v-flex>
      <v-flex xs6 sm2>
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
      <v-flex xs6 sm2>
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
      <v-flex xs12 sm2>
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
      <v-flex xs11 sm2>
        <v-btn color="primary" dark class="mb-2" @click="loadReport()">Cargar Reporte</v-btn>
      </v-flex>
      <v-flex xs1 sm1></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="vales"
          :pagination.sync="pagination"
          :rows-per-page-items="rowsPerPageItems"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.numero_v }}</td>
            <td>{{ props.item.descripcion_v }}</td>
            <td>{{ props.item.estado_v }}</td>
            <td>{{ props.item.monto_v }}</td>
            <td>{{ props.item.fecha_v.substr(0, 10) }}</td>
            <td>{{ props.item.hora_v.substr(0, 8) }}</td>
            <td>{{ props.item.nombres_cliente_v }}</td>
            <td>{{ props.item.nombres_empleado_v }}</td>
            <td>
              <v-icon small class="mr-2" @click="openPayments(props.item)">input</v-icon>
            </td>
          </template>
          <template v-slot:no-data>No hay datos</template>
          <template v-slot:no-results>No hay datos</template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="payments" max-width="600">
      <v-card>
        <v-card-title class="headline">Pagos</v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headersPagos"
            :items="pagos"
            :pagination.sync="paginationPagos"
            :rows-per-page-items="rowsPerPageItems"
            :total-items="totalPagos"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.descripcion }}</td>
              <td>{{ props.item.monto }}</td>
              <td>{{ props.item.fecha_v.substr(0, 10) }}</td>
              <td>{{ props.item.hora_v.substr(0, 8) }}</td>
              <td>{{ props.item.nombres_empleado }}</td>
            </template>
            <template v-slot:no-data>No hay datos</template>
            <template v-slot:no-results>No hay datos</template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat="flat" @click="payments = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      modalInitialDate: false,
      modalFinalDate: false,
      modalMonth: false,
      payments: false,
      today: new Date(),
      finalDate: "",
      initialDate: "",
      month: "",
      estados: ["Pendiente", "Parcial", "Pagado"],
      estado: "Pendiente",
      headers: [
        { text: "Número de vale", value: "numero_v", sortable: false },
        { text: "Descripción", value: "descripcion_v", sortable: false },
        { text: "Estado", value: "estado_v", sortable: false },
        { text: "Monto", value: "monto_v", sortable: false },
        { text: "Fecha", value: "fecha_v", sortable: false },
        { text: "Hora", value: "hora_v", sortable: false },
        { text: "Cliente", value: "nombres_cliente_v", sortable: false },
        { text: "Empleado", value: "nombres_empleado_v", sortable: false },
        { text: "Accion", value: "accion", sortable: false }
      ],
      rowsPerPageItems: [5, 10, 15, 20],
      pagination: {
        page: 1,
        rowsPerPage: 5
      },
      vales: [],
      headersPagos: [
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Monto", value: "monto", sortable: false },
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Hora", value: "hora", sortable: false },
        { text: "Empleado", value: "nombres_empleado", sortable: false }
      ],
      paginationPagos: {
        page: 1,
        rowsPerPage: 5
      },
      pagos: [],
      totalPagos: 0
    };
  },

  computed: {},

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
        estado: this.estado
      };
      this.loading.show = true;
      services.obtenerVales(params).then(response => {
        this.vales = response.data;
        this.loading.show = false;
      });
    },

    loadMonth(month) {
      let aux = month.split("-");
      let tempDate = new Date(aux[0], aux[1], 0);
      this.initialDate = month + "-01";
      this.finalDate = tempDate.toISOString().substr(0, 10);
      this.$refs.dialogMonth.save(month);
    },

    openPayments(item) {
      let params = {
        codigo_vale: item.codigo_vale_v,
        limit: this.paginationPagos.rowsPerPage,
        offset:
          (this.paginationPagos.page - 1) * this.paginationPagos.rowsPerPage
      };
      this.loading.show = true;
      services.obtenerPagos(params).then(response => {
        this.pagos = response.data;
        services.obtenerTotalPagos(params).then(response => {
          this.totalPagos = Number(response.data[0].count);
          this.loading.show = false;
          this.payments = true;
        });
      });
    }
  }
};
</script>
<style lang="scss">
</style>