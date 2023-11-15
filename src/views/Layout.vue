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
    <header class="mt-6 flex justify-center">
        <Pagetitle 
        :returnPage="routeStore.returnPage"
        :name="routeStore.pageName"
        :backIcon="routeStore.backIcon">
            {{ routeStore.instructions }}
        </Pagetitle>
    </header>
    <body>
    <router-view /> 
    </body> 
</template>
