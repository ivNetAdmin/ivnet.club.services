<script setup>
defineProps({
    fixtures: null
})

import { useFixtureStore } from '@/stores';
const fixtureStore = useFixtureStore();

</script>

<template>
    <table class="ml-1 md:ml-2">
        <tr>
            <th class="text-start align-text-top text-gray-500">Date</th>
            <th class="text-start align-text-top text-gray-500">Time</th>
            <th class="text-start align-text-top text-gray-500">Opponent</th>
            <th class="text-start align-text-top text-gray-500">Loc</th>
            <th class="text-start align-text-top text-gray-500">Kit</th>
            <th class="text-start align-text-top text-gray-500">Trips</th>
            <th class="text-start align-text-top text-gray-500">
                <button 

                class="text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 md:py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                New</button>
            </th>
        </tr>
        <tr v-for="fixture in fixtures" :key="fixture.id">
            <td class="align-text-top text-gray-100">{{ fixture.date }}</td>
            <td class="align-text-top text-gray-100">{{ fixture.time }}</td>
            <td class="align-text-top text-gray-100">{{ fixture.opponent }}</td>
            <td class="align-text-top text-gray-100">{{ fixture.homeOrAway }}</td>
            <td class="align-text-top text-gray-100">{{ fixture.kit }}</td> 
            <td class="align-text-top text-gray-100">{{ fixture.trips }}</td> 
            <td><button 
                @click = fixtureStore.getFixture(fixture.id)
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit</button>
            </td>
        </tr>
    </table>
</template>