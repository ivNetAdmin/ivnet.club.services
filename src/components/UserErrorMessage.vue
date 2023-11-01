<script setup>
    defineProps({
        msg: String,
    })
</script>

<template>
   <div class="mt-2 text-sm text-red-600">{{ msg }}</div>
</template>