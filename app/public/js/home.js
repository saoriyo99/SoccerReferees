const HomePage = {
    data() {
        return {
            "games": [],
            "referees": [],
            "selectedGame": null,
            "refereeForm": {}
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
            this.fetchGameData(this.selectedGame);
        },
        fetchGameData() {
            fetch('/api/game/' )
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchRefereeData(s) {
            console.log("Fetching referees for", s);
            // creates a response
            fetch('/api/referee/?game=' + s.id)
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
        postNewReferee(evt) {
            this.refereeForm.gameid = this.selectedGame.gameid;
            console.log("Positing", this.refereeForm);

            fetch('api/referee/create.php', {
                method: 'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.referees = json;
                this.refereeForm = {}
            })
        }
    },
    created() {
        this.fetchGameData();
    }
}

Vue.createApp(HomePage).mount('#uniqueHome');