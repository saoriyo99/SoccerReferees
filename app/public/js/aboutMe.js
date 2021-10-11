const RandomPerson = {
    data() {
        return {
            "person": {
                name: {},
                dob: {},
                picture: {},
                location: {},
                email: {}
            }
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },
    methods: {
        fetchUserData() {
            // creates a response
            fetch('https://randomuser.me/api/')
            // handles the promise
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.person = parsedJSON.results[0];
            })
            .catch(err => {
                console.error(err)
            })
        }
    },
    created() {
        this.fetchUserData();
    }
}

Vue.createApp(RandomPerson).mount('#uniquePerson');