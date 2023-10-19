<script setup>
import TabbableTextarea from '@/components/TabbableTextarea.vue'
import { counter } from '@/stores/counterStore.js'

import { ref } from "vue"

let comment = ref('hello mum')
</script>

<template>
    <main>
        <form>
            <TabbableTextarea v-model="comment" class="text-black" style="width: 50%; height: 300px;" />
        </form>
    </main>

    <div>
        {{ counter.count }}

        <button @click="counter.add()">Add</button>
    </div>
</template>