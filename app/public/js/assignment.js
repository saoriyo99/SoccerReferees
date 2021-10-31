const SomeApp = {
    data() {
      return {
        "assignments": [],
        "games": [],
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
        fetchAssignmentData() {
            fetch('/api/assignment/' )
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
       
    },
    created() {
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#assignmentApp');