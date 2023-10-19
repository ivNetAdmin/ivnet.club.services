<script setup>
  import PageTitle  from '@/components/PageTitle.vue'
  import FormRow from '@/components/FormRow.vue'
  import FormButton from '@/components/FormButton.vue'
  import { useRouter } from 'vue-router'
  import { currentUser } from '@/stores/currentUserStore.js'
  import { uuid } from 'vue-uuid'
  import { ref, onMounted } from "vue"
  const router = useRouter()

  let codeValidMessage = ref('')
  let pwValidMessage = ref('')
  let emailValidMessage = ref('')
  let isActive = ref(true)

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

  function register(){

    fetch('http://localhost:3001/users?email='+currentUser.email+'&clubCode='+currentUser.clubCode.toUpperCase())
      .then(response => response.json())
      .then(json => {
        if(json.length > 0)
        {
          emailValidMessage.value = "--- This email is already in use !!"
        }else{
          if(currentUser.pw==currentUser.rptpw)
          {
            fetch("http://localhost:3001/users", {
              method: "POST",
              body: JSON.stringify({
                "id": uuid.v1(),
                "clubCode": currentUser.clubCode.toUpperCase(),
                "clubName": currentUser.clubName,
                "userName": currentUser.userName,
                "pw": currentUser.pw,
                "email": currentUser.email
              }),
              headers: {
                  "Content-type": "application/json; charset=UTF-8"
              }
            })
            // Converting to JSON
            .then(response => response.json())
            .then(json => setAuth(json));
            }else{
              pwValidMessage.value="--- Passwords must match !!"
            }
        }
      })
   }

   function setAuth(json)
   {
        currentUser.updateProp('id',json.id)
        currentUser.updateProp('authenticated','true')
        router.push({ name: 'services' }) 
   }

   function clubCodeLookup()
   {
    fetch('http://localhost:3001/codes?code='+currentUser.clubCode.toUpperCase())
            .then(response => response.json())
            .then(json => checkCode(json));
   }
   function clearInput(inputName)
   {
      switch(inputName)
      {
        case "code":
        codeValidMessage.value = ""
        break;
        case "pw":
        pwValidMessage.value = ""
        break;
        case "rptpw":
        pwValidMessage.value = ""
        break;
        case "email":
        emailValidMessage.value = ""
        break;
      }
   }

   function checkCode(json)
   {
    if (json.length!=1)
    {
      currentUser.updateProp('clubCode','')
      codeValidMessage.value="--- Invalid !!"
      isActive.value = true
    }else{
      isActive.value = false
      currentUser.updateProp('clubName',json[0].name)
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
              <FormRow 
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
              <FormRow name="userName" display="User name" type="text">
                Make up a username rather than an eMail to log on
              </FormRow>
              <FormRow 
              @keydown="clearInput('email')" 
              name="email" 
              display="Email" 
              type="email" 
              required="true"
              :msg="emailValidMessage">
                Your eMail must be valid and unique
              </FormRow>
              <FormRow 
              @keydown="clearInput('pw')"  
              name="pw" 
              display="Password" 
              type="password" 
              required="true">
                Length 6+, uppercase, lowercase, numbers, special characters
              </FormRow>
              <FormRow 
              @keydown="clearInput('rptpw')" 
              name="rptpw" 
              display="Confirm Password" 
              type="password" 
              required="true"
              :msg="pwValidMessage">
                Confirm your password
              </FormRow>
            </div>
            <FormButton 
            :disabled="isActive" 
            :class="{ 'opacity-25 cursor-not-allowed': isActive }"
            type="submit">Register</FormButton>                      
          </form>
      </div>
    </div>
  </template>
  