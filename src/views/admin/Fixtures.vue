<script setup>
import { onMounted } from "vue";
import FileDownload  from '@/components/FileDownload.vue'
import FileUpload  from '@/components/FileUpload.vue'
import { useAdminFileStore } from '@/stores';

const adminFileStore = useAdminFileStore();

const folder = 'fixtures';
const file = 'fixtures.csv';

onMounted(() => {
    adminFileStore.setup(folder);
});

function editFixtures()
{

}

</script>

<template>
 <div class="h-full min-h-screen w-full pt-12 p-4">
        <div class="grid gap-14 md:grid-cols-3 md:gap-5">
            <div class="rounded-xl bg-white p-6 text-center shadow-xl"> 
                <p class="px-4 text-gray-500">{{ adminFileStore.editinstructions }}</p>
                <p class="px-4 text-red-500">{{ adminFileStore.warning }}</p>
                <div class="text-centre sticky top-[100vh] mt-4 mr-6">
                    <button
                    @click="editFixtures()"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Fixtures
                    </button>
                </div>
            </div>
            <div class="rounded-xl bg-white p-6 text-center shadow-xl"> 
                <p class="px-4 text-gray-500">{{ adminFileStore.downloadinstructions }}</p>
                <div class="text-centre sticky top-[100vh] mt-4 mr-6">
                    <FileDownload :file="file" text="Download Template"/>
                </div>
            </div>
            <div class="rounded-xl bg-white p-6 text-center shadow-xl"> 
                <p class="px-4 text-gray-500">{{ adminFileStore.uploadinstructions }}</p>
                <div class="text-centre sticky top-[100vh] mt-4 mr-6">
                    <FileUpload :folder=folder /> 
                </div>
            </div>
        </div> 
    </div>

</template>