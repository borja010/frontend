
<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Por favor espere, estamos actualizando la información
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["loading"],
  computed: {
      show(){
          return this.loading.show;
      }
  }
};
</script>
