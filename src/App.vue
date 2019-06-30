<template>
  <v-app>
    <div v-if="login !== 'no-toolbar'">
      <loading-component :loading="loading"></loading-component>
      <v-toolbar app>
        <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase">
          <router-link to="/" tag="span" style="cursor: pointer">
            <span>SIS</span>
            <span class="font-weight-light">TRAC</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <v-toolbar-items class="hidden-xs-only">
            <v-btn flat router to="/empleados">
              <v-icon left>people</v-icon>Empleados
            </v-btn>
            <v-btn flat router to="/clientes">
              <v-icon left>face</v-icon>Clientes
            </v-btn>
            <v-btn flat router to="/creditos">
              <v-icon left>local_atm</v-icon>Creditos
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn flat v-on="on">
                  <v-icon left>trending_up</v-icon>Reportes
                </v-btn>
              </template>
              <v-list>
                <v-list-tile router to="/reporte_digital">
                  <v-list-tile-title>Reporte Digital</v-list-tile-title>
                </v-list-tile>
                <v-list-tile router to="reporte_analoga">
                  <v-list-tile-title>Reporte Analoga</v-list-tile-title>
                </v-list-tile>
                <v-list-tile router to="reporte_precio">
                  <v-list-tile-title>Reporte Precio</v-list-tile-title>
                </v-list-tile>
                <v-list-tile router to="reporte_entrada_salida">
                  <v-list-tile-title>Reporte Entradas y Salidas</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </template>
      </v-toolbar>
      <v-navigation-drawer app v-model="sideNav" disable-resize-watcher temporary>
        <v-list>
          <v-list-tile router to="/empleados">
            <v-list-tile-action>
              <v-icon>people</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Empleados</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router to="/clientes">
            <v-list-tile-action>
              <v-icon>face</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Clientes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router to="/creditos">
            <v-list-tile-action>
              <v-icon>local_atm</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Creditos</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="reports = !reports">
            <v-list-tile-action>
              <v-icon>trending_up</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Reportes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list v-if="reports">
            <v-list-tile router to="/reporte_digital">
              <v-list-tile-title>Reporte Digital</v-list-tile-title>
            </v-list-tile>
            <v-list-tile router to="reporte_analoga">
              <v-list-tile-title>Reporte Analoga</v-list-tile-title>
            </v-list-tile>
            <v-list-tile router to="reporte_precio">
              <v-list-tile-title>Reporte Precio</v-list-tile-title>
            </v-list-tile>
            <v-list-tile router to="reporte_entrada_salida">
              <v-list-tile-title>Reporte Entradas y Salidas</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-content>
      <router-view :loading="loading"></router-view>
    </v-content>
  </v-app>
</template>
<script>
import LoadingComponent from "./components/LoadingComponent";

export default {
  name: "App",
  components: { LoadingComponent },
  data() {
    return {
      sideNav: false,
      reports: false,
      loading: { show: false }
    };
  },

  computed:{
    login(){
      return this.$route.meta.layout ? this.$route.meta.layout : 'toolbar';
    }
  }
};
</script>
