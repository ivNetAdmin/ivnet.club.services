<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores';
import FormField from '@/components/FormField.vue'
import { Form } from 'vee-validate';

const authStore = useAuthStore();
const router = useRouter();

async function onSubmit(values) {
    const { fullname, telephone, dietary, medical } = values;

    await authStore.update(fullname, telephone, dietary, medical)
    router.push('/services/list');
}

</script>

<template>
    <div class="max-w-[350px] min-w-[348px]">
          <Form class="" @submit="onSubmit">
              <div class="flex flex-col gap-3 mt-4">
                <div class="relative z-0 w-full group">
                    <FormField name="fullname" display="Full Name" type="text" :value="authStore.user.fullname"
                    tooltip="Please enetr you full name"/>
                </div>
                <div class="relative z-0 w-full group">
                    <FormField name="telephone" display="Telephone" type="telephone" :value="authStore.user.telephone"
                    tooltip="Please enetr your contact telephone number" />
                </div>
                <div class="relative z-0 w-full group">
                    <FormField name="dietary" display="Dietary Information" type="text" :value="authStore.user.dietary"
                    tooltip="This will be used by the catering team" />
                </div>
                <div class="relative z-0 w-full group">
                    <FormField name="medical" display="Medical Information" type="text" :value="authStore.user.medical"
                    tooltip="This will be used by team captains and match organisers" />
                </div>
                <div class="relative z-0 w-full mt-2 group">
                <button
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
            </div>
             </div>
          </Form>
      </div>
  </template>