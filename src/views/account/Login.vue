<script setup>
import { inject } from "vue";
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';
import { useClubStore } from '@/stores';

import FormField from '@/components/FormField.vue'
import FormRouter from '@/components/FormRouter.vue';

const router = useRouter();
const cryptojs = inject('cryptojs');
const authStore = useAuthStore();
const clubStore = useClubStore();

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

 async function onSubmit(values) {
    const { username, password } = values;
    await authStore.login(username, encryptPw(password));
    
    const { user } = useAuthStore();
    await clubStore.getClub(user.clubCode);

    router.push('/services/list');
}

function encryptPw(pw)
{
    var key = cryptojs.enc.Base64.parse(import.meta.env.VITE_CRYPTO_KEY);
    var iv  = cryptojs.enc.Base64.parse(import.meta.env.VITE_CRYPTO_IV);

    return btoa(cryptojs.AES.encrypt(pw, key, {iv: iv}));
}

</script>

<template>
    {{ clubStore.club }}
    <div class="">
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="flex flex-col justify-center items-center">
                <div class="relative z-0 w-full mb-6 group">
                    <FormField name="username" display="Username or eMail" type="text" :msg="errors.username" tooltip="" />
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <FormField name="password" display="Password" type="password" :msg="errors.password" tooltip="" />
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <button
                    :disabled="isSubmitting"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log On</button>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                    <p class="text-sm">If you have not registed and have been given a Club Code, then please 
                        <br />
                        <FormRouter route="register" display="Register here" />              
                    </p>
                </div>
            </div>
        </Form>
    </div>
    {{ authStore.user}}
</template>
