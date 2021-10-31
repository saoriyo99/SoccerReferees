const SomeApp = {
    data() {
      return {
        "referees": [],
        "refereeForm" :{},
        "selectedReferee" : null
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
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
        },
        postReferee(evt) {
            console.log ("Test:", this.selectedReferee);
          if (this.selectedReferee) {
              this.postEditReferee(evt);
          } else {
              this.postNewReferee(evt);
          }
        },
        postEditReferee(evt) {
          this.refereeForm.refereeid = this.selectedReferee.refereeid;

          console.log("Editing!", this.refereeForm);
  
          fetch('api/referee/update.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        postNewReferee(evt) {
                
            fetch('api/referee/create.php', {
                method:'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                // reset the form
                this.handleResetEdit();
              });
           } ,
       postDeleteReferee(o) {  
            if ( !confirm("Are you sure you want to delete " + o.refname + " from the table?") ) {
                return;
            }  
            
            console.log("Delete!", o);
    
            fetch('api/referee/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },

          handleEditReferee(referee) {
            this.selectedReferee = referee;
            this.refereeForm = this.selectedReferee;
          },
          handleResetEdit() {
               this.selectedReferee = null;
               this.refereeForm = {};
           }
       
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#soccerApp');