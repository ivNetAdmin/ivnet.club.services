import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

import { useClubStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/members`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        returnUrl: null,
        eMailList: [],
        userNameList: []
    }),
    actions: {
        async login(username, password) {
            try{
                const loginUser = await fetchWrapper.get(`${baseUrl}/authenticate/${username}/${password}`); 
                this.user = loginUser;
                const clubStore = useClubStore();
                clubStore.getClub(loginUser.clubCode);

            }catch (error){
                alert(error)
            }
        },

        async register(clubcode, username, email, password) {
            try{
                const loginUser =  await fetchWrapper.post(`${baseUrl}`, {clubcode, username, email, password});
                this.user = loginUser;
                const clubStore = useClubStore();
                clubStore.getClub(loginUser.clubCode);

            }catch (error){
                alert(error)
            }
        },
     
        async update(fullname, telephone, dietary, medical) {
            try{
                const loginUser = await fetchWrapper.patch(`${baseUrl}/${this.user.id}`, {fullname, telephone, dietary, medical});
                this.user = loginUser;
            }catch (error){
                alert(error)
            }
        },
        
        async getClubEmails(clubcode){
            try{
                var members = await fetchWrapper.get(`${baseUrl}/clubcode/${clubcode}`);  
                var emails = [];
                var usernames = [];

                members.forEach(function(member){
                    emails.push(member.email);
                    usernames.push(member.userName);
                });

                this.eMailList = emails;
                this.userNameList = usernames; 
                
             }catch (error){
                alert(error)
             }
        },

        async checkEmail(email,clubcode){
            try{
                const member = await fetchWrapper.get(`${baseUrl}/email/${email}/clubcode/${clubcode._value}`);  
                return member;

             }catch (error){
               // alert(error)
             }
        }
    }
}); 