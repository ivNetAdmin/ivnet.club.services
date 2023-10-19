<script setup>
    defineProps({
        route: String,
        display: String,
    })
</script>

<template>
    <RouterLink
            :to="route"
            class="text-primary transition duration-150 ease-in-out text-yellow-500"
    >{{display}}</RouterLink>
</template>