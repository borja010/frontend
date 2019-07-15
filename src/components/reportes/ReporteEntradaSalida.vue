<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Reporte Entradas y Salidas</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 sm1></v-flex>
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
      <v-flex xs12 sm2>
        <v-btn color="primary" dark class="mb-2" @click="loadReport()">Cargar Reporte</v-btn>
      </v-flex>
      <v-flex xs12 sm1></v-flex>
    </v-layout>
    <v-layout row wrap>
    <v-flex xs12>
      <v-data-table :headers="headers" :items="entradaSalidas" :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems" loading:="loading" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.codigo_empleado }}</td>
          <td>{{ props.item.nombres }}</td>
          <td>{{ props.item.apellidos }}</td>
          <td>{{ props.item.fecha_transaccion.substr(0, 10) }}</td>
          <td>{{ props.item.hora_entrada }}</td>
          <td>{{ props.item.hora_salida }}</td>
          <td>{{ returnTime(props.item.total_horas) }}</td>
        </template>
        <template v-slot:no-data>
          No hay datos
        </template>
      </v-data-table>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
import services from "../../services";

export default {
  props:{
    loading: {
      show: Boolean
    }
  },
  data () {
    return{
      rowsPerPageItems: [5, 10, 15, 20],
      pagination: {
          page: 1,
          rowsPerPage: 5,
      },
      modalInitialDate: false,
      modalFinalDate: false,
      modalMonth: false,
      today: new Date(),
      finalDate: "",
      initialDate: "",
      month: "",
      headers: [
          {text: 'Codigo Empleado', value: 'codigo_empleado', sortable: false },
          { text: 'Nombres', value: 'nombres', sortable: false },
          { text: 'Apellidos', value: 'apellidos', sortable: false },
          { text: 'Fecha', value: 'fecha_transaccion', sortable: false },
          { text: 'Entrada', value: 'hora_entrada', sortable: false },
          { text: 'Salida', value: 'hora_salida', sortable: false },
          { text: 'Horas', value: 'total_horas', sortable: false },
        ],
      entradaSalidas: []
    }
  },

  computed: {

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
        fecha_final: this.finalDate
      };
      this.loading.show = true;
      services.obtenerEntradaSalidaFechas(params).then(
        response => {
            this.entradaSalidas = response.data;
            this.loading.show = false;
        });
    },

    loadMonth(month){
      let aux = month.split('-');
      let tempDate = new Date(aux[0], aux[1], 0);
      this.initialDate = month +'-01';
      this.finalDate = tempDate.toISOString().substr(0, 10);
      this.$refs.dialogMonth.save(month);
    },

    returnTime(value){
      if(value.minutes){
        return value.hours + ":" + value.minutes;
      }else{
        return value.hours + ":00";
      }
    }
  }
};
</script>