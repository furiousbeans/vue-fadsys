<template>
    <br>
    <div class="q-pa-md">
        <q-card flat bordered>
            <q-card-section horizontal>
                <q-card-section class="col">
                <div  class="row">
                    <div class="text-h6 col-11">Projects / LIB's</div>
                </div>
                <br>
                <q-card  flat bordered>
                    <q-list bordered>
                        <q-expansion-item
                            group="somegroup"
                            label="FAD"
                            default-opened
                            header-class="text-body1 text-weight-bold"
                        >
                            <q-card flat bordered>
                                <q-card-section>
                                    <q-table
                                    ref="tableFAD"
                                    :rows="rowsFAD"
                                    :columns="columns"
                                    hide-pagination
                                    hide-bottom
                                    >
                                    <template v-slot:body-cell-actionbutton="props">
                                    <q-td :props="props">
                                        <q-btn
                                        dense
                                        round
                                        flat
                                        color="primary"
                                        icon="visibility"
                                        >
                                        <!-- @click="viewPrjLIB(props);" -->
                                            <q-tooltip>
                                                View Details
                                            </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                    </template>
                                    </q-table>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-separator />

                        <q-expansion-item 
                            group="somegroup"
                            label="OD / ODD"
                            header-class="text-body1 text-weight-bold">
                            <q-card flat bordered>
                                <q-card-section>
                                    <q-table
                                    ref="tableOD"
                                    :rows="rowsOD"
                                    :columns="columns"
                                    hide-pagination
                                    hide-bottom
                                    >
                                    <template v-slot:body-cell-actionbutton="props">
                                    <q-td :props="props">
                                        <q-btn
                                        dense
                                        round
                                        flat
                                        color="primary"
                                        icon="visibility"
                                        >
                                        <!-- @click="viewPrjLIB(props);" -->
                                            <q-tooltip>
                                                View Details
                                            </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                    </template>
                                    </q-table>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-separator />

                        <q-expansion-item 
                            group="somegroup"
                            label="SEID"
                            header-class="text-body1 text-weight-bold">
                            <q-card flat bordered>
                                <q-card-section>
                                    <q-table
                                    ref="tableSEID"
                                    :rows="rowsSEID"
                                    :columns="columns"
                                    :pagination="pagination"
                                    hide-pagination
                                    hide-bottom
                                    >
                                    <template v-slot:body-cell-actionbutton="props">
                                    <q-td :props="props">
                                        <q-btn
                                        dense
                                        round
                                        flat
                                        color="primary"
                                        icon="visibility"
                                        >
                                        <!-- @click="viewPrjLIB(props);" -->
                                            <q-tooltip>
                                                View Details
                                            </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                    </template>
                                    </q-table>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-separator />

                        <q-expansion-item 
                            group="somegroup"
                            label="STMERPD"
                            header-class="text-body1 text-weight-bold">
                            <q-card flat bordered>
                                <q-card-section>
                                    <q-table
                                    ref="tableSTMERPD"
                                    :rows="rowsSTMERPD"
                                    :columns="columns"
                                    :pagination="pagination"
                                    hide-pagination
                                    hide-bottom
                                    >
                                    <template v-slot:body-cell-actionbutton="props">
                                    <q-td :props="props">
                                        <q-btn
                                        dense
                                        round
                                        flat
                                        color="primary"
                                        icon="visibility"
                                        >
                                        <!-- @click="viewPrjLIB(props);" -->
                                            <q-tooltip>
                                                View Details
                                            </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                    </template>
                                    </q-table>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        

                        <q-separator />
                        <!--  -->
                        <q-expansion-item 
                            group="somegroup"
                            label="STSD"
                            header-class="text-body1 text-weight-bold">
                            <q-card flat bordered>
                                <q-card-section>
                                    <q-table
                                    ref="tableSTSD"
                                    :rows="rowsSTSD"
                                    :columns="columns"
                                    :pagination="pagination"
                                    hide-pagination
                                    hide-bottom
                                    >
                                    <template v-slot:body-cell-actionbutton="props">
                                    <q-td :props="props">
                                        <q-btn
                                        dense
                                        round
                                        flat
                                        color="primary"
                                        icon="visibility"
                                        >
                                        <!-- @click="viewPrjLIB(props);" -->
                                            <q-tooltip>
                                                View Details
                                            </q-tooltip>
                                        </q-btn>
                                    </q-td>
                                    </template>
                                    </q-table>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>
                </q-card>
                </q-card-section>
            <q-img
                class="bg-dblue" style="width: 50px;"
            />
            </q-card-section>
        </q-card>
    </div>
</template>


<script setup>
    import { useQuasar } from "quasar";
    import { ref, onMounted, reactive, watch, computed, onBeforeUnmount } from "vue";
    import axios from "axios";
    import Swal from "sweetalert2";

    const $q = useQuasar();
    const peso = { style: 'currency', currency: 'PHP' };

    const tableFAD = ref();
    const rowsFAD = ref([]);
    const tableOD = ref();
    const rowsOD = ref([]);
    const tableSEID = ref();
    const rowsSEID = ref([]);
    const tableSTMERPD = ref();
    const rowsSTMERPD = ref([]);
    const tableSTSD = ref();
    const rowsSTSD = ref([]);
    
    const pagination = ref({
      rowsPerPage: 20
    });

    const columns = [
    {
        name: "prj_code",
        label: "Project Code",
        field: "prj_code",
        align: "left",
        sortable: true,
    },
    {
        name: "prj_title",
        label: "Project Title",
        field: "prj_title",
        align: "left",
        sortable: true,
    },
    {
        name: "prj_fund",
        label: "Fund Source",
        field: "prj_fund",
        align: "left",
        sortable: true,
    },
    // {
    //     name: "amount",
    //     label: "Net Amount",
    //     field: "amount",
    //     align: "right",
    //     sortable: true,
    //     format: Intl.NumberFormat('en-US', peso).format
    // },
    { name: "actionbutton", label: "Actions", field: "", align: "center" },
    ];
    
    onMounted(() => {
        viewFADPrj();
        viewODPrj();
        viewSEIDPrj();
        viewSTMERPDPrj();
        viewSTSDPrj();
    });
    
    const viewFADPrj = () => {
        axios
        .get("http://localhost/backend/select.php?readProjectFAD")
        .then(function (response) {
            rowsFAD.value = response.data;
        });
    };
    
    const viewODPrj = () => {
        axios
        .get("http://localhost/backend/select.php?readProjectOD")
        .then(function (response) {
            rowsOD.value = response.data;
        });
    };
    
    const viewSEIDPrj = () => {
        axios
        .get("http://localhost/backend/select.php?readProjectSEID")
        .then(function (response) {
            rowsSEID.value = response.data;
        });
    };
    
    const viewSTMERPDPrj = () => {
        axios
        .get("http://localhost/backend/select.php?readProjectSTMERPD")
        .then(function (response) {
            rowsSTMERPD.value = response.data;
        });
    };
    
    const viewSTSDPrj = () => {
        axios
        .get("http://localhost/backend/select.php?readProjectSTSD")
        .then(function (response) {
            rowsSTSD.value = response.data;
        });
    };

</script>