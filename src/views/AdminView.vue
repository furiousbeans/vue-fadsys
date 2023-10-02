<template>
    <div class="q-pa-md">
        <div class="row" style="padding-top: 12px;" v-if="!isSmallScreen">
            <div class="col-md mb-3">
                <q-card dark bordered class="my-card" style="background-color: #e869e8; margin-left:5px; margin-right:5px;">
                    <q-card-section>
                        <div class="text-h6">FAD</div>
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section>
                    Total obligated amount : <h5>{{ Number(FADtotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</h5>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md   mb-3">
                <q-card dark bordered class="my-card" style="background-color: #4f87e1; margin-left:5px; margin-right:5px;">
                    <q-card-section>
                        <div class="text-h6">OD / ODD</div>
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section>
                        Total obligated amount : <h5>{{ Number(ODtotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</h5>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-md   mb-3">
                <q-card dark bordered class="my-card" style="background-color: #5499c8; margin-left:5px; margin-right:5px;">
                    <q-card-section>
                        <div class="text-h6">SEID</div>
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section>
                        Total obligated amount : <h5>{{ Number(SEIDtotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</h5>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-md   mb-3">
                <q-card dark bordered class="my-card" style="background-color: #539845; margin-left:5px; margin-right:5px;">
                    <q-card-section>
                        <div class="text-h6">STMERPD</div>
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section>
                        Total obligated amount : <h5>{{ Number(STMERPDtotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</h5>
                    </q-card-section>
                </q-card>
            </div>

            <div class="q-col-xs col-md   mb-3">
                <q-card dark bordered class="my-card" style="background-color: #f2c12f; margin-left:5px; margin-right:5px;">
                    <q-card-section>
                        <div class="text-h6">STSD</div>
                    </q-card-section>

                    <q-separator dark inset />

                    <q-card-section>
                        Total obligated amount : <h5>{{ Number(STSDtotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</h5>
                    </q-card-section>
                    <!--  -->
                </q-card>
            </div>
        </div>
        <br>
    </div>

    <div class="q-pa-md">
        <q-card class="my-card" flat bordered>
            <q-card-section horizontal>
                <q-card-section class="col">
                    <div  class="row">
                        <div class="text-h6 col">ORS Database</div>
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
                                <q-select 
                                    v-model="viewselect" 
                                    :options="viewselectoptions" 
                                    label="Sort By" 
                                    style="width: 200px; padding-right: 20px;"
                                    @update:model-value="selectViewORS(props)"
                                 />
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

                            <!-- Button group -->
                            <template v-slot:body-cell-actionbutton="props">
                            <q-td :props="props">
                                
                                <q-btn
                                dense
                                round
                                flat
                                color="positive"
                                icon="visibility"
                                @click="viewORS(props);"
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
                                    <q-input v-model="state.aprvORStxt" label="Enter ORS Number" v-else ></q-input>
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
                        
                        <br><br><br>
                        
                        <div class="row" id="aprvbtn">
                            <div class="col-3">&nbsp;</div>
                            <div class="col-6" v-if="displaystatus !== 1" >
                                <q-btn type="submit" color="primary" icon="checkbox" name="approveORS" @click="aprORS()" style="width: 100%;">
                                    Approve ORS
                                </q-btn>
                            </div>
                            <div class="col-6" v-else>
                            </div> 
                            <div class="col-3">&nbsp;</div>
                        </div>
                    </div>
                    <div class="col-1"> </div>
                </div>
            </q-card-section>
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

</template>


<script setup>
    import { useQuasar } from "quasar";
    import { ref, onMounted, reactive, watch, computed, onBeforeUnmount } from "vue";
    import axios from "axios";
    import Swal from "sweetalert2";

    const $q = useQuasar();
    const peso = { style: 'currency', currency: 'PHP' };

    const viewselect = ref('View all ORS');
    const viewselectoptions = ref([
        {
          label: 'View all ORS',
          value: 'all',
        },
        {
          label: 'Approved ORS',
          value: '1',
        },
        {
          label: 'Pending Approval',
          value: '0',
        },
    ]);

    const state = reactive({
        aprvORStxt: "",
    });

    // Table const
    const tableRef = ref();
    const rows = ref([]);
    const filter = ref("");
    const loading = ref(false);
    const selected = ref([]);
    const pagination = ref({
      rowsPerPage: 20
    });
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
        name: "division",
        label: "Division",
        field: "division",
        align: "left",
        sortable: true,
    },
    {
        name: "uname",
        label: "Created By",
        field: "uname",
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


    // screensize
    const isSmallScreen = ref(false);
    const handleResize = () => {
      isSmallScreen.value = window.innerWidth < 600; // Adjust the breakpoint as needed
    };


    const selectViewORS = (props) => {
        console.log(viewselect.value.value);
        var formData = new FormData();
        formData.append("status", viewselect.value.value);
        axios
        .post("http://localhost/backend/test.php?viewORS", formData)
        .then(function (response) {
            rows.value = response.data;
        });

    };

    // watch(viewselect, (newValue) => {
    //   console.log(newValue.value);
    // });


    // Print Signatories Modal and Functions
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
              viewAllORS();
            }
            else{
              swalError();
            }
      });

  };
  
  const confirmDelete = ref(false);
  const signatoriesmodal = ref(false);
  const bursmodal = ref(false);
 
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

  const clearText = () => {
    state.signame = "";
    state.sigposition = "";
  };  
  // #############################################################################################
  // Print Signatories Modal and Functions



    const FADtotal = ref("");
    const ODtotal = ref("");
    const SEIDtotal = ref("");
    const STMERPDtotal = ref("");
    const STSDtotal = ref("");

    onMounted(() => {
        viewAllORS();
        viewFADTotal();
        viewSEIDTotal();
        viewSTSDTotal();
        viewODTotal();
        viewSTMERPDTotal();
        handleResize();
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    const viewAllORS = () => {
        axios
        .get("http://localhost/backend/select.php?readAllORS")
        .then(function (response) {
            rows.value = response.data;
        });
    };

    const viewFADTotal = () => {
        axios
        .get("http://localhost/backend/select.php?readFADTotal")
        .then(function (response) {
            FADtotal.value = response.data;
        });
    };

    const viewODTotal = () => {
        axios
        .get("http://localhost/backend/select.php?readODTotal")
        .then(function (response) {
            ODtotal.value = response.data;
        });
    };
    
    const viewSEIDTotal = () => {
        axios
        .get("http://localhost/backend/select.php?readSEIDTotal")
        .then(function (response) {
            SEIDtotal.value = response.data;
        });
    };

    const viewSTMERPDTotal = () => {
        axios
        .get("http://localhost/backend/select.php?readSTMERPDTotal")
        .then(function (response) {
            STMERPDtotal.value = response.data;
        });
    };
    
    const viewSTSDTotal = () => {
        axios
        .get("http://localhost/backend/select.php?readSTSDTotal")
        .then(function (response) {
            STSDtotal.value = response.data;
        });
    };

    // get id of clicked row
    const currentprops = ref();


    // ORS data modal
    const modalorspayee = ref([]);
    const displayname = ref('');
    const displaybank = ref('');
    const displayacct = ref('');
    const displayorsnum = ref('');
    const displaynumset = ref('');
    const displaystatus = ref('');
    const displaypartics = ref('');
    const viewORSdetails = ref(false);


    const viewORS = (props) => {
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

    // approve ORS function
    const aprORS = (props) => {
        // console.log(displaynumset.value);
        var formData = new FormData();
        formData.append("refnum", currentprops.value.row.ors_random);
        formData.append("orsnumset", displaynumset.value);
        formData.append("orsnumtxt", state.aprvORStxt);
        
        console.log(state.aprvORStxt);
        axios
        .post("http://localhost/backend/update.php?approveORS", formData)
        .then(function (response) {
            if((response.data == true)){
                swalSuccess();
                viewORSdetails.value=false;
                viewAllORS();
                viewFADTotal();
                viewSEIDTotal();
                viewSTSDTotal();
                viewODTotal();
                viewSTMERPDTotal();
            }
            else{
                swalError();
            }
        });
    };


    const swalSuccess = () => {
        Swal.fire({
            title: 'Success!',
            text: 'ORS approved and numbered',
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


    


</script>


