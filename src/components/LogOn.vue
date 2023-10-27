<script setup>
   import PageTitle  from '@/components/PageTitle.vue'
   import FormRow from '@/components/FormRow.vue'
   import FormRouter from '@/components/FormRouter.vue'
   import FormButton from '@/components/FormButton.vue'
   import { useRouter } from 'vue-router'
   import { onMounted } from "vue"

   import { currentUser } from '@/stores/currentUserStore.js'

   const router = useRouter()

   onMounted(() => {
    resetCurrentUser()
  })

  function resetCurrentUser()
   {
      currentUser.updateProp('authenticated','')
      currentUser.updateProp('id','')
      currentUser.updateProp('userName','')
      currentUser.updateProp('clubCode','')
      currentUser.updateProp('clubName','')
      currentUser.updateProp('email','')
   }

   function logOn(){

      var json=jsonMock()
      checkAuth(json)
      return

      // fetch('http://localhost:3001/users?userName='+currentUser.userName)
      //       .then(response => response.json())
      //       .then(json => checkAuth(json));

   }

   function checkAuth(json)
   {
      currentUser.updateProp('authenticated','false')
      if(json.length==1 && json[0].pw == currentUser.pw) 
      {
         mapCurrentUser(json)
         router.push({ name: 'services' }) 
      }
   }

   function mapCurrentUser(json)
   {
      currentUser.updateProp('authenticated','true')
      currentUser.updateProp('id',json[0].id)
      currentUser.updateProp('userName',json[0].userName)
      currentUser.updateProp('clubCode',json[0].clubCode)
      currentUser.updateProp('clubName',json[0].clubName)
      currentUser.updateProp('email',json[0].email)
   }

   function jsonMock()
   {
      return JSON.parse('[{"id":"1892d900-69b8-11ee-ae7b-2b54b3e656db","clubCode":"TLBC01","clubName":"Tring Lawn Bowls Club","userName":"bp","pw":"123","name":"","email":"bp@ivnet.co.uk"}]')
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
               <FormRow name="userName" display="Username or eMail" type="text" required="true" />
               <FormRow name="pw" display="Password" type="password" required="true"/>
            </div>
            <FormButton type="submit">Log On</FormButton>          
            <p class="mt-6 text-sm">If you have not registed to use these services and have been given a Club Code, then please 
               <br/>
               <FormRouter route="register" display="Register here" />              
            </p>
         </form>
      </div>
   </div>
</template>