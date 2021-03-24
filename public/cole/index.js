/* eslint-disable camelcase */
//Add Search History to Local Storage
function addToLocalStorage(save_value) {
  const search_key = "search_history";
  const search_history = localStorage.getItem(search_key);
  if (search_history == null) {
    const new_hist = JSON.stringify([save_value]);
    localStorage.setItem(search_key, new_hist);
  } else {
    // Grab the value from the history array
    const past_hist = JSON.parse(search_history);
    // Push to the parsed array
    past_hist.unshift(save_value);
    // restring the array
    const new_hist = JSON.stringify(past_hist);
    // store it
    localStorage.setItem(search_key, new_hist);
  }
}

//Show Search History
function showPastHistory() {
  $("#recent").empty();

  //slice the search history down to five
  const recent_search = JSON.parse(localStorage.getItem("search_history"));
  if (recent_search != null) {
    const recent_hist = recent_search.slice(0, 5);
    //print five most recent searches to html
    for (let i = 0; i < recent_hist.length; i++) {
      $("#recent").append(
        `<button class="cityclick btn btn-primary"type="button"value="${recent_hist[i]}">${recent_hist[i]}</button>`
      );
    }
  }
}

$(document).ready(() => {

  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Display Search History on Load
  showPastHistory();
  $("#submit_search").click(e => {
    e.preventDefault();
    const search = $("#search").val();
    addToLocalStorage(search);
    showPastHistory();
    // $("#search").val("");
  });

  ////Clicking on recent search buttons
  // $(document).on("click", ".cityclick", function () {
  //   let city = $(this).attr("value");
  //   addToLocalStorage(city);
  //   showPastHistory();
  //   $(".cityclick").val("");
  //   console.log(city);
  // });
});
