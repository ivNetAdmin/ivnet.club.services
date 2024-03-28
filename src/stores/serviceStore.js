import { reactive } from "vue"

export let service = reactive({

    //state
    url: 'http://ivnet-dev.co.uk/',
    key: '253D3FB468A0E24677C28A624BE0F939',
    iv: '0000000000000000',
    reg: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    })


    //  http://localhost:44335/   http://ivnet-dev.co.uk/   http://localhost:3001/