<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="usuario"
                    :rules="validaciones.requerido"
                    prepend-icon="person"
                    name="usuario"
                    label="Usuario"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Contraseña"
                    type="password"
                    v-model="password"
                    :rules="validaciones.requerido"
                    @keyup.enter="login"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="noAutorizado" :color="'error'" :timeout="3000">{{mensajeError}}<v-btn dark flat @click="noAutorizado = false"> Cerrar </v-btn> </v-snackbar>
  </v-app>
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
      valid: false,
      noAutorizado: false,
      mensajeError: "",
      usuario: "",
      password: "",
      validaciones: {
        requerido: [v => !!v || "Campo requerido"]
      }
    };
  },

  methods: {
    login() {
      this.loading.show = true;
      services
        .login({
          usuario: this.usuario,
          password: this.password,
          origen: "frontend"
        })
        .then(response => {
          if (response.body.estado) {
            localStorage.setItem("token", response.body.token);
            this.loading.show = false;
            this.$router.push("/clientes");
          }else{
            this.loading.show = false;
            this.noAutorizado = true;
            this.mensajeError = response.body.mensaje;
            this.usuario = "";
            this.password = "";
          }
        });
    }
  }
};
</script>