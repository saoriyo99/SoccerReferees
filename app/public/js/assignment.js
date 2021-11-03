const ConstApp = {
    data() {
      return {
        "assignments": [],
        "assignmentForm": {},
        "games": [],
        "selectedGame": null,
        "referees": [],
        "selectedAssignment": null
      }
    },
    computed: {},
    methods: {
        // prettyData(d) {
        //     return dayjs(d)
        //     .format('D MMM YYYY')
        // },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchGameData() {
            fetch('/api/game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })

            //Get all referees to use in next step
            this.fetchRefereeData()
        },
        fetchAssignmentData(g) {
            fetch('/api/assignment/?game=' + g.gameid)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            //Sort referees by name
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            this.referees.sort(function(a,b) {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            })
        },
        selectGame(g) {
            console.log("test");
            if (g == this.selectedGame) {
                console.log("test1");
                return;
            }
            console.log("test2");
            this.selectedGame = g;
            this.assignments = [];
            this.fetchAssignmentData(this.selectedGame);
        },
        postNewAssignment(evt) {
            //Make sure game id is the same
            this.assignmentForm.gameid = this.selectedGame.gameid;
            //All new status are assigned
            this.assignmentForm.refstatus = "Assigned";
            console.log("Posting!", this.assignmentForm);
            fetch('api/assignment/create.php', {
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                // reset the form
                this.assignmentForm = {};
              });
        },
        getRefereeName(refId) {
              x = this.referees.find(r => r.refereeid == refId);
              console.log("in getRefereeName, refname: ", x.refname);
              return x.refname;
        },
        postAssignment(evt) {
            if (this.selectedAssignment) {
                this.postEditAssignment(evt);
            } else {
                this.postNewAssignment(evt);
            }
        },
        postEditAssignment(evt) {
            this.assignmentForm.assignmentid = this.selectedAssignment.assignmentid;
            this.assignmentForm.gameid = this.selectedAssignment.gameid;
            this.assignmentForm.refereeid = this.selectedAssignment.refereeid;        
            
            console.log("Editing!", this.assignmentForm);
    
            fetch('api/assignment/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.handleResetEdit();
              });
        },
        postDeleteAssignment(a) {  
            if ( !confirm("Are you sure you want to delete the assignment with " + this.getRefereeName(a.refereeid) + "?") ) {
                return;
            }  
            console.log("Delete!", a);
    
            fetch('api/assignment/delete.php', {
                method:'POST',
                body: JSON.stringify(a),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.handleResetEdit();
            });
        },
        handleEditAssignment(a) {
            this.selectedAssignment = a;
            this.assignmentForm = Object.assign({}, this.selectedAssignment);
        },
        handleResetEdit() {
            this.selectedAssignment = null;
            this.assignmentForm = {};
        }
    },
    created() {
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(ConstApp).mount('#assignmentApp');