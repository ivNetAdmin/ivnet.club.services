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
                    case "my-information":
                        this.instructions = "Please enter your details";
                        this.pageName = "My Information";
                        this.backIcon = true;
                        this.returnPage = "service-list";
                        break;
                    case "fixtures":
                        this.instructions = "Select fixture to update your availability";
                        this.pageName = "Fixtures";
                        this.backIcon = true;
                        this.returnPage = "service-list";
                        break;
                    case "admin-fixtures":
                        this.instructions = "As an admin you can edit and add new fixtures or use the 'bulk' load feature to add a list of fixtures by uploading the template '.csv' file provided";
                        this.pageName = "Admin Fixtures";
                        this.backIcon = true;
                        this.returnPage = "service-list";
                        break;
                }
            }catch (error){

            }
        }
    }
});