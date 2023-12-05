<script setup>
defineProps({
    
})

import FormRow from '@/components/FormRow.vue'
import FormButton from '@/components/FormButton.vue'

import { useFixtureStore } from '@/stores';
const fixtureStore = useFixtureStore();
</script>

<template>
    <form @submit.prevent="fixtureStore.updateFixture()">
        <div class="flex flex-col justify-center items-center">
            <FormRow store="fixture" name="date" display="Date" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.date : null">
                Fixture date eg 13/09  
            </FormRow>
            <FormRow store="fixture" name="time" display="Time" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.time : null">
                Fixture time eg 14:30
            </FormRow>
            <FormRow store="fixture" name="opponent" display="Opponent" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.opponent : null">
                Opponent
            </FormRow>
            <FormRow store="fixture" name="location" display="Location" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.homeOrAway : null">
                Home or Away eg H or A
            </FormRow>            
            <FormRow store="fixture" name="kit" display="Kit" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.kit : null">
                Whites or Greys eg W or G
            </FormRow>            
            <FormRow store="fixture" name="trips" display="Trips" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.trips : null">
                No of trips
            </FormRow>
        </div>
        <FormButton 
            type="submit">Update Fixture
        </FormButton>
    </form>
    {{ fixtureStore.fixture }}
</template>