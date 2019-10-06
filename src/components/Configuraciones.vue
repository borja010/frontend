<template>
  <div>
    <v-container>
      <v-layout wrap row>
        <v-flex xs12>
          <v-tabs centered color="transparent">
            <v-tab>Tipo empleado</v-tab>
            <v-tab>Tipo combustible</v-tab>
            <v-tab>Mangueras</v-tab>
            <v-tabs-items>
              <v-tab-item>
                <v-layout wrap row>
                  <v-flex xs12></v-flex>
                </v-layout>
              </v-tab-item>
              <v-tab-item>
                <v-layout wrap row>
                  <v-flex xs12></v-flex>
                </v-layout>
              </v-tab-item>
              <v-tab-item>
                <v-layout wrap row>
                  <v-flex xs12></v-flex>
                </v-layout>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import services from "../services";

export default {
  data: () => ({}),

  methods: {}
};
</script>