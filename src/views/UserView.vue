<style>
.bg-brand {
  background: #3080ac !important;
}
.bg-dblue {
  background: #2b6d90 !important;
}
</style>

<template>
    <br>
    <div class="q-pa-md" id="orsForm"  style="display:none;">
    <!-- <div class="q-pa-md" id="orsForm"  style="display:block;"> -->
      <form id="orsdetails" @submit.prevent="addnewORS">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
            <q-card-section class="col">
              <div  class="row">
                  <div class="text-h6 col-11">Enter ORS Details</div>
                  <div class="col-1">
                      <q-btn @click="hideORSForm()" icon="close" style="float:right; font-size: 12px; color:#0091ea;" flat dense v-close-popup >Cancel</q-btn>
                  </div>
              </div>
              <br>
              <q-card  flat bordered style="border-color: #35a135;">

                  <q-card-section>
                    <div class="col-12" style="color: #0091ea;">Payee details</div>
                    <div class="q-pa-x-md row">
                      <div class="q-pa-sm col-6">
                        <q-select
                        autofocus
                        use-input
                        fill-input
                        hide-selected
                        input-debounce="0"
                        @filter="filterFn"
                        v-model="selectedPayee"
                        :options="itemoptions"
                        label="Payee Name"
                        map-options
                        required
                        >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                        </q-select>
                      </div>
                      <div class="q-pa-sm col-6">
                        <q-input 
                        label="Account Number"
                        v-model:model-value="selectedPayee.payeeacctnum"
                        required
                        readonly
                        disabled
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="q-pa-x-md row">
                      <div class="q-pa-sm col-6">
                        <q-input 
                        label="Bank Branch"
                        required
                        v-model:model-value="selectedPayee.payeeaddr"
                        readonly
                        disabled
                        >
                        </q-input>
                      </div>
                      <div class="q-pa-sm col-6">
                        <q-input 
                        label="TIN"
                        v-model="state.orstin"
                        >
                        </q-input>
                      </div>
                    </div>
                    <div class="q-pa-x-md row">
                      <div class="q-pa-sm col-12">
                        <q-input 
                        label="Address"
                        v-model="state.address"
                        >
                        </q-input>
                      </div>
                    </div>
                    <!-- <input type="text" v-model="selectedPayee.value" id="selpayee"> -->
                    <input type="text" v-model="selectedPayee.value" id="selpayee" hidden>

                    <br>
                    <br>
                    <!--  -->
                    <div class="col-12" style="color: #0091ea;">Projects / Particulars</div>
                    <div class="q-pa-x-md row" v-for="(row, index) in appendRow" :key="index">
                        <div class="q-pa-sm col-5"> 
                            <q-input :name="`data[${index}]prj`" label="Particulars" required v-model="row.particstxt"></q-input>
                        </div>
                            <q-input :name="`data[${index}]uacs`" label="UACS" required v-model="row.uacstxt" hidden></q-input>
                        <div class="q-pa-sm col-2"> 
                          <q-select
                          autofocus
                          use-input
                          fill-input
                          hide-selected
                          input-debounce="0"
                          @filter="filterFnUACS"
                          v-model="row.uacsselect"
                          :options="itemoptionsUACS"
                          :name="`data[${index}]uacsselect`"
                          label="UACS"
                          map-options
                          required
                          >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          </q-select>
                        </div>
                          <q-input :name="`data[${index}]mfo`" label="UACS" required v-model="row.mfotxt" hidden></q-input>
                        <div class="q-pa-sm col-2"> 
                          <q-select
                          autofocus
                          use-input
                          fill-input
                          hide-selected
                          input-debounce="0"
                          @filter="filterFnPrj"
                          v-model="row.prjselect"
                          :options="itemoptionsPrj"
                          :name="`data[${index}]prjselect`"
                          label="MFO/PAP"
                          map-options
                          required
                          >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          </q-select>
                        </div>
                        <div class="q-pa-sm col-2"> 
                            <q-input :name="`data[${index}]amount`" label="Amount" required v-model="row.amounttxt" type="number" step="0.01"></q-input>
                        </div>
                        <div class="q-pa-sm col"> 
                          <div class="q-pa-sm items-center">
                            <q-btn  v-if="canAdd(index)" @click="addNewItem()" padding="5px 5px" flat  color="secondary" style="margin-right: 1px;" icon="add">
                            <!-- <q-btn @click="addNewItem()" unelevated  color="secondary" style="width:40px; margin-right: 5px;" icon="add"> -->
                              <q-tooltip>
                                Add row
                              </q-tooltip>
                            </q-btn>
                            <q-btn  v-if="canDelete(index)" @click="deleteItem(index)" padding="5px 5px" flat  color="negative" style="margin-left:1px" icon="delete">
                              <q-tooltip>
                                Delete Row
                              </q-tooltip>
                            </q-btn>
                          </div> 
                        </div>
                    </div>

                    <br>

                    <div class="q-pa-x-md row">
                        <div class="col-9">
                            <q-input 
                            label="Additional details"
                            v-model="state.orsdetails"
                            placeholder="Payment for..."
                            >
                            </q-input>
                        </div>
                        <div class="col-1"></div>
                        <div class="col-2">
                            <q-item-label>Select tax</q-item-label>
                            <q-checkbox 
                              v-model="tax2chk" 
                              label="2%"
                              true-value="2"
                              false-value="0"
                            />
                            <q-checkbox 
                              v-model="tax5chk" 
                              label="5%"
                              true-value="5"
                              false-value="0"
                            />
                        </div>
                    </div>

                    <div class="q-pa-lg row">
                      <div class="col-3"></div>
                      <div class="col">
                          <q-btn type="submit" color="primary" name="addnewORS" style="width: 100%;">
                          Save ORS
                          </q-btn>
                          <!-- <q-btn type="submit" color="primary" name="addnewORS" @click="submit()" style="width: 100%;">
                          Save ORS
                          </q-btn> -->
                      </div>
                      <div class="col-3"></div>
                    </div>

                  </q-card-section>
              </q-card>
            </q-card-section>
          <q-img
            class="bg-dblue" style="width: 50px;"
          />
        </q-card-section>
      </q-card>
      </form>
    </div>

    <div class="q-pa-md" v-show="isVisible2" id="orsTable">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
            <q-card-section class="col">
              <div  class="row">
                  <div class="text-h6 col">User Created ORS</div>
                  <div class="col">
                      <q-btn label="Add New ORS" style="margin-left: 12px;float:right;" color="primary" @click="showORSForm()" />
                  </div>
              </div>
              <br>
              <q-card  flat bordered style="border-color: #bebebe;">
                    <q-table
                      ref="tableRef"
                      :rows="rows"
                      :columns="columns"
                      row-key="id"
                      :loading="loading"
                      :filter="filter"
                      v-model:selected="selected"
                      :pagination="pagination"
                      virtual-scroll
                    >

                      <!-- Start of Search Bar -->
                      <template v-slot:top-right>
                        <q-input
                          rounded
                          outlined
                          dense
                          debounce="300"
                          v-model="filter"
                          placeholder="Search"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </template>
                      <!-- End of Search Bar -->

                      <template v-slot:body-cell-actionbutton="props">
                        <q-td :props="props">
                          
                                  
                                <q-btn
                                dense
                                flat
                                color="positive"
                                icon="visibility"
                                @click="viewORSmodal(props);"
                                >
                                    <q-tooltip>
                                        View Details
                                    </q-tooltip>
                                </q-btn>
                                <q-btn-dropdown 
                                    auto-close 
                                    dense
                                    flat
                                    icon="print"
                                    color="primary"
                                >  
                                    <q-list>
                                        <q-item dense>
                                              <q-btn
                                                dense
                                                flat
                                                icon="print"
                                                color="primary"
                                                @click="signmodal(props)"
                                              >
                                              &nbsp;&nbsp;ORS
                                              </q-btn>
                                        </q-item>
                                        <q-item dense>
                                              <q-btn
                                                dense
                                                flat
                                                icon="print"
                                                color="green-8"
                                                @click="signburs(props)"
                                              >
                                              &nbsp;&nbsp;BURS
                                              </q-btn>
                                        </q-item>
                                        <q-item dense>
                                              <q-btn
                                                dense
                                                flat
                                                icon="print"
                                                color="deep-orange-13"
                                                @click="printDV(props)"
                                              >
                                              &nbsp;&nbsp;DV
                                              </q-btn>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown> 
                                <q-btn
                                  dense
                                  flat
                                  color="red"
                                  @click="deleteRow(props)"
                                  icon="delete"
                                  v-if="props.row.isapproved == 'Pending'"
                                >
                                  <q-tooltip>
                                      Delete record
                                  </q-tooltip>
                                </q-btn>   
                                <q-btn
                                  dense
                                  flat
                                  color="gray"
                                  icon="delete"
                                  disabled
                                  v-else
                                >
                                </q-btn>   
                        </q-td>
                      </template>
                    </q-table>
              </q-card>
            </q-card-section>
            <q-img
              class="bg-dblue" style="width: 50px;"
            />
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Do you want to delete this item?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" v-close-popup />
          <q-btn flat label="Confirm" color="cyan-13" @click="deleteORS" />
          <!-- {{ currentprops }} -->
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="signatoriesmodal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Set ORS signatory</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="state.signame" label="Name"  />
          <q-input v-model="state.sigposition" label="Position"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn type="submit" name="sigform" dense flat color="primary" label="Print ORS" @click="printfunc()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

