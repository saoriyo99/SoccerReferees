const HomePage = {
    data() {
        return {
            "games": [],
            "selectedGame": null,
            "gameForm": {},
            "pickedStatus": null
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
                .format('D MMM YYYY');
        }
    },
    methods: {
        fetchGameData() {
            fetch('/api/game/')
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch((err) => {
                console.error(err);
            })
        },
        postNewGame(evt) {
            console.log("Positing", this.gameForm);

            fetch('api/game/create.php', {
                method: 'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                this.games = json;
                this.gameForm = {}
            })
        },
        postGame(evt) {
            if (this.selectedGame) {
                this.postEditGame(evt);
            } else {
                this.postNewGame(evt);
            }
        },
        postEditGame(evt) {
            this.gameForm.gameid = this.selectedGame.gameid;

            console.log("Editing!", this.gameForm);

            fetch('api/game/update.php', {
                method: 'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;

                // reset the form
                this.handleResetEdit();
            });
        },
        postDeleteGame(o) {
            if (!confirm("Are you sure you want to delete " + o.location + " from the table?")) {
                return;
            }

            console.log("Delete!", o);

            fetch('api/game/delete.php', {
                method: 'POST',
                body: JSON.stringify(o),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;

                // reset the form
                this.handleResetEdit();
            });
        },
        handleResetEdit() {
            this.selectedGame = null;
            this.gameForm = {};
        },
        handleEditGame(g) {
            this.selectedGame = g;
            this.gameForm = Object.assign({}, this.selectedGame);
        }
    },
    created() {
        this.fetchGameData();
    }
}

Vue.createApp(HomePage).mount('#uniqueHome');