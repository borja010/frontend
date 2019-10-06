<template>
  <v-app>
    <loading-component :loading="loading"></loading-component>
    <v-snackbar v-model="loading.error" :color="'error'">
      {{loading.mensaje}}
      <v-btn dark flat @click="loading.error = false">Cerrar</v-btn>
    </v-snackbar>
    <div v-if="login !== 'no-toolbar'">
      <v-toolbar app>
        <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase">
          <span>SIS</span>
          <span class="font-weight-light">TRAC</span>
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
            <v-btn flat router to="/vales">
              <v-icon left>assignment</v-icon>Vales
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
            <v-btn flat @click="cerrarSesion = true">Cerrar Sesion</v-btn>
            <v-btn flat router to="/configuraciones">
              <v-icon left>settings_applications</v-icon>
            </v-btn>
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
          <v-list-tile router to="/vales">
            <v-list-tile-action>
              <v-icon>assignment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Vales</v-list-tile-title>
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
          <v-list-tile @click="cerrarSesion = true">
            <v-list-tile-content>
              <v-list-tile-title>Cerrar Sesion</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router to="/configuraciones">
            <v-list-tile-action>
              <v-icon>settings_applications</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-content>
      <router-view :loading="loading"></router-view>
    </v-content>
    <v-layout row justify-center>
      <v-dialog v-model="cerrarSesion" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Sesion activa</v-card-title>
          <v-card-text>¿Desea cerrar sesion?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="cerrarSesion = false">No</v-btn>
            <v-btn color="primary" flat @click="logout">Si</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      cerrarSesion: false,
      loading: { show: false, error: false }
    };
  },

  computed: {
    login() {
      return this.$route.meta.layout ? this.$route.meta.layout : "toolbar";
    }
  },

  methods: {
    logout() {
      localStorage.token = "";
      this.$router.push("/");
      this.cerrarSesion = false;
    }
  }
};
</script>
