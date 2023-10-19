<script setup>
import PageTitle  from '@/components/PageTitle.vue'
import ServiceCard  from '@/components/ServiceCard.vue'
import { currentUser } from '@/stores/currentUserStore.js'
import FormRouter from '@/components/FormRouter.vue'

let currentUserName = currentUser.userName
</script>

<template>
    <div class="flex flex-col items-center justify-center m-6">
        <div class="sm:w-3/4 md:w-3/4 w-full">
            <PageTitle name="Club Services" :backIcon="false">
                Please select the service you want
            </PageTitle>   
            
            <div class="grid-cols-1 sm:grid md:grid-cols-3">
                <ServiceCard :title="currentUserName" link="personaldetails">
                    <template v-slot:icon>
                        <svg fill="#000000" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" class="w-20 h-20">
                            <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 14.5 C 32.4765 14.5 36.0390 18.4375 36.0390 23.1719 C 36.0390 28.2109 32.4999 32.0547 27.9999 32.0078 C 23.4765 31.9609 19.9609 28.2109 19.9609 23.1719 C 19.9140 18.4375 23.4999 14.5 27.9999 14.5 Z M 42.2499 41.8750 L 42.3202 42.1797 C 38.7109 46.0234 33.3671 48.2266 27.9999 48.2266 C 22.6093 48.2266 17.2655 46.0234 13.6562 42.1797 L 13.7265 41.8750 C 15.7655 39.0625 20.7812 35.9922 27.9999 35.9922 C 35.1952 35.9922 40.2343 39.0625 42.2499 41.8750 Z"/>
                        </svg>
                    </template>
                    <template v-slot:description>
                        Update your personal information. Name, telephone number, dietary and medical guidance. 
                        Some of this information maybe shared with the team captian if you play in matches.
                    </template>
                    <template v-slot:link>
                        <FormRouter route="cpw" display="Change Password" />  
                    </template>
                </ServiceCard>

                <ServiceCard title="Fixture List" link="fixturelist">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" class="w-20 h-20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                        </svg>
                    </template>
                    <template v-slot:description>
                        Here is a list of friendly fixture, date, time, kit and location. It also allows you to put your name down for selection for a given fixture.
                    </template>
                </ServiceCard>
            </div>

        </div>
    </div>
</template>




  