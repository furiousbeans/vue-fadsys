<style>
thead tr > first-child th
  {background-color: #00b4ff}
</style>

<template>
    <q-page>
        <div class="q-pa-md">
            <br>
            <h5>SAOB</h5>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md" style="max-width: 100%">
            <q-card>
              <!-- active-color="white"
                active-bg-color="primary"
                indicator-color="white" -->
              <q-tabs
                v-model="tab"
                align="justify"
                indicator
                mobile-arrows
                outside-arrows
                :breakpoint="600"
              >
                <q-tab name="tab1" class="bg-amber-8 text-white" label="General Admission and Services"/>
                <q-tab name="tab2" class="bg-green-8 text-white" label="SPA - Grad Level" />
                <q-tab name="tab3" class="bg-cyan-6 text-white" label="SPA - Undergrad Level" />
                <q-tab name="tab4" class="bg-purple-6 text-white" label="S&T Education and Training" />
                <q-tab name="tab5" class="bg-indigo-6 text-white" label="RLIP" />
              </q-tabs>
      
              <q-separator />
      
              <q-tab-panels v-model="tab" animated >
                <q-tab-panel name="tab1" > 
                    <q-table flat bordered style="border-width: 2px;border-color:#ffa000;width: 100%; "
                      title="Treats"
                      :rows="rows"
                      :columns="columns"
                      row-key="name"
                    >

                      <template v-slot:header="props">
                        <q-tr :props="props">
                          <q-th auto-width />
                          <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                          >
                            {{ col.label }}
                          </q-th>
                        </q-tr>
                      </template>

                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td auto-width>
                            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                          </q-td>
                          <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                          >
                            {{ col.value }}
                          </q-td>
                        </q-tr>
                        <q-tr v-show="props.expand" :props="props">
                          <q-td colspan="100%">
                            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
                          </q-td>
                        </q-tr>
                      </template>
                      <!--  -->
                    </q-table>
                </q-tab-panel>
      
                <q-tab-panel name="tab2">
                    <q-table flat bordered style="border-width: 2px; border-color:#569f59;width: 100%; "
                          ref="tb1"
                          :columns="columns"
                          separator="cell"
                          hide-pagination
                          hide-bottom
                      >
                      </q-table>
                </q-tab-panel>
      
                <q-tab-panel name="tab3">
                    <q-table flat bordered style="border-width: 2px; border-color:#26c6da;width: 100%; "
                          ref="tb1"
                          :columns="columns"
                          separator="cell"
                          hide-pagination
                          hide-bottom
                      >
                      </q-table>
                </q-tab-panel>
      
                <q-tab-panel name="tab4">
                    <q-table flat bordered style="border-width: 2px; border-color:#ab47bc;width: 100%; "
                          ref="tb1"
                          :columns="columns"
                          separator="cell"
                          hide-pagination
                          hide-bottom
                      >
                      </q-table>
                </q-tab-panel>
                
                <q-tab-panel name="tab5">
                    <q-table flat bordered style="border-width: 2px; border-color:#5c6bc0;width: 100%; "
                          ref="tb1"
                          :columns="columns"
                          separator="cell"
                          hide-pagination
                          hide-bottom
                      >
                      </q-table>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
    </q-page>
  </template>

<!--  -->

<script setup>
    import { useQuasar } from "quasar";
    import { ref, onMounted, reactive, watch, computed, onBeforeUnmount } from "vue";
    import axios from "axios";
    import Swal from "sweetalert2";

    const $q = useQuasar();
    
    // tabs
    const tab = ref('tab1')

    const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'I. General Administration and Support',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

</script>
