<script setup>
defineProps({
    fixture: null
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
            <FormRow store="fixture" name="competition" display="Competition" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.competition : null">
                Competion
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
            <FormRow store="fixture" name="rinks" display="Rinks" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.rinks : null">
                Rinks
            </FormRow>
            <FormRow store="fixture" name="postcode" display="PostCode" type="text" :value="fixtureStore.fixture ? fixtureStore.fixture.postCode : null">
                PostCode
            </FormRow>
        </div>

        <div class="grid gap-14 md:grid-cols-2 md:gap-5">
            
<div>
        <input
    class="relative float-left -ml-[0rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
    type="checkbox"
    @click="fixtureStore.setDelete()"
    :value="fixtureStore.deleteme"
    id="checkboxDefault" />
  <label
    class="inline-block pl-[0.15rem] hover:cursor-pointer"
    for="checkboxDefault">
    Click and Update to DELETE
  </label>
</div>
<FormButton 
            type="submit">Update Fixture
        </FormButton>
    </div>
    </form>
    
</template>