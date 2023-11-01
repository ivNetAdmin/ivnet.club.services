<script setup>
import PageTitle  from '@/components/PageTitle.vue'
import { ref, onMounted } from "vue"
import { currentUser } from '@/stores/currentUserStore.js'
import { service } from '@/stores/serviceStore.js'

//let currentUserLink = "personalInfo?"+currentUser.id
let serviceUrl = service.url

let currentusername = currentUser.userName

var bookings = ref([])
var displayWeek = ref('')

onMounted(() => {
    getThisWeeksBookings()
})

function getThisWeeksBookings()
{
    var thisWeek = getWeekNo()  
    
    fetch(serviceUrl + 'rinkbookings?weekid='+thisWeek)
            .then(response => response.json())
            .then(json => setBookings(json));
}

function setBookings(json)
{
    if(json.length > 0)
    {
        displayWeek.value = json[0].displayWeek
    }
    bookings.value = json
}

function getWeekNo()
{
    var date = new Date();
    date.setHours(0, 0, 0, 0);
  
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
 
    var week1 = new Date(date.getFullYear(), 0, 4);

    return 1 + Math.round((((date.getTime() - week1.getTime()) / 86400000) - 3 + (week1.getDay() + 6) % 7) / 7);
    }

function isBooked(bookedBy)
{
    if( bookedBy ===null || bookedBy.length === 0) return false;
    return true;
}

function book(e)
{
    fetch(serviceUrl+e.target.id, {
        method: "PATCH",
        body: JSON.stringify({
        "id": e.target.id,
        "bookedBy": currentUser.userName,
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())
      .then(json => updateBooking(json));

}

function updateBooking(json)
{
    var booking = filterById(bookings.value['bookings'], json.id);
   
    booking.bookedBy = currentusername
}

function filterById(jsonObject, id) {
    return jsonObject.filter(
        function(jsonObject) {
            return (jsonObject['id'] == id);
        })[0];
}
</script>

<template>
       {{ serviveUrl }}
   <div class="flex flex-col items-center justify-center m-6">
      <div class="sm:w-3/4 md:w-1/3 w-full">
            <PageTitle name="Rink Booking">
                Book a Rink
            </PageTitle>   
            
            <div class="flex flex-col justify-center items-left">
                <div class="mb-4"><span>Week:</span><span class="ml-2">{{ displayWeek }}</span></div>

                <div v-for="booking in bookings" :key="booking.id">
                    <div class="flex mb-4">
                        <div class="w-1/6 h-12 first-letter:mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                            <input
                                class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent disabled:opacity-60 dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                type="checkbox"
                                value=""
                                :id=booking.id
                                :checked=isBooked(booking.bookedBy)
                                :disabled=isBooked(booking.bookedBy) 
                                @click="book"/>
                        </div>
                        <div class="w-1/6 h-12">{{ booking.day }}</div>
                        <div class="w-2/6 h-12">{{ booking.time }}</div>
                        <div class="w-2/6 h-12">{{ booking.bookedBy }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>




  