<q-dialog v-model="bursmodal" persistent>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Set BURS signatory</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input v-model="state.signame" label="Name"  />
      <q-input v-model="state.sigposition" label="Position"  />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn type="submit" name="sigform" dense flat color="primary" label="Print BURS" @click="printbursfunc()" />
    </q-card-actions>
  </q-card>
</q-dialog>


    <!-- View ORS Data Modal -->
    <q-dialog v-model="viewORSdetails">
        <q-card style="width: 850px; max-width: 80vw;">
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">ORS Details</div>
                <q-space />
                <q-btn icon="close" flat dense v-close-popup />
            </q-card-section>
            <br>
            <hr style="background-color:#4f87e1">
            <q-card-section>
                <div class="row">
                    <div class="col-2">
                        <q-img
                            class="bg-primary" src="../assets/img/moneeyy2.jpg" style="width: 100%;height: 100%;"
                        />
                    </div>
                    <div class="col-1"> </div>
                    <div class="col-8">
                        <br>  
                        <table style="font-size: 1.1em;">
                            <tr>
                                <td class="text-primary" style="width: 180px;"><b>Reference #:</b></td>
                                <td>{{ currentprops.row.ors_random }}</td>
                            </tr>
                            <tr>
                                <td class="text-primary">Payee Name</td>
                                <td>{{ displayname }}</td>
                            </tr>
                            <tr>
                                <td class="text-primary">Bank Branch</td>
                                <td>{{ displaybank }}</td>
                            </tr>
                            <tr>
                                <td class="text-primary">Account Number</td>
                                <td>{{ displayacct }}</td>
                            </tr>
                            <tr>
                                <td class="text-primary">ORS Number</td>
                                <td>
                                    <span v-if="displayorsnum !== null">{{ displayorsnum }}</span>
                                    <span v-else class="text-warning">Pending ORS Number</span>
                                    <!-- <q-input v-model="state.aprvORStxt" label="Enter ORS Number" v-else ></q-input> -->
                                </td>
                            </tr>
                        </table>
                        <br><hr><br>
                        <!-- {{ displaystatus }} -->
                        <div class="row">
                            <div class="col-4 border-right">
                                <label class="text-primary">UACS Code</label>
                                <div style="font-size: 1.1em;">
                                    <div v-for="item in modalorspayee" :key="item.id">
                                        &ensp;&#x2022;&ensp;&nbsp;{{ item.uacs }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 border-right">
                                <label class="text-primary">MFO / PAP</label>
                                <div style="font-size: 1.1em;">
                                    <div v-for="item in modalorspayee" :key="item.id">
                                        &ensp;&#x2022;&ensp;&nbsp;{{ item.mfopap }}
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <label class="text-primary">Amount</label>
                                <div style="font-size: 1.1em;">
                                    <div v-for="item in modalorspayee" :key="item.id">
                                        &ensp;&#x2022;&ensp;&nbsp;{{ Number(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br><hr><br>
                        <table style="font-size: 1.1em;">
                            <tr>
                                <td class="text-primary" style="width: 180px;"><b>Additional Details</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="2">{{ displaypartics }}</td>
                            </tr>
                        </table>
                        <br><br>
                    </div>
                    <div class="col-1"> </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>

