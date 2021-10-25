const SomeApp = {
    data() {
      return {
        "referees": [],
        "refereeForm" :{}
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
        //    handleEditOffer(offer){
        //        this.selectedOffer = offer;
        //        this.offerForm = this.selectedOffer;
        //   },
          handleResetEdit() {
              this.refereeForm = {};
          }
       
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#soccerApp');