import { defineStore } from 'pinia';

export const useAdminFileStore = defineStore({
    id: 'adminfile',
    state: () => ({
        downloadinstructions: "",
        uploadinstructions: ""
    }),
    actions: {
        async setup(name) {
            try{
                switch(name)
                {
                    case "fixtures":
                        this.warning = "If you use the 'bulk' upload fixture file template feature it will replace the current fixture list and any changes you have made using this edit feature will be overwritten"
                        this.editinstructions = "Click the 'View Fixtures' button below to load curent fixtures, then you can edit and add new fixtures";
                        this.downloadinstructions = "Click the 'Download Template' button below to download a fixture template. This file can be edited in Excel (easy option) or Notepad. The file will be downloaded to your 'Downloads' folder on your PC or other device";
                        this.uploadinstructions = "After editing the file and making sure it has been saved as a '.csv' file (and not an .xls or .xlsx file). You can then use the 'Choose File' button to upload your fixtures. This will 'bulk' load your fixtues and replace the current fixture list";
                        break;
                }
            }catch (error){

            }
        }
    }
});