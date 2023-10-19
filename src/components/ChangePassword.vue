<script setup>
    import PageTitle  from '@/components/PageTitle.vue'
    import FormRow from '@/components/FormRow.vue'
    // import FormRouter from '@/components/FormRouter.vue'
    import FormButton from '@/components/FormButton.vue'
    import { useRouter } from 'vue-router'
    import { ref } from "vue"

    import { currentUser } from '@/stores/currentUserStore.js'

    let pwValidMessage = ref('')

    let oldpw = currentUser.pw

   const router = useRouter()

 function clearInput(inputName)
   {
      switch(inputName)
      {
        case "pw":
        pwValidMessage.value = ""
        break;
        case "rptpw":
        pwValidMessage.value = ""
        break;
      }
   }

    function changePassword(){

        if(oldpw == currentUser.oldpw) 
        {
            if(currentUser.pw==currentUser.rptpw)
            {
                fetch("http://localhost:3001/users/"+currentUser.id, {
                    method: "PATCH",
                    body: JSON.stringify({
                    "id": currentUser.id,
                    "pw": currentUser.pw,
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })

                router.push({ name: 'services' }) 
            }else{
                pwValidMessage.value="--- Passwords must match !!"
            }


        }else{
            currentUser.pw = oldpw
        }
        }

</script>

<template>
   <div class="flex flex-col items-center justify-center m-6">
      <div class="sm:w-3/4 md:w-1/3 w-full">
         <PageTitle name="Change Password">
            Change current password for {{ currentUser.userName }}
         </PageTitle>        
         <form @submit.prevent="changePassword">
            <div class="flex flex-col justify-center items-center">

                <FormRow name="oldpw" display="Old Password" type="password" required="true"/>

                <FormRow 
                @keydown="clearInput('pw')"  
                name="pw" 
                display="New Password" 
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
            <FormButton type="submit">Update Password</FormButton>          
         </form>
      </div>
   </div>
</template>