import { reactive } from "vue"

export let currentUser = reactive({

    //state
    authenticated: 'false',
    id: '',
    clubCode: '',
    clubName: '',
    userName: '',
    name: '',
    pw: '',
    rptpw: '',
    oldpw: '',
    email: '',

    //actions
    updateProp(propName, value){
        switch(propName)
        {
            case 'id':
                this.id = value
                break;            
            case 'userName':
                this.userName = value
                break;
            case 'pw':
                this.pw = value
                break;
            case 'rptpw':
                this.rptpw = value
                break;            
            case 'oldpw':
                this.oldpw = value
                break;
            case 'clubCode':
                this.clubCode = value.toUpperCase()
                break;
            case 'clubName':
                this.clubName = value
                break;
            case 'email':
                this.email = value
                break;
            case 'authenticated':
                this.authenticated = value
                break;
        }
    }

})