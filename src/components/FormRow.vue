<script setup>
    import FormToolTip from '@/components/FormToolTip.vue'
    import FormTextInput from '@/components/FormTextInput.vue'

    //const props = 
    defineProps({
        name: String,
        display: String,
        type: String,
        required: Boolean,
        toupper: String,
        msg: String,
        value: String
    })
</script>

<template>
    <div class="relative z-0 w-full mb-6 group">
        <FormTextInput :name="name" :display="display" :type="type" :required="required" :msg="msg" :toupper="toupper" :value="value"/>
        <FormToolTip>
            <slot />
        </FormToolTip>  
    </div>
</template>