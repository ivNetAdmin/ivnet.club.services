import { reactive } from "vue"

export let userDetail = reactive({

    //state
    id: '',
    fullname: '',
    telephone: '',
    dietary: '',
    medical: '',

    //actions
    updateProp(propName, value){
        switch(propName)
        {
            case 'id':
                this.id = value
                break;           
            case 'fullname':
                this.fullname = value
                break;
            case 'telephone':
                this.telephone = value
                break;
            case 'dietary':
                this.dietary = value
                break;
            case 'medical':
                this.medical = value
                break;
        }
    }

})