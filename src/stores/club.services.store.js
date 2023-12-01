import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/clubservices`;

export const useClubServiceStore = defineStore({

    id: 'clubservices',
    state: () => ({
        clubServices: []
    }),
    actions: {
        async getClubServices() {
            try{
                this.clubServices = await fetchWrapper.get(`${baseUrl}`); 

            }catch (error){
                alert(error)
            }
        },
    }
});