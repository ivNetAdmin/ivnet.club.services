<script setup>
    import { currentUser } from '@/stores/currentUserStore.js'
    import { userDetail } from '@/stores/userDetailStore.js'
    
    import { useFixtureStore } from '@/stores';
    const fixtureStore = useFixtureStore();   
  

   const props = defineProps({
        name: String,
        display: String,
        type: String,
        required: Boolean,
        toupper: String,
        msg: String,
        value: String,
        store: String
    })

    function setUserProperty(e)
    {
        let inputVal = e.target
        switch(props.store)
        {
            case 'user':
                currentUser.updateProp(inputVal.name, inputVal.value);
                userDetail.updateProp(inputVal.name, inputVal.value);
                break;
            case 'fixture':
                fixtureStore.updateProp(inputVal.name, inputVal.value);
        }
    }
</script>

<template>
    <input 
    @keyup="setUserProperty"
    :type="type" 
    :name="name" 
    :id="name" 
    :class="toupper"
    class="block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
    placeholder=" " 
    :required="required" 
    :value="value"/>

    <label :for="name" 
    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >{{display}} <span v-text="msg" class="text-red-600"></span></label>            
</template>
