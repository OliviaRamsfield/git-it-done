//store references to HTML elements that turn into DOM elements
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

//function to execute when submission event occurs
var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);

    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        //clear input value for next submission
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

var getUserRepos = function(user) {
    //format the GitHub API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to URL
   fetch(apiUrl)
   .then(function(response){
       //request was successful or in the 200s
       if (response.ok){
       response.json().then(function(data){
           //send JSON data response to displayRepos()
           displayRepos(data, user);
       });
    } else {
        alert("Error: GitHub User Not Found");
    }
   })
   .catch(function(error){
       alert("unable to connect to GitHub");
   });  
};

//event listener for form submission
userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm) {
    //check if API returned any repos
    if (repoContainerEl.length === 0) {
        repoContainerEl.textContent = "No Repositories Found";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        //create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        //append to container
        repoEl.appendChild(titleEl);
        //create status element
        var statusEl = document.createElement("span");
        statusEl.classlist = "flex-row align-center";
        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container
        repoEl.appendChild(statusEl);
        //append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
};

