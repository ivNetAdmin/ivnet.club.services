<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
    title: String,
    link: String,
})

function getService(link)
{
    router.push({ name: link }) 
}
</script>

<template>
    <div>
    <div
        class="mx-3 mt-6 flex flex-col  rounded-lg cursor-pointer
        bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
            <div class="pt-6 px-6 pb-3 flex flex-col justify-between flex-1">
                <div @click="getService(link)">
                    <div class="flex justify-left">
                        <slot name="icon"/>
                        <h5 class="mb-2 mt-6 ml-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {{ title }}
                        </h5>
                    </div>
                    <p class="mt-2 text-base text-neutral-600 dark:text-neutral-200">
                        Manage club services, like user roles, resetting passwords, adding fixtures, etc
                    </p>
                </div>
            </div>
            <footer class="ml-6 mb-3"  >
                <p class="text-base text-neutral-600 dark:text-neutral-200">
                    link
                </p>
            </footer>
      
    </div>

    <div
        class="mx-3 mt-6 flex flex-col  rounded-lg cursor-pointer
        bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
            <div class="pt-6 px-6 pb-3 flex flex-col justify-between flex-1">
                <div @click="getService(link)">
                    <div class="flex justify-left">
                        <slot name="icon"/>
                        <h5 class="mb-2 mt-6 ml-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {{ title }}
                        </h5>
                    </div>
                    <p class="mt-2 text-base text-neutral-600 dark:text-neutral-200">
                        Manage club services, like user roles, resetting passwords, adding fixtures, etc
                    </p>
                </div>
            </div>
            <footer class="ml-6 mb-3"  >
                <p class="text-base text-neutral-600 dark:text-neutral-200">
                    link
                </p>
            </footer>
      
    </div>
    </div>
</template>

