import { reactive } from "vue"

export let service = reactive({

    //state
    url: 'http://localhost:44335/',
    key: '253D3FB468A0E24677C28A624BE0F939',
    iv: '                ',
    reg: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$'
    })


    //  http://localhost:44335/   http://ivnet-dev.co.uk/   http://localhost:3001/