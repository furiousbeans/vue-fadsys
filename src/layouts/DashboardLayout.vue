<template>
    <q-layout view="lHh Lpr lFf" class="bg-white">
        <q-header elevated>
            <q-toolbar class="bg-indigo-6">
                <q-btn
                    flat
                    dense
                    round
                    @click="toggleLeftDrawer"
                    aria-label="Menu"
                    icon="menu"
                />

                <!-- more -->
  
                <q-toolbar-title >
                    <span class="text-weight-medium">FAD</span>&nbsp;|&nbsp;BudgetSys
                </q-toolbar-title>

                <q-btn flat  icon-right="logout" style="font-size: 12px;">Log out&nbsp;</q-btn>
            </q-toolbar>
        </q-header>
  
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            class="bg-white"
        >

        <!-- 
                
         -->
            <q-scroll-area style="height: calc(100% - 180px); margin-top: 180px; border-right: 1px solid #ddd">
                <q-list padding>
                    <q-item clickable v-ripple to="/">
                        <q-item-section avatar>
                            <q-icon name="dashboard" />
                        </q-item-section>
                        <q-item-section>
                            Dashboard
                        </q-item-section>
                    </q-item>
                    
                    <!-- <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="receipt_long" />
                        </q-item-section>

                        <q-item-section>
                            ORS Database
                        </q-item-section>
                    </q-item> -->

                    <!-- <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="backup_table" />
                        </q-item-section>

                        <q-item-section>
                            Line Item Budget
                        </q-item-section>
                    </q-item> -->
                    <!--  -->
                    <!-- <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="table_view" />
                        </q-item-section>

                        <q-item-section>
                            Reports
                        </q-item-section>
                    </q-item> -->
                </q-list>
            </q-scroll-area>
            <!-- 12. -->
            <q-img class="absolute-top bg-primary" src="../assets/img/blue1.jpg"  style="height: 180px">
                <div class="absolute-bottom bg-transparent">
                    <q-avatar size="90px" class="q-mb-sm">
                        <img src="../assets/img/5857.jpg">
                    </q-avatar>
                    <div class="text-weight-bold">Vince Albuera</div>
                    <div>Administrator</div>
                </div>
            </q-img>
        </q-drawer>
        <!--  -->
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
  
<script>
    import { ref } from 'vue'

    export default {
        name: 'MyLayout',
  
        setup () {
            const leftDrawerOpen = ref(false)
  
            function toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
            // 
            return {
                leftDrawerOpen,
                toggleLeftDrawer
            }
        }
    }
  </script>

  <!-- 

   -->