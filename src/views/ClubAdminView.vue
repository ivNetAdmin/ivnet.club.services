<script setup>
    import PageTitle  from '@/components/PageTitle.vue';
</script>

<template>
    <div class="flex flex-col items-center justify-center m-6">
        <div class="sm:w-3/4 md:w-3/4 w-full">
            <PageTitle name="Club Admin Tools">
                Please selection the Admin lool you require from the list
            </PageTitle>   
            
            <div>
                <select class="text-gray-600">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
            </div>

        </div>
    </div>
</template>

