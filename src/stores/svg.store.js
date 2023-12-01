import { defineStore } from 'pinia';

export const useSVGStore = defineStore({
    id: 'svg',
    state: () => ({
        image: ""
    }),
    actions: {
         getServiceImage(service) {
   
            switch(service)
            {
                case 'fixtures':
                    return '<svg fill="#000000" class="w-12 h-12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 5h-4V4a1 1 0 0 0-2 0v1h-4V4a1 1 0 0 0-2 0v1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM8 7v.5a1 1 0 0 0 2 0V7h4v.5a1 1 0 0 0 2 0V7h3v3H5V7h3zM5 18v-6h14v6H5z"/></svg>'

                case 'rinkBooking':
                    return '<svg fill="#000000" class="w-16 h-16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm0-16a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7z"/><path d="M15.03 14.75a1 1 0 0 1-.5-.134l-3.03-1.75A1 1 0 0 1 11 12V7.5a1 1 0 0 1 2 0v3.923l2.531 1.461a1 1 0 0 1-.501 1.866z"/></svg>';
        
                case 'myInformation':
                    return '<svg fill="#000000" class="w-16 h-16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.474 19.013a8.941 8.941 0 0 0-4.115-4.89 6 6 0 1 0-8.717 0 8.941 8.941 0 0 0-4.115 4.89 11.065 11.065 0 0 0 1.63 1.59 6.965 6.965 0 0 1 4.728-5.275 1 1 0 0 0 .181-1.829 4 4 0 1 1 3.871 0 1 1 0 0 0 .181 1.829 6.965 6.965 0 0 1 4.726 5.272 11.059 11.059 0 0 0 1.63-1.587z"/></svg>';
        
            }
             },
             getBg(service) {
   
                switch(service)
                    {
                        case 'fixtures':
                            return 'bg-yellow-400 shadow-yellow-500/40';
                        break;

                        case 'rinkBooking':
                            return 'bg-yellow-400 shadow-yellow-500/40';
                        break;

                        case 'myInformation':
                            return 'bg-yellow-400 shadow-yellow-500/40';
                        break;
        
                    };
                 },
                
    }
});

