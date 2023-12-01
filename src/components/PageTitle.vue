<script setup>

import { computed } from "vue";
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores';
import { useClubStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();
const clubStore = useClubStore();

const adminPage = computed(() => {
    return router.currentRoute.value.name.includes('admin');
});

const titleColour = computed(() => {
    if(router.currentRoute.value.name.includes('admin')) return 'text-red-600';
    return 'text-sky-600';
});

defineProps({
    name: String,
    backIcon: Boolean,
    returnPage : String 
});

function backTo(page)
{   
    if(page==='login')
    {
        authStore.user = null;
        clubStore.club = null;   
    }
    router.push({ name: page }) 
}

</script>

<template> 
<div class="max-w-[350px] min-w-[348px]">
    
<div>
    <div class="cursor-pointer flex" @click="backTo(returnPage)">
        <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="w-5 h-5 mt-1 mr-1 text-yellow-500"
        v-show="backIcon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-bold text-xl">ivNet Club Services</span>
    </div> 
</div>

    <div class="flex mt-2 mb-2">
        <div class="text-sm pt-2" :class="titleColour">{{name}} </div>
        <div v-if="authStore.user" class="border border-sky-900 rounded-full pt-1 pb-1 pl-2 pr-2 ml-2 cs-background">{{ clubStore.club.name }}</div>
    </div>
    <div class="text-sm text-gray-300"><slot/></div>
</div>
</template>