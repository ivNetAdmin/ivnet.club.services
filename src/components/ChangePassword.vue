<script setup>
    import { useRouter } from 'vue-router';
    import { onMounted, ref, inject, reactive, computed,} from "vue";
    import { useVuelidate } from '@vuelidate/core';
    import { minLength } from '@vuelidate/validators';
    import PageTitle  from '@/components/PageTitle.vue';
    import FormRow from '@/components/FormRow.vue';
    import FormButton from '@/components/FormButton.vue';
    import UserErrorMessage from '@/components/UserErrorMessage.vue';

    import { currentUser } from '@/stores/currentUserStore.js';
    import { service } from '@/stores/serviceStore.js';

    const cryptojs = inject('cryptojs');

    let pwValidMessage = ref('');
    let rptpwValidMessage = ref('');
    
    let userErrorMessage = ref('');

    let oldpw = '';

    let currentusername = currentUser.userName;

    let serviceUrl = service.url;
    let cryptoKey = service.key;
    let cryptoIv = service.iv;
    let reg = service.reg;


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

   onMounted(() => {
    getCurrentUserDetails();
  })

  function validPassword(pw)
  {
    let validationPattern = new RegExp(reg);
    if(validationPattern.test(pw)) return true;
    return false;
  }

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
            .then(json => mapPw(json));
  }

  function mapPw(json)
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
        oldpw = json.pw;    
   }

 function clearInput(inputName)
   {
      switch(inputName)
      {
        case "pw":
        pwValidMessage.value = "";
        break;
        case "rptpw":
        rptpwValidMessage.value = "";
        break;
      }
   }
    function clearPW()
    {
        currentUser.updateProp('pw','');
        currentUser.updateProp('rptpw','');
        currentUser.updateProp('oldpw','');
        pwValidMessage.value = "";
        rptpwValidMessage.value = "";
    }
   function encryptPw(pw)
   {
    var key = cryptojs.enc.Base64.parse(cryptoKey);
    var iv  = cryptojs.enc.Base64.parse(cryptoIv);
    return "'" + cryptojs.AES.encrypt(pw, key, {iv: iv}) + "'";
   }

    function changePassword(){

        state.password.pass = currentUser.pw;
        state.password.confirm = currentUser.rptpw;

        v$.value.$validate();

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
            if(oldpw == encryptPw(currentUser.oldpw))
            {
                if(currentUser.pw==currentUser.rptpw)
                {
                    fetch(serviceUrl+'members/'+currentUser.id, {
                        method: "PATCH",
                        body: JSON.stringify({
                        "id": currentUser.id,
                        "pw": encryptPw(currentUser.pw),
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    .then(clearPW());

                    router.push({ name: 'services' }) ;
                }else{
                    rptpwValidMessage.value="--- Passwords must match !!";
                }


            }else{
                currentUser.pw = oldpw;
            }
        }
    }

</script>

<template>
   <div class="flex flex-col items-center justify-center m-6">
      <div class="sm:w-3/4 md:w-1/3 w-full">
         <PageTitle name="Change Password">
            Change current password for <span class=" text-sky-600">{{ currentusername }}</span>
         </PageTitle>        
         <form @submit.prevent="changePassword">
            <div class="flex flex-col justify-center items-center">

                <FormRow store="user" name="oldpw" display="Old Password" type="password" required="true"/>

                <FormRow store="user"
                @keydown="clearInput('pw')"  
                name="pw" 
                display="New Password" 
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
            <FormButton type="submit">Update Password</FormButton>          
         </form>
         <UserErrorMessage :msg="userErrorMessage" />
      </div>
   </div>
</template>