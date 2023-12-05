import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/fixtures`; 

export const useFixtureStore = defineStore({
    id: 'fixture',
    state: () => ({
        fixtures: null,
        fixture: null,
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
                case 'opponent':
                    this.fixture.opponent = value
                    break;            
                case 'location':
                    this.fixture.homeOrAway = value
                    break;
                case 'kit':
                    this.fixture.kit = value
                    break;
                case 'trips':
                    this.fixture.trips = value
                    break;
            }
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
            }catch (error){
                alert(error)
            }
        },
        async updateFixture()
        {
            fetch(baseUrl + '/'+this.fixture.id, {
                method: "PATCH",
                body: JSON.stringify(
                    this.fixture
                ),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(this.getFixtures())
        }
    }
});