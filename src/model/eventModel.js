

class EventModel{
    constructor(title , type , date , time ,  venue , price , imageUrl, desc ,id, wrap){
        this.title = title;
        this.type = type;
        this.date = date ;
        this.time = time;
        this.venue = venue;
        this.price = price;
        this.imageUrl = imageUrl;
        this.desc = desc,
        this.id = id;
        this.wrap = wrap;
    }

    static getOngoingEvents(){
        const currentDate = new Date();
        const onGoingEvents = events.filter(event => new Date(`${event.date}T${event.time}`) === currentDate);
        return onGoingEvents;

    }

    static getUpcomingEvents(){
        const currentDate = new Date();
        console.log(currentDate);
        
 
        const upComingEvents = events.filter(event => new Date(`${event.date}T${event.time}`)  > currentDate );
        return upComingEvents;
    }

    static getAll(wraped){
        const unCompletedEvents = events.filter(event => event.wrap === wraped);
        return unCompletedEvents;
    }

    static getEvent(id){
        const event = events.find(e=>e.id == id);
        return event;
    }

    static updateEventDetails(id , reqBody){
        let event = events.find(e=>e.id == id);
        event.title = reqBody.title;
        event.date = reqBody.date;
        event.time = reqBody.time;
        event.venue = reqBody.venue;
        event.price = reqBody.price;
        event.imageUrl = reqBody.imageUrl;
        event.desc = reqBody.desc;

        return events;
    }

    static addEvent(reqBody){

        const id = events.length +1;
        const newEvent = new EventModel(reqBody.title , reqBody.type , reqBody.date , reqBody.time , 
        reqBody.venue , reqBody.price , reqBody.imageUrl , reqBody.desc , id , false);
        console.log("newEvent :" , newEvent)
        events.push(newEvent);

        return events;
    }


}

export let events = [
    new EventModel("Spring Festival", "Festival","2024-05-15" , "14:00:00", "Campus Grounds", "free", "https://media.istockphoto.com/id/1415765145/vector/music-dance-poster-summer-party-with-street-food-spring-city-concert-or-fest-happy-night.jpg?s=612x612&w=0&k=20&c=kw4odrRSuowuj7jDrm_2gop4txsBXU_brhL94UYuFRE=", "Join us for the Spring Festival celebration!", 1 , false),
    new EventModel("Career Fair", "Fair", "2024-06-20","09:30:00", "Main Auditorium", "free","https://media.istockphoto.com/id/1390778429/vector/career-fair-speech-bubble-banner-vector-with-copy-space-for-business-marketing-flyers.jpg?s=612x612&w=0&k=20&c=o8RtsAM3aPPMHpTxkJi30GeU4bIPGzgUHMCNi04T5pc=https://media.istockphoto.com/id/1390778429/vector/career-fair-speech-bubble-banner-vector-with-copy-space-for-business-marketing-flyers.jpg?s=612x612&w=0&k=20&c=o8RtsAM3aPPMHpTxkJi30GeU4bIPGzgUHMCNi04T5pc=" ,"Join us at the Career Fair to explore job opportunities.", 2 , false),
    new EventModel("Coding Competition", "Competition", "2024-07-25", "08:45:00" ,"Computer Lab", 10, "https://media.istockphoto.com/id/1212943556/vector/modern-technology-colorful-background-abstract-high-tech-banner-with-place-for-text-digital.jpg?s=612x612&w=0&k=20&c=Q5-Iy2Jd2eTDsesBxbR_kPtqOYkH0W0kwoz-npgOQQg=", "Test your coding skills at our annual Coding Competition!", 3, false),
    new EventModel("Art Exhibition", "Exhibition", "2024-08-10","08:15:00" ,"Art Gallery", "free", "https://media.istockphoto.com/photos/exhibition-in-museum-picture-id994317768?k=20&m=994317768&s=612x612&w=0&h=K6wuhzSbBGdXpL4mXdoMSeD7owIUmjT4OUU5W5kQnBw=", "Explore stunning artworks at our Art Exhibition!", 4, false),
    new EventModel("Book Club Meeting", "Meeting", "2024-09-05","22:00:00", "Library", "free", "https://media.istockphoto.com/photos/group-of-people-in-book-club-meeting-picture-id1185581219?k=20&m=1185581219&s=612x612&w=0&h=bN0lEbhF7umBVUO3dLApVHqDvW11F0XKjjqsbZQ-b74=", "Join our Book Club and discuss your favorite reads!", 5 ,true),
    new EventModel("Food Festival", "Festival", "2024-11-15","16:00:00", "City Park", "free", "https://media.istockphoto.com/photos/food-festival-picture-id184524008?k=20&m=184524008&s=612x612&w=0&h=TrjVfuDcLX9CEwgWwvI5yMDNn42QGoPf9tX6yF0yYdw=", "Indulge in delicious cuisines at the Food Festival!", 6 , true)

];


export default EventModel;
