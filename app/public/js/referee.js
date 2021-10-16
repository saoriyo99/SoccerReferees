const UniqueReferee = {
    data() {
        return {
            "games": [],
            "referees": [],
            "selectedGame": null,
            "offerForm": {}
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectGame(s) {
            // Don't fetch same game multiple times
            if (s == this.selectedGame) {
                return;
            }
            // Set Game
            this.selectedGame = s;
            // Clear out referees array
            this.referees = [];
            // Get referees from student
            this.fetchOfferData(this.selectedStudent);
        },
        fetchStudentData() {
            // creates a response
            fetch('/api/student/')
            // handles the promise, either completes or it doesn't
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.games = parsedJSON;
            })
            .catch(err => {
                console.error(err)
            })
        },
        fetchOfferData(s) {
            console.log("Fetching referees for", s);
            // creates a response
            fetch('/api/offer/?student=' + s.id)
            // handles the promise
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.referees = parsedJSON;
            })
            .catch(err => {
                console.error(err)
            })
        },
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
        },
        postNewOffer(evt) {
            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Positing", this.offerForm);

            fetch('api/offer/create.php', {
                method: 'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.referees = json;
                this.offerForm = {}
            })
        }
    },
    created() {
        // this.fetchUserData();
        this.fetchStudentData();
    }
}

Vue.createApp(UniqueReferee).mount('.uniqueRefClass');