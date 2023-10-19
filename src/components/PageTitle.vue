<script setup>
import { currentUser } from '@/stores/currentUserStore.js'

import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
    name: String,
    backIcon : {
        type: Boolean,
        default: true
    }
})

function backToServices()
{
    router.push({ name: 'services' }) 
}
</script>

<template>
    <header>
        <div class="flex justify-left cursor-pointer" @click="backToServices()">
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-5 h-5 mt-1 mr-1 text-yellow-500"
            v-show="backIcon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="font-bold text-xl">ivNet Club Services</h2>
        </div>

        <p class="text-sm text-sky-800 mb-2">{{name}} <span class="text-yellow-500">{{ currentUser.clubName }}</span></p>
        <p class="text-sm text-gray-300 mb-6"><slot/></p>
    </header>
</template>