<script setup>

import { Field } from 'vee-validate';
defineProps({
    name: String,
    display: String,
    type: String,
    msg: String,
    tooltip: String,
    alttooltip: String,
    isClubCodeInValid: Boolean
});

</script>

<template>

    <Field 
        :id="name" 
        :name="name" 
        :type="type" 
        :disabled="isClubCodeInValid"
        class="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        placeholder=" "/>
        <div class="text-red-600 text-xs">{{ msg }}</div>
        <label 
        :for="name" 
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >{{ display }}</label>
        <span v-show="!isClubCodeInValid" class="text-yellow-300 text-xs pointer-events-none absolute -bottom-4 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100">
        {{ tooltip }}
        </span>
        <span v-show="isClubCodeInValid" class="text-yellow-300 text-xs pointer-events-none absolute -bottom-4 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100">
        {{ alttooltip }}
        </span>
</template>