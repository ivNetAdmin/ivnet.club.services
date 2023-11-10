import { defineStore } from 'pinia';

export const useRouteStore = defineStore({

    id: 'route',
    state: () => ({
       pageName: "",
       instructions: "",
       backIcon: null
    }),
    actions: {
        async setup(name) {
                
            try{
                switch(name)
                {
                    case "login":
                        this.instructions = "Please log in to use the service you require";
                        this.pageName = "Log In";
                        this.backIcon = false;
                        this.returnPage = "";
                        break;
                    case "register":
                        this.instructions = "Please fill in the form to register";
                        this.pageName = "Register";
                        this.backIcon = true;
                        this.returnPage = "login";
                        break;
                    case "service-list":
                        this.instructions = "Please select the service you want";
                        this.pageName = "Club Services";
                        this.backIcon = true;
                        this.returnPage = "login";
                        break;
                }
            }catch (error){

            }
        }
    }
});