</template>

<script setup>
  import { useQuasar } from "quasar";
  import { ref, onMounted, reactive, watch, computed } from "vue";
  import axios from "axios";
  import Swal from "sweetalert2";
  const $q = useQuasar();
  

  // SESSION variabs
  // #############################################################################################
  const fname = localStorage.getItem('fname');
  const username = localStorage.getItem('username');
  const userdiv = localStorage.getItem('userdiv');
  // #############################################################################################
  // SESSION variabs



  // Show ORS Form Functions
  // #############################################################################################
  const isVisible2 = (true);
  
  const showORSForm = () => {
      document.getElementById('orsForm').style.display = "block";
      document.getElementById('orsTable').style.display = "none";
      clearText();
  };
  const hideORSForm = () => {
      document.getElementById('orsForm').style.display = "none";
      document.getElementById('orsTable').style.display = "block";
      clearText();
  };  
  // #############################################################################################
  // Show ORS Form Functions



  // Append Row Functions
  // #############################################################################################
  const selectedPayee = ref("");
  const state = reactive({
      amount: "",
      orstin: "",
      address: "",
      orsdetails: "",
      signame: "",
      sigposition: "",
      tax2inp: "",
      tax5inp: ""
  });  

  const canDelete = (index) => index > 0;
  const canAdd = (index) => index < 4;
  const appendRow = ref([{ particstxt: '', uacstxt: '', uacsselect: '', prjselect: '', mfotxt: '', amounttxt: '' }]);
  const addNewItem = () => {
      if (appendRow.value.length < 5) {
          appendRow.value.push({ particstxt: '', uacstxt: '', uacsselect: '', prjselect: '', mfotxt: '', amounttxt: '' });
      }
  };

  const deleteItem = (index) => {
      if (index !== 0) {
          appendRow.value.splice(index, 1);
      }
  };

  const resetItem = () => {
      appendRow.value = [{ particstxt: '', uacstxt: '', uacsselect: '', prjselect: '', mfotxt: '', amounttxt: '' }];
  };

  
  watch(appendRow, (newVal) => {
      newVal.forEach(row => {
          row.uacstxt = row.uacsselect.label;
          row.mfotxt = row.prjselect.label;
      });
  }, { deep: true });

  watch(appendRow, (newVal) => {
      newVal.forEach(row => {
          row.selectUACS && (row.uacstxt = row.selectUACS);
      });
  }, { deep: true });
  // #############################################################################################
  // Append Row Functions


  // ORS Table Functions
  // #############################################################################################
  const columns = [
    {
      name: "ors_random",
      label: "Ref. #",
      field: "ors_random",
      align: "left",
      sortable: true,
    },
    {
      name: "ors_number",
      label: "ORS Number",
      field: "ors_number",
      align: "left",
      sortable: true,
    },
    {
      name: "payeeName",
      label: "Payee Name",
      field: "payeename",
      align: "left",
      sortable: true,
    },
    {
      name: "amount",
      label: "Net Amount",
      field: "amount",
      align: "right",
      sortable: true,
      format: Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format
    },
    {
      name: "particulars",
      label: "Particulars",
      field: "particulars",
      align: "left",
      sortable: true,
    },
    {
      name: "uacs",
      label: "UACS Code",
      field: "uacs",
      align: "left",
      sortable: true,
    },
    {
      name: "uacs",
      label: "MFO / PAP",
      field: "mfopap",
      align: "left",
      sortable: true,
    },
    {
      name: "datecreated",
      label: "Date Created",
      field: "datecreated",
      align: "left",
      sortable: true,
    },
    {
      name: "isapproved",
      label: "Status",
      field: "isapproved",
      align: "left",
      sortable: true,
    },
    { name: "actionbutton", label: "Actions", field: "", align: "center" },
  ];

  const viewORSdetails = ref(false);
  const tableRef = ref();
  const rows = ref([]);
  const filter = ref("");
  const loading = ref(false);
  const selected = ref([]);
  const confirmDelete = ref(false);
  const signatoriesmodal = ref(false);
  const bursmodal = ref(false);
  
  const pagination = ref({
    rowsPerPage: 20
  });


  const tax2chk = ref("0");
  const tax5chk = ref("0");
  // #############################################################################################
  // ORS Table Functions

  
  // Get selected row props value
  // #############################################################################################
  const currentprops = ref();
  // #############################################################################################
  // Get selected row props value

  
    
  // Delete Table Row
  // #############################################################################################
  const deleteRow = (props) => {
      confirmDelete.value = true;
      currentprops.value = props;
  };
  const deleteORS = () => {
      confirmDelete.value = false;
      // console.log(currentprops.value.row.ors_random);
      var formData = new FormData();
      formData.append("orsrefnum", currentprops.value.row.ors_random);
      axios
          .post("http://localhost/backend/delete.php?deleteORS", formData)
          .then(function (response) {
            if((response.data == true)){
              swalDeleteSuccess();
              viewORS();
            }
            else{
              swalError();
            }
      });

  };
  // #############################################################################################
  // Delete Table Row



  // Print Signatories Modal and Functions
  // #############################################################################################
  const signmodal = (props) => {
    signatoriesmodal.value = true;
    currentprops.value = props;
  };
  
  const signburs = (props) => {
    bursmodal.value = true;
    currentprops.value = props;
  };

  const printfunc = () => {
    print();
  };
  const printbursfunc = () => {;
    printburs();
  };
  
  const print = () => {
    var formData = new FormData();
    formData.append("id", currentprops.value.row.ors_random);
    formData.append("signame", state.signame);
    formData.append("sigposition", state.sigposition);
    axios
      .post("http://localhost/backend/printors.php?printORS", formData, {responseType: 'arraybuffer'})
      .then(function (response){
        var file = new Blob([response.data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        clearText();
        window.open(fileURL);
        signatoriesmodal.value = false;
      })
  };

  const printburs = () => {
    var formData = new FormData();
    formData.append("id", currentprops.value.row.ors_random);
    formData.append("signame", state.signame);
    formData.append("sigposition", state.sigposition);
    axios
      .post("http://localhost/backend/printburs.php?printBURS", formData, {responseType: 'arraybuffer'})
      .then(function (response){
        var file = new Blob([response.data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        clearText();
        window.open(fileURL);
        signatoriesmodal.value = false;
      })
  };

  const printDV = (props) => {
      currentprops.value = props;
      var formData = new FormData();
      formData.append("id", currentprops.value.row.ors_random);
      axios
          .post("http://localhost/backend/printDV.php?printDV", formData, {responseType: 'arraybuffer'})
          .then(function (response){
              var file = new Blob([response.data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              clearText();
              window.open(fileURL);
              signatoriesmodal.value = false;
        })
  };
  // #############################################################################################
  // Print Signatories Modal and Functions



  // Q-Select Filter Functions
  // #############################################################################################
  var stringOptions = ref([]);
  var stringOptionsUACS = ref([]);
  var stringOptionsPrj = ref([]);
  const itemoptions = ref([stringOptions]);
  const itemoptionsUACS = ref([stringOptionsUACS]);
  const itemoptionsPrj = ref([stringOptionsPrj]);

  const filterFn = (val, update) => {
      if (val === "") {
          update(() => {
              itemoptions.value = stringOptions;
          });
          return;
      }

      update(() => {
          const needle = val.toLowerCase();
          itemoptions.value = stringOptions.filter(
              (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
      });
  };


  const filterFnUACS = (val, update) => {
      if (val === "") {
          update(() => {
              itemoptionsUACS.value = stringOptionsUACS;
          });
          return;
      }

      update(() => {
          const needle = val.toLowerCase();
          itemoptionsUACS.value = stringOptionsUACS.filter(
              (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
      });
  };

  const filterFnPrj = (val, update) => {
      if (val === "") {
          update(() => {
              itemoptionsPrj.value = stringOptionsPrj;
          });
          return;
      }

      update(() => {
        const needle = val.toLowerCase();
        itemoptionsPrj.value = stringOptionsPrj.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
  };
  // #############################################################################################
  // Q-Select Filter Functions




  // SWAL
  // #############################################################################################
  const swalSuccess = () => {
      Swal.fire({
          title: 'Success!',
          text: 'ORS has added to database',
          icon: 'success',
          confirmButtonText: 'Close'
      });
  };

  const swalError = () => {
      Swal.fire({
          title: 'Error!',
          text: 'Something went wrong, please try again',
          icon: 'error',
          confirmButtonText: 'Close'
      });
  };
  
  const swalDeleteSuccess = () => {
      Swal.fire({
          title: 'Success!',
          text: 'ORS has been removed',
          icon: 'success',
          confirmButtonText: 'Close'
      });
  };

  // #############################################################################################
  // SWAL



  // Query Mount Values
  // #############################################################################################
  onMounted(() => {
      viewORS();
      viewPayee();
      viewUACS();
      viewProject();
  });
  // #############################################################################################
  // Query Mount Values




  // Backend Queries
  // #############################################################################################

  // view all ORS
  const viewORS = () => {
    var formData = new FormData();
    formData.append("uname", username);
    axios
      .post("http://localhost/backend/select.php?readORSdiv", formData)
      .then(function (response) {
        rows.value = response.data;
      });
  };

  // view payee list
  const viewPayee = () => {
    axios
      .get("http://localhost/backend/select.php?readPayee")
      .then(function (response) {
        stringOptions = response.data;
    });
  };

  // view MFOPAP
  const viewProject = () => {
    axios
      .get("http://localhost/backend/select.php?readProject")
      .then(function (response) {
        stringOptionsPrj = response.data;
    });
  };

  // view UACS Codes
  const viewUACS = () => {
    axios
      .get("http://localhost/backend/select.php?readUACS")
      .then(function (response) {
        stringOptionsUACS = response.data;
    });
  };
  
  // #############################################################################################
  // Backend Queries





  const clearText = () => {
    selectedPayee.value = "";
    state.orsdetails = "";
    state.signame = "";
    state.sigposition = "";
    state.orstin = "";
    state.address = "";
    
    appendRow.value.forEach((row, index) => {
      row.particstxt = "";
      row.uacstxt = "";
      row.uacsselect = "";
      row.mfotxt = "";
      row.amounttxt = "";
    });
    resetItem();
  };  

  // 


    const addnewORS  = async () => {
      try{
        var formData = new FormData();
        formData.append("id", selectedPayee.value.value);
        formData.append("details", state.orsdetails);
        formData.append("user", username);
        formData.append("division", userdiv);
        formData.append("tin", state.orstin);
        formData.append("address", state.address);
        formData.append("tax2", tax2chk.value);
        formData.append("tax5", tax5chk.value);

        appendRow.value.forEach((row, index) => {
          formData.append(`partics[${index}]`, row.particstxt);
          formData.append(`uacs[${index}]`, row.uacstxt);
          formData.append(`mfo[${index}]`, row.mfotxt);
          formData.append(`amount[${index}]`, row.amounttxt);
        });
        axios
          .post("http://localhost/backend/insert.php?newORS", formData)
          .then(function (response) {

            if((response.data == true)){
              swalSuccess();
              clearText();
              hideORSForm();
              viewORS();
            }
            else{
              swalError();
            }

          });
        }
        catch (error){
        swalError();
    }
    }; 



// filteroptions

const viewORSmodal = (props) => {
    currentprops.value = props;
    viewORSdetails.value = true;
    
    currentprops.value = props;
        viewORSdetails.value = true;
        // console.log(currentprops.value.row.ors_random);

        var formData = new FormData();
        formData.append("refnum", currentprops.value.row.ors_random);
        axios
        .post("http://localhost/backend/select.php?readORSpayee", formData)
        .then(function (response) {
            modalorspayee.value = response.data;
            modalorspayee.value.forEach(item => {
                // console.log(item.payeename);
                displayname.value = item.payeename;
                displaybank.value = item.payeeaddr;
                displayacct.value = item.payeeacctnum;
                displaypartics.value = item.ors_details;
                displaystatus.value = item.isapproved;
                displayorsnum.value = item.ors_number;
            });
        });
};



    const modalorspayee = ref([]);
    const displayname = ref('');
    const displaybank = ref('');
    const displayacct = ref('');
    const displayorsnum = ref('');
    const displaynumset = ref('');
    const displaystatus = ref('');
    const displaypartics = ref('');


</script>



 
