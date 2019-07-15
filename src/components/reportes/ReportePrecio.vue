<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Reporte Precio</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex xs12 sm1></v-flex>
      <v-flex xs12 sm2>
        <v-select
          v-model="pumps"
          :items="availablePumps"
          item-text="descripcion" 
          item-value="codigo_manguera"
          :menu-props="{ maxHeight: '400' }"
          label="Seleccione las mangueras"
          multiple
        >
        <template v-slot:prepend-item>
            <v-list-tile
            ripple
            @click="toggle"
            >
            <v-list-tile-action>
                <v-icon :color="pumps.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Seleccionar todos</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
            <v-divider class="mt-2"></v-divider>
        </template>
        </v-select>
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
      <v-flex xs12 sm2>
        <v-btn color="primary" dark class="mb-2" @click="loadReport()">Cargar Reporte</v-btn>
      </v-flex>
      <v-flex xs12 sm1></v-flex>
    </v-layout>
    <v-layout row wrap>
    <v-flex xs12>
      <v-data-table :headers="headers" :items="precios" :pagination.sync="pagination" :rows-per-page-items="rowsPerPageItems" loading:="loading" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.fecha_precio.substr(0, 10) }}</td>
          <td>{{ props.item.manguera_precio }}</td>
          <td>{{ props.item.tipo_combustible_precio }}</td>
          <td>{{ props.item.precio_unitario_digital }}</td>
          <td>{{ props.item.precio_unitario_mecanica }}</td>
          <td>
            <v-btn v-if="props.item.correcto" flat icon>
              <v-icon>check</v-icon>
            </v-btn>
            <v-btn v-else flat icon>
              <v-icon>close</v-icon>
            </v-btn>
          </td>
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
      pumps: [],
      availablePumps: [],
      headers: [
          {text: 'Fecha', value: 'fecha', sortable: false },
          { text: 'Manguera', value: 'Manguera', sortable: false },
          { text: 'Tipo combustible', value: 'tipoCombustible', sortable: false },
          { text: 'Precio digital', value: 'precioDigital', sortable: false },
          { text: 'Precio mecanica', value: 'precioMecanica', sortable: false },
          { text: 'Correcto', value: 'correcto', sortable: true },
        ],
      precios: []
    }
  },

  computed: {
    allPumps() {
      return this.pumps.length === this.availablePumps.length
    },

    somePumps() {
      return this.pumps.length > 0 && !this.allPumps
    },

    icon () {
      if (this.allPumps) return 'close'
      if (this.somePumps) return 'indeterminate_check_box'
      return 'check_box_outline_blank'
    },

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
      this.reload();
    },

    reload() {
      services.obtenerMangueras().then(
        response => {
          this.availablePumps = response.data;
          this.fillPumps();
        });
    },

    loadReport() {
      let params = {
        fecha_inicio: this.initialDate,
        fecha_final: this.finalDate,
        mangueras: this.pumps
      };
      this.loading.show = true;
      services.obtenerPrecioFechas(params).then(
        response => {
            this.precios = response.data;
            this.loading.show = false;
        });
    },

    toggle () {
      this.$nextTick(() => {
        if (this.allPumps) {
          this.pumps = [];
        } else {
          this.fillPumps();
        }
      })
    },

    fillPumps(){
      for(let p of this.availablePumps){
        this.pumps.push(p.codigo_manguera);
      }
    },

    loadMonth(month){
      let aux = month.split('-');
      let tempDate = new Date(aux[0], aux[1], 0);
      this.initialDate = month +'-01';
      this.finalDate = tempDate.toISOString().substr(0, 10);
      this.$refs.dialogMonth.save(month);
    },
  }
};
</script>