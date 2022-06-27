var getUserRepos = function(user) {
    //format the GitHub API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to URL
   fetch(apiUrl).then(function(response){
       response.json().then(function(data){
           console.log(data);
       });
   });  
};

getUserRepos();