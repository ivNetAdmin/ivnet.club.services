<script setup>
    const props = defineProps({
        folder: String,
        text: String
    })
    
 const baseUrl = `${import.meta.env.VITE_API_URL}/fileupload/`+props.folder

 const onFileChanged = async(e) => {
 
 const file = e.target.files[0]
 let formData = new FormData()
 formData.append('file',file)

 if(file.name.substring(file.name.length-4) != ".csv") 
 {
     alert("Only csv files allowed...");
     return;
 }

 return fetch(baseUrl, {
         method: 'POST',
         body: formData
     })
}; 

</script>

<template>

<input
    type="file"
    class="text-sm text-gray-400 
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-blue-700 file:text-white 
        hover:file:bg-blue-800"
        accept=".csv" 
        @change="onFileChanged($event)" 
  />


</template>