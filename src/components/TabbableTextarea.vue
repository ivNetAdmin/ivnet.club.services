<script setup>

defineProps({
    modelValue: String
})

let emit = defineEmits(['update:modelValue'])

function onTabPress(e){
  
  let textarea = e.target

  let val = textarea.value,
      start = textarea.selectionStart,
      end = textarea.selectionEnd

  textarea.value = val.substring(0,start) +'\t' + val.substring(end)

  textarea.selectionStart = textarea.selectionEnd = start + 1
}

function update(e)
{
    emit('update:modelValue',e.target.value)
}
  
</script>

<template>
    <textarea 
    @keyup="update"
    @keydown.tab.prevent="onTabPress" 
    v-text="modelValue"
    />
</template>