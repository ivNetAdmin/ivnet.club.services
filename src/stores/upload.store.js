import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/fileupload`;

export const useUploadStore = defineStore({

    id: 'upload',
    state: () => ({
        file: ""
    }),
    actions: {
        async uploadFixtureFile(data) {
            try{
                const file =  await fetchWrapper.post(`${baseUrl}`, data);
            }catch (error){
                alert(error)
            }
        },
    }
});