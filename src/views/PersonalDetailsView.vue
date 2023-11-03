<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from 'vue-router'
import { currentUser } from '@/stores/currentUserStore.js'
import { userDetail } from '@/stores/userDetailStore.js'
import { service } from '@/stores/serviceStore.js'

import PageTitle  from '@/components/PageTitle.vue'
import FormRow from '@/components/FormRow.vue'
import FormButton from '@/components/FormButton.vue'
import UserErrorMessage from '@/components/UserErrorMessage.vue';

let serviceUrl = service.url;

let userErrorMessage = ref('');

let currentusername = currentUser.userName;

const router = useRouter()

onMounted(() => {
    getCurrentUserDetails();
  })

  function getCurrentUserDetails()
  {
    if(currentUser===null || currentUser.id === '') router.push({ name: 'home' });

    fetch(serviceUrl+'members/'+currentUser.id)
            .then(response =>{
               if(response.ok)
               {
                  return response.json();
               }else{
                  return response.status;
               }
            })
            .then(json => mapUserDetails(json));
  }

  function mapUserDetails(json)
   {
        if(json===404)
        {
            userErrorMessage.value = 'A Server error the system cannot find your registration details';
            return;
        };

        if(json===500) 
        {
            userErrorMessage.value = 'A Server error has occurred. Please contact your Administrator';
            return;
        }

        userDetail.updateProp('id',json.id);
        userDetail.updateProp('fullname',json.fullname);
        userDetail.updateProp('telephone',json.telephone);
        userDetail.updateProp('dietary',json.dietary);
        userDetail.updateProp('medical',json.medical);
        
   }

  function updatePersonalDetails()
  {
        fetch(serviceUrl + 'members/'+userDetail.id, {
            method: "PATCH",
            body: JSON.stringify({
            "id": userDetail.id,
            "fullname": userDetail.fullname,
            "telephone": userDetail.telephone,
            "dietary": userDetail.dietary,
            "medical": userDetail.medical,
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
    router.push({ name: 'services' });
  }

</script>

<template>
    <div class="flex flex-col items-center justify-center m-6">
        <div class="sm:w-3/4 md:w-1/3 w-full">
            <PageTitle name="Personal Information">
                Please update you personal details <span class=" text-sky-600">{{ currentusername }}</span>
            </PageTitle>   
            <form @submit.prevent="updatePersonalDetails">
                <div class="flex flex-col justify-center items-center">
                    <FormRow name="fullname" display="fullname" type="text" :value="userDetail.fullname">
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
            <UserErrorMessage :msg="userErrorMessage" />
        </div>
    </div>
</template>




  