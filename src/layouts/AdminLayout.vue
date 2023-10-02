<style>
.bg-brand {
  background: #3080ac !important;
}
.bg-dblue {
  background: #2b6d90 !important;
}
</style>

<template>
    <q-layout view="hHh Lpr lFf" class="bg-white">
        <q-header elevated>
            <q-toolbar class="bg-primary">
                <q-btn
                    flat
                    dense
                    @click="toggleLeftDrawer"
                    aria-label="Menu"
                    icon="menu"
                />

                <!-- more -->
  
                <q-toolbar-title >
                    <span class="text-weight-medium">FAD</span> | <span>BudgetSys</span>
                </q-toolbar-title>

                <q-btn flat  icon-right="logout"  @click="logout()" style="font-size: 12px;">Log out&nbsp;</q-btn>
            </q-toolbar>
        </q-header>
  
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="bg-white"
        >

            <q-scroll-area style="height: calc(100% - 180px); margin-top: 180px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple to="/home">
                        <q-item-section avatar>
                            <q-icon name="dashboard" />
                        </q-item-section>
                        <q-item-section>
                            ORS Database
                        </q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-ripple disabled> -->
                    <q-item clickable v-ripple to="/home/lib" >
                        <q-item-section avatar>
                            <q-icon name="backup_table" />
                        </q-item-section>
                        <q-item-section>
                            Line Item Budget
                        </q-item-section>
                    </q-item>
                    <!-- <q-item clickable v-ripple to="/home/reports"> -->
                    <!-- <q-item clickable v-ripple disabled>
                        <q-item-section avatar>
                            <q-icon name="table_view" />
                        </q-item-section>
                        <q-item-section>
                            Reports
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon name="construction" color="red" />
                        </q-item-section>
                        <q-tooltip>Under development!</q-tooltip>
                    </q-item> -->
                    <q-expansion-item
                        label="Reports"
                        icon="table_view"
                    >
                        <q-list>
                            <q-item style="padding-left: 72px;"  to="/home/reports/SAOB">
                                <q-item-section>
                                    SAOB
                                </q-item-section>
                                <!-- <q-item-section avatar>
                                    <q-icon name="construction" color="red" />
                                </q-item-section>
                                <q-tooltip>Under development!</q-tooltip> -->
                            </q-item>
                        </q-list>
                    </q-expansion-item>
                </q-list>
            </q-scroll-area>
            <!--  -->
            <q-img class="absolute-top bg-primary" src="../assets/img/bgggg2.jpg"  style="height: 180px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="90px" class="q-mb-sm">
                        <img src="../assets/img/5857.jpg">
                    </q-avatar>
                    <div class="text-h6 text-black">{{ fname }}</div>
                    <div class="text-grey-8">{{ userpost }}</div>
                </div>
            </q-img>
        </q-drawer>
        <!--  -->
        <q-page-container style="background-color: #FFFEFA;">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

    export default {
        name: 'MyLayout',
        
        setup () {
            const router = useRouter();

            const fname = localStorage.getItem('fname');
            const username = localStorage.getItem('username');
            const userdiv = localStorage.getItem('userdiv');
            const userpost = localStorage.getItem('userpost');
            const leftDrawerOpen = ref(false);
  
            function toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }

            const logout = () => {
                sessionStorage.clear();
                router.push('/');
            }
            // 
            return {
                fname,
                username,
                userdiv,
                userpost,
                leftDrawerOpen,
                logout,
                toggleLeftDrawer
            }
        }
    }
  </script>

  <!-- 

   -->

