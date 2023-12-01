<script setup>
    const props = defineProps({
        text: String,
        file: String
    })

    const templateUrl = `${import.meta.env.VITE_API_URL}/templates/`+props.file
    
    function downloadTemplate()
    {
    const link = document.createElement('a');
      link.href = templateUrl;
     // link.setAttribute('download',props.file); 
      document.body.appendChild(link);
      link.click();
    }

</script>

<template>
    <button
    @click="downloadTemplate()"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {{text}}
    </button>
    
<!-- <a 
    class="text-primary transition duration-150 ease-in-out text-yellow-500"
    :href="templateUrl"
    target="_blank"
    download>
    {{text}}
</a> -->
</template>