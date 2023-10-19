<script setup>
import PageTitle  from '@/components/PageTitle.vue'
import FormRow from '@/components/FormRow.vue'
import FormButton from '@/components/FormButton.vue'
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { currentUser } from '@/stores/currentUserStore.js'
import { userDetail } from '@/stores/userDetailStore.js'

//let currentUserLink = "personalInfo?"+currentUser.id
//let currentUserName = currentUser.userName

const router = useRouter()

onMounted(() => {
    getCurrentUserDetails()
  })

  function getCurrentUserDetails()
  {
      fetch('http://localhost:3001/userdetails?'+currentUser.id)
            .then(response => response.json())
            .then(json => mapUserDetails(json));
  }

  function mapUserDetails(json)
   {    
        if(json.length > 0)
        {
            userDetail.updateProp('id',json[0].id)
            userDetail.updateProp('fullName',json[0].fullName)
            userDetail.updateProp('telephone',json[0].telephone)
            userDetail.updateProp('dietary',json[0].dietary)
            userDetail.updateProp('medical',json[0].medical)
        }
   }

  function updatePersonalDetails()
  {
    if(userDetail.id.length > 0)
    {
        fetch("http://localhost:3001/userdetails/"+userDetail.id, {
            method: "PUT",
            body: JSON.stringify({
            "id": userDetail.id,
            "fullName": userDetail.fullName,
            "telephone": userDetail.telephone,
            "dietary": userDetail.dietary,
            "medical": userDetail.medical,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

    }else{
        fetch("http://localhost:3001/userdetails", {
            method: "POST",
            body: JSON.stringify({
            "id": currentUser.id,
            "fullName": userDetail.fullName,
            "telephone": userDetail.telephone,
            "dietary": userDetail.dietary,
            "medical": userDetail.medical,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
    }
    router.push({ name: 'services' }) 
  }

</script>

<template>
    <div class="flex flex-col items-center justify-center m-6">
        <div class="sm:w-3/4 md:w-1/3 w-full">
            <PageTitle name="Personal Information">
                Please update you personal details
            </PageTitle>   
            <form @submit.prevent="updatePersonalDetails">
                <div class="flex flex-col justify-center items-center">
                    <FormRow name="fullName" display="Fullname" type="text" :value="userDetail.fullName">
                        This will be used for the members handbook  
                    </FormRow>
                    <FormRow name="telephone" display="Telephone" type="text" :value="userDetail.telephone">
                        This will be used for the members handbook
                    </FormRow>
                    <FormRow name="dietary" display="Dietary Information" type="text" :value="userDetail.dietary">
                        This will be used by the catering team
                    </FormRow>
                    <FormRow name="medical" display="Medical Information" type="text" :value="userDetail.medical">
                        This will be used by team captains and match organisers
                    </FormRow>
                </div>
                <FormButton 
                    type="submit">Update Details
                </FormButton>
            </form>
        </div>
    </div>
</template>




  