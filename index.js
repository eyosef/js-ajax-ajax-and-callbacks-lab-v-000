$(document).ready(function (){
});

function searchRepositories(){
  let searchTerm = document.getElementById("searchTerms").value 
  let url = `https://api.github.com/search/repositories?q=${searchTerm}` 

  $.get(url).done(function(response) {
    const repoList = `${response.items.map(repo => { return (
      `<h2>${repo.name}</h2>
      <a href='${repo.html_url}'>Repo URL</a><br><br>
      <img src='${repo.owner.avatar_url}' height="40" width="40"><br>
      <p>${repo.owner.login}</p>
      <p>Description: ${repo.description}</p> 
      <a href="#" data-owner="${repo.owner.login}" data-repository="${repo.name}" onclick="showCommits(this)">Show Commits</a><br>`)}) 
  }`
  document.getElementById("results").innerHTML = repoList 
}).fail(error => {
  displayError() 
  })
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`).done(function(data){
    const commitList = `${data.map(commit => { return ( 
      `<h3>SHA: ${commit.sha} </h3> 
      <p><img src='${commit.author.avatar_url}' height="40" width="40"> ${commit.author.login}</p> 
      `)
  })}`
  document.getElementById("details").innerHTML = commitList 
})
}