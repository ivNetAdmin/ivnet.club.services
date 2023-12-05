<script setup>

   import { useRouter } from 'vue-router';
   import { onMounted, inject, ref } from "vue";
   import { service } from '@/stores/serviceStore.js';
   import { currentUser } from '@/stores/currentUserStore.js';

   import PageTitle  from '@/components/PageTitle.vue';
   import FormRow from '@/components/FormRow.vue';
   import FormRouter from '@/components/FormRouter.vue';
   import FormButton from '@/components/FormButton.vue';
   import UserErrorMessage from '@/components/UserErrorMessage.vue';
  
   const cryptojs = inject('cryptojs');

   const router = useRouter();
   
   let userErrorMessage = ref('');

   let serviceUrl = service.url;
   let cryptoKey = service.key;
   let cryptoIv = service.iv;

   onMounted(() => {
    resetCurrentUser();
  });

  function resetCurrentUser()
   {
      currentUser.updateProp('authenticated','');
      currentUser.updateProp('id','');
      currentUser.updateProp('userName','');
      currentUser.updateProp('clubCode','');
      currentUser.updateProp('clubName','');
      currentUser.updateProp('email','');
   };

    function logOn(){

       fetch(serviceUrl+'members/username/'+currentUser.userName)
            .then(response =>{
               if(response.ok)
               {
                  return response.json();
               }else{
                  return response.status;
               }
            })
            .then(json => checkAuth(json));

   };

   function checkAuth(json)
   {
      if(json===404) return;

      if(json===500) 
      {
         userErrorMessage.value = 'A Server error has occurred. Please contact your Administrator'
         return;
      }

      var pw = decryptPw(json.pw);
      currentUser.updateProp('authenticated','false');
      if(json != null && pw == currentUser.pw) 
      {
         mapCurrentUser(json);
         router.push({ name: 'services' }); 
      }
   }

   function decryptPw(pw)
   {
      pw = pw.substring(1);
      pw = pw.substring(0,pw.length-1);

      var key = cryptojs.enc.Base64.parse(cryptoKey);
      var iv  = cryptojs.enc.Base64.parse(cryptoIv);
      return cryptojs.AES.decrypt(pw, key, {iv: iv}).toString(cryptojs.enc.Utf8)
   }

   function mapCurrentUser(json)
   {
      currentUser.updateProp('authenticated','true');
      currentUser.updateProp('id',json.id);
      currentUser.updateProp('userName',json.userName);
      currentUser.updateProp('clubCode',json.clubCode);
      currentUser.updateProp('clubName',json.clubName);
      currentUser.updateProp('email',json.email);
      currentUser.updateProp('pw','');
   };
   
   function clearInput()
   {
      userErrorMessage.value = '';
   }

</script>

<template>
   <div class="flex flex-col items-center justify-center m-6">
      <div class="sm:w-3/4 md:w-1/3 w-full">
         <PageTitle name="Log On" :backIcon="false">
            Please log in to use the service you require
         </PageTitle>        
         <form @submit.prevent="logOn">
            <div class="flex flex-col justify-center items-center">
               <FormRow store="user" @keydown="clearInput()"  name="userName" display="Username or eMail" type="text" required="true" />
               <FormRow store="user" name="pw" display="Password" type="password" required="true" />
            </div>
            <FormButton type="submit">Log On</FormButton>          
            <p class="mt-6 text-sm">If you have not registed to use these services and have been given a Club Code, then please 
               <br/>
               <FormRouter route="register" display="Register here" />              
            </p>
         </form>
         <UserErrorMessage :msg="userErrorMessage" />
      </div>
   </div>
</template>