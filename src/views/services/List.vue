<script setup>
import { onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

import { useSVGStore } from '@/stores';
import { useClubServiceStore } from '@/stores';

const svgStore = useSVGStore();
const clubServiceStore = useClubServiceStore()

function getService(link)
{
    router.push({ name: link }) 
}

onMounted( async () => {
    if(clubServiceStore.clubServices.length==0)
    {
        await clubServiceStore.getClubServices();
    }
});

</script>

<template>
    <div class="h-full min-h-screen w-full pt-12 p-4">
        <div class="grid gap-14 md:grid-cols-3 md:gap-5">
            <div class="rounded-xl bg-white p-6 text-center shadow-xl cursor-pointer" 
            @click="getService(clubService.route)" 
            v-for="clubService in clubServiceStore.clubServices" :key="clubService.id">
                <div
                    :class="svgStore.getBg(clubService.svg)"
                    class="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg border">
                    <div  v-html="svgStore.getServiceImage(clubService.svg)" />
                </div>
                <h1 class="text-sky-600 mb-3 text-xl font-medium lg:px-14">{{ clubService.name }}</h1>
                <p class="px-4 text-gray-500">{{ clubService.description }}</p>
            </div>
        </div> 
    </div>
</template>

<!--div v-html="svgStore.getServiceImage('home')" /-->

