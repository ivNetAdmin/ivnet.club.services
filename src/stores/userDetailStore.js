import { reactive } from "vue"

export let userDetail = reactive({

    //state
    id: '',
    fullName: '',
    // clubName: '',
    // userName: '',
    // name: '',
    // pw: '',
    // rptpw: '',
    // email: '',

    //actions
    updateProp(propName, value){
        switch(propName)
        {
            case 'id':
                this.id = value
                break;            
            case 'fullName':
                this.fullName = value
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