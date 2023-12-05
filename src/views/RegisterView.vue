<script setup>
  import { uuid } from 'vue-uuid'
  import { useRouter } from 'vue-router'
  import { useVuelidate } from '@vuelidate/core';
  import { minLength } from '@vuelidate/validators';
  import { currentUser } from '@/stores/currentUserStore.js'
  import { service } from '@/stores/serviceStore.js'
  import { ref, onMounted, reactive, computed, inject } from "vue";

  import PageTitle  from '@/components/PageTitle.vue'
  import FormRow from '@/components/FormRow.vue'
  import FormButton from '@/components/FormButton.vue'
  import UserErrorMessage from '@/components/UserErrorMessage.vue';
 
  const cryptojs = inject('cryptojs');

  const router = useRouter();

  const state = reactive({
      password: {
         pass: ''
      }
   });

   const rules = computed(()=>{
      return {
         password: {
            pass: { minLength: minLength(6), pw_validation: {
              $validator: validPassword
            } }
         }
      };
   });

  const v$ = useVuelidate(rules, state);

  let serviceUrl = service.url;
  let cryptoKey = service.key;
  let cryptoIv = service.iv;
  let reg = service.reg;

  let userErrorMessage = ref('');

  let codeValidMessage = ref('');
  let pwValidMessage = ref('');
  let rptpwValidMessage = ref('');
  let emailValidMessage = ref('');
  let isActive = ref(true);

  onMounted(() => {
    resetCurrentUser()
  })

  function validPassword(pw)
  {
    let validationPattern = new RegExp(reg);
    if(validationPattern.test(pw)) return true;
    return false;
  }

  function resetCurrentUser()
   {
      currentUser.updateProp('authenticated','');
      currentUser.updateProp('id','');
      currentUser.updateProp('userName','');
      currentUser.updateProp('clubCode','');
      currentUser.updateProp('clubName','');
      currentUser.updateProp('email','');
   }

  async function register(){

    state.password.pass = currentUser.pw;
    state.password.confirm = currentUser.rptpw;

    v$.value.$validate();
    
    clearInput('');

    if(v$.value.$error)
    {
        v$.value.$errors.forEach(function(value){
        switch(value.$property)
        { 
          case "pass":
          pwValidMessage.value="--- Password is not valid !!";
          break;          
        }
      });
    }else{
      await fetch(serviceUrl + 'members/email/'+currentUser.email+'/clubcode/'+currentUser.clubCode.toUpperCase())
        .then(response =>{
               if(response.ok)
               {
                  return response.json();
               }else{
                  return response.status;
               }
            })
        .then(async json => {

          if(json===500) 
          {
            userErrorMessage.value = 'A Server error has occurred. Please contact your Administrator'
            return;
          }
          if(json!==404)
          {
            emailValidMessage.value = "--- This email is already in use !! ["+json[0].email+"]";
          }else{
            if(currentUser.pw==currentUser.rptpw)
            {
              await fetch(serviceUrl + 'members', {
                method: "POST",
                body: JSON.stringify({
                  "id": uuid.v1(),
                  "clubCode": currentUser.clubCode.toUpperCase(),
                  "clubName": currentUser.clubName,
                  "userName": currentUser.userName,
                  "pw": encryptPw(currentUser.pw),
                  "email": currentUser.email
                },null, 0),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
              })
              // Converting to JSON
              .then(response => response.json())
              .then(setAuth());
              }else{
                rptpwValidMessage.value="--- Passwords must match !!";
              }
          }
        });
      }
   }

   function encryptPw(pw)
   {
    var key = cryptojs.enc.Base64.parse(cryptoKey);
    var iv  = cryptojs.enc.Base64.parse(cryptoIv);
    return "'" + cryptojs.AES.encrypt(pw, key, {iv: iv}) + "'";
   }

   function setAuth()
   {
        currentUser.updateProp('authenticated','true')
        currentUser.updateProp('pw','')
        currentUser.updateProp('rptpw','')
        router.push({ name: 'services' }) 
   }

   async function clubCodeLookup()
   {
    await fetch(serviceUrl + 'clubcodes/code/'+currentUser.clubCode.toUpperCase())
            .then(response => response.json())
            .then(json => checkCode(json));
   }

   function clearInput(inputName)
   {
      switch(inputName)
      {
        case "code":
        codeValidMessage.value = "";
        break;
        case "pw":
        pwValidMessage.value = "";
        rptpwValidMessage.value = "";
        break;
        case "rptpw":
        pwValidMessage.value = ""
        rptpwValidMessage.value = ""
        break;
        case "email":
        emailValidMessage.value = "";
        break;
      }
      userErrorMessage.value = "";
   }

   function checkCode(json)
   {
    if (json===null)
    {
      currentUser.updateProp('clubCode','')
      codeValidMessage.value="--- Invalid !!"
      isActive.value = true
    }else{
      isActive.value = false
      currentUser.updateProp('clubName',json.name)
    }
   }
</script>

<template>
    <div class="flex flex-col items-center justify-center m-6">
      <div class="sm:w-3/4 md:w-1/3 w-full">
        <PageTitle name="Register">
          Please fill in the form to register
        </PageTitle>       
        <form @submit.prevent="register">
            <div class="flex flex-col justify-center items-center">
              <FormRow store="user"
              @change="clubCodeLookup" 
              @keydown="clearInput('code')" 
              name="clubCode" 
              display="Club Code" 
              type="text" 
              required="true"
              toupper="uppercase"
              :msg="codeValidMessage">
                A code given to you by your club
              </FormRow> 
              <FormRow store="user" name="username" display="User name" type="text">
                Make up a username rather than an eMail to log on
              </FormRow>
              <FormRow store="user"
              @keydown="clearInput('email')" 
              name="email" 
              display="Email" 
              type="email" 
              required="true"
              :msg="emailValidMessage">
                Your eMail must be valid and unique
              </FormRow>
              <FormRow store="user"
              @keydown="clearInput('pw')"  
              name="pw" 
              display="Password" 
              type="password" 
              required="true"
              :msg="pwValidMessage">
                Length 6+, uppercase, lowercase, numbers, special characters
              </FormRow>
              <FormRow store="user"
              @keydown="clearInput('rptpw')" 
              name="rptpw" 
              display="Confirm Password" 
              type="password" 
              required="true"
              :msg="rptpwValidMessage">
                Confirm your password
              </FormRow>
            </div>
            <FormButton 
            :disabled="isActive" 
            :class="{ 'opacity-25 cursor-not-allowed': isActive }"
            type="submit">Register</FormButton>                      
          </form>
          <UserErrorMessage :msg="userErrorMessage" />
      </div>
    </div>
  </template>
  