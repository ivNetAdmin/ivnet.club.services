<script setup>
import { inject, ref, onMounted } from "vue";
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';
import { useClubStore } from '@/stores';
import FormField from '@/components/FormField.vue'

const router = useRouter();
const authStore = useAuthStore();
const clubStore = useClubStore();
const cryptojs = inject('cryptojs');

let alttooltip ="To start you MUST enter code givent to you by your club";;

let isClubCodeInValid = ref(true);

const schema = Yup.object().shape({
    clubcode: Yup.string()
    .required('Required')
    .test({
        name: 'is-valid-club-code',
        test(value, ctx) {
            if (clubStore.clubCodes.includes(value.toUpperCase())) {
                isClubCodeInValid = false;
                getClubEmails(value);
                return true;
            }
                return ctx.createError({ message: 'Refer to your club for the correct code' });
            }
        }),
    username: Yup
    .string()
    .required('Username is required')
    .test({
        name: 'is-unique-username',
        test(value, ctx) {
            if (!authStore.userNameList.includes(value)) {     
                return true;
            }
                return ctx.createError({ message: 'This username is already in use' });
            }
        }),
    email: Yup
    .string().required('eMail is required')
    .email()
    .test({
        name: 'is-unique-email',
        test(value, ctx) {
            if (!authStore.eMailList.includes(value)) {     
                return true;
            }
                return ctx.createError({ message: 'This email is already in use' });
            }
        }),
    password: Yup
    .string()
    .matches(import.meta.env.VITE_PW_REG,'Password in invalid')
    .required('Password is required'),
    confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});

async function getClubEmails(clubcode)
{
    if(authStore.eMailList.length==0)
    {
        await authStore.getClubEmails(clubcode);
    }
}

async function onSubmit(values) {
  
    authStore.eMailList = [];
    authStore.userNameList = [];
    clubStore.clubCodes = [];

    const { clubcode, username, email, password } = values;
    await authStore.register(clubcode, username, email, encryptPw(password));

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

onMounted( async () => {
    if(clubStore.clubCodes.length==0)
    {
        await clubStore.getClubCodes();
    }
});

</script>

<template>
   
    <div class="">
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="relative z-0 w-full mb-6 group">
                <FormField name="clubcode" display="Club Code" type="text" :msg="errors.clubcode" 
                tooltip="A code givent to you by your club" />
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FormField name="username" display="Username" type="text" :msg="errors.username" 
                tooltip="Yo can make up a username rather than an eMail to log in" 
                :alttooltip="alttooltip"
                :isClubCodeInValid = "isClubCodeInValid"/>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FormField name="email" display="eMail" type="email" :msg="errors.email" 
                tooltip="Your eMail must be valid and unique" 
                :alttooltip="alttooltip"
                :isClubCodeInValid = "isClubCodeInValid"/>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FormField name="password" display="Password" type="password" :msg="errors.password" 
                tooltip="Length 6+, uppercase, lowercase, numbers, special characters" 
                :alttooltip="alttooltip"
                :isClubCodeInValid = "isClubCodeInValid"/>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <FormField name="confirmPassword" display="Confirm Password" type="password" :msg="errors.confirmPassword" 
                tooltip="Confirm your password"
                :alttooltip="alttooltip"
                :isClubCodeInValid = "isClubCodeInValid"/>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <button
                :disabled="isClubCodeInValid"
                :class="{ 'opacity-25 cursor-not-allowed': isClubCodeInValid }"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log On</button>
            </div>
        </Form>
    </div>
</template>
