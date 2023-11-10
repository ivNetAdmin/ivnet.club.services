<script setup>
import { onUpdated, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/stores';

import Pagetitle from '@/components/Pagetitle.vue';

const routeStore = useRouteStore();
const route = useRoute();

onUpdated(() => {
    routeStore.setup(route.name);
});

onMounted(() => {
    routeStore.setup(route.name);
});

</script>

<template>
    <header class=" border-green-600 sm:w-3/4 md:w-1/3">
        <Pagetitle 
        :returnPage="routeStore.returnPage"
        :name="routeStore.pageName"
        :backIcon="routeStore.backIcon">
            {{ routeStore.instructions }}
        </Pagetitle>
    </header>
    <body class=" border-red-600 sm:w-3/4 md:w-1/3 w-full">
    <router-view /> 
    </body> 
</template>
