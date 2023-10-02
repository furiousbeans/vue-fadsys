<template>
    <q-layout view="hHh Lpr fFf">
        <q-page-container>
            <br><br><br><br><br><br><br><br><br><br><br><br>
            <q-card class="my-card" style="width: 40%; margin:auto;">
                <br>
                <q-card-section>
                    <div class="text-h5 text-center">Login</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <form id="loginform" @submit.prevent="login">
                        <q-input v-model="username" required label="Username" />
                        <q-input v-model="password" required label="Password" type="password" />
                        <br>
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-6">
                                <q-btn type="submit" color="primary" name="login" style="width: 100%;">
                                Login
                                </q-btn>
                            </div>
                            <div class="col-3"></div>
                        </div>
                    </form>
                </q-card-section>
            </q-card>

            
        </q-page-container>
    </q-layout>
</template>
  



<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
  
const $q = useQuasar();

const router = useRouter();

const username = ref("");
const password = ref("");

const login  = async () => {
    try {
        var formData = new FormData();
        formData.append("username", username.value);
        formData.append("password", password.value);
        axios
        .post("http://localhost/backend/login.php?loginfunc", formData)
        .then(function (response) {

            if((response.data.success == true)){
                swalSuccess();
                localStorage.setItem('username', username.value);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('fname', response.data.fname);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('userpost', response.data.userpost);
                localStorage.setItem('userdiv', response.data.userdiv);
                sessionStorage.setItem('loggedIn', true);
                if (response.data.role === 'Administrator') {
                    router.push('/home');
                } else {
                    router.push('/user');
                }
            }
            else{
                console.log("failed");
                swalFail();

            }
        });
    }
    catch (error){
        swalError();
    }

}; 

const swalSuccess = () => {
    Swal.fire({
        title: 'Success!',
        text: 'Redirecting...',
        icon: 'success',
    });
}

const swalFail = () => {
    Swal.fire({
        title: 'Error!',
        text: 'Invalid username or password, please try again',
        icon: 'error',
    });
};

const swalError = () => {
    Swal.fire({
        title: 'Error!',
        text: 'Something went wrong, please try again',
        icon: 'error',
    });
};

  
</script>