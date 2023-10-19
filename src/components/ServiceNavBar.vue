<script setup>
import { ref } from "vue"

const showMobileMenu = ref(false)
</script>

<template>
<nav>
    <!-- desktop menu -->
    <div class="bg-indigo-600">
        <div class="max-w-7xl mx-auto">
            <div class="flex justify-between">
                <!-- left -->
                <div class="flex space-x-1">
                    <!-- logo -->
                    <div class="py-4 px-2">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-indigo-200  hover:text-indigo-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        
                    </div>
                    <!-- menu -->
                    <div class="hidden md:flex items-center space-x-1">
                        <a class="py-5 px-2 text-indigo-200 hover:text-indigo-400" href="/">Fixtures</a>
                        <a class="py-5 px-2 text-indigo-200 hover:text-indigo-400" href="/">Other</a>
                    </div>
                </div>
                <!-- button to show mobile menu -->
                <div class="md:hidden flex items-center">
                    <button @click="showMobileMenu = !showMobileMenu" class="py-5 px-2">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            class="w-8 h-8 text-indigo-200">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- mobile menu -->
    <div class="md:hidden bg-indigo-600" v-show="showMobileMenu">
        <a class="block py-2 px-4 text-indigo-200 hover:text-indigo-400" href="/">Fixtures</a>
        <a class="block py-2 px-4 text-indigo-200 hover:text-indigo-400" href="/">Other</a>
    </div>

</nav>

</template>