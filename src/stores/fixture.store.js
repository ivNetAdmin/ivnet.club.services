import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/fixtures`; 

export const useFixtureStore = defineStore({
    id: 'fixture',
    state: () => ({
        fixtures: null,
        fixture: null,
        deleteme: ''
    }),
    actions: {
        updateProp(propName, value){
            switch(propName)
            {
                case 'date':
                    this.fixture.date = value
                    break;
                case 'time':
                    this.fixture.time = value
                    break;
                case 'competition':
                    this.fixture.competition = value
                    break;
                case 'opponent':
                    this.fixture.opponent = value
                    break;            
                case 'location':
                    this.fixture.homeOrAway = value
                    break;
                case 'kit':
                    this.fixture.kit = value
                    break;
                case 'rinks':
                    this.fixture.rinks = value
                    break;                
                case 'postcode':
                    this.fixture.postCode = value
                    break;
            }
        },
        async setDelete()
        {
            this.deleteme = 'checked'
        },
        async getFixtures() {
            try{
                this.fixtures = await fetchWrapper.get(`${baseUrl}`); 
            }catch (error){
                alert(error)
            }
        },
        async getFixture(id)
        {
            try{                
                const fixture = await fetchWrapper.get(`${baseUrl}/${id}`); 
                this.fixture = fixture;
                if(id==0) this.clearInput()
            }catch (error){
                alert(error)
            }
        },
        async updateFixture()
        {
            var action = "PATCH"
            var url = baseUrl
            if(this.fixture.id==null)
            {
                action = "POST"
                this.fixture.id='0'
            }

            if(this.deleteme=='checked')
            {
                url = baseUrl + '/'+this.fixture.id
                this.deleteme = ''
                action = "DELETE"                
            }

            if(action=="PATCH")
            {
                url = baseUrl + '/'+this.fixture.id
            }

            fetch(url, {
                method: action,
                body: JSON.stringify(
                    this.fixture
                ),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(this.getFixtures()).then(this.clearInput())
        },
        clearInput()
        {
            this.fixture.date = ''
            this.fixture.time = ''
            this.fixture.competition = ''
            this.fixture.opponent = ''
            this.fixture.homeOrAway = ''
            this.fixture.kit = ''
            this.fixture.rinks = ''
            this.fixture.postCode = ''
            this.deleteme = ''
        }
    }
});