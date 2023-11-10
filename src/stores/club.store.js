import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/clubs`;

export const useClubStore = defineStore({
    id: 'club',
    state: () => ({
        club: "",
        clubCodes: []
    }),
    actions: {
        async getClubCodes() {
            try{
                const clubs = await fetchWrapper.get(`${baseUrl}`); 
                var clubCodes = [];

                clubs.forEach(function(club){
                    clubCodes.push(club.code);
                });
                this.clubCodes = clubCodes;

            }catch (error){
                alert(error)
            }
        },
        async getClub(clubCode) {
            try{
                const club = await fetchWrapper.get(`${baseUrl}/code/${clubCode}`); 
                this.club = club;
            }catch (error){
                alert(error)
            }
        },
    }
})