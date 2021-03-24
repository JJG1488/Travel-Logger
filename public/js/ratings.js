//******************************* Task List *********************************
//******************* create elemets in html for selectors on line 48 ********************************

// Wait for the DOM to completely load before we run our JS
// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", e => {
  console.log("DOM loaded! 🚀");

  // Check for query string and set flag, "updating", to false initially
  const url = window.location.search;
  let ratingId;
  let updating = false;

  // Get a specific rating
  const getRatingsData = id => {
    fetch(`/api/ratings/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log(`Success in grabbing rating ${id}`, data);

          // Populate the form with the existing rating
          titleInput.value = data.title;
          bodyInput.value = data.body;
          ratingCategorySelect.value = data.category;

          updating = true;
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  // Extract the rating ID from the URL
  if (url.indexOf("?rating_id=") !== -1) {
    ratingId = url.split("=")[1];
    getRatingData(ratingId);
  }

  // Get elements from the page
  const bodyInput = document.getElementById("body");
  const titleInput = document.getElementById("title");
  const cmsForm = document.getElementById("cms");
  const ratingCategorySelect = document.getElementById("category");

  // Set default value for the category
  ratingCategorySelect.value = "Personal";

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!titleInput.value || !bodyInput.value) {
      alert("Your rating is missing some content");
    }

    // Create a newRating object to send off to the backend
    const newRating = {
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
      category: ratingCategorySelect.value
    };
    console.log("handleFormSubmit -> newRating", newRating);

    // Check if the user is updating or creating and preform said function
    if (updating) {
      newRating.id = ratingId;
      updateRating(newRating);
    } else {
      submitRating(newRating);
    }
  };

  // Event listener for when the blog is submitted
  cmsForm.addEventListener("submit", handleFormSubmit);

  // Event handler for when a user submits a rating
  const submitRating = rating => {
    fetch("/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rating)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success in submitting rating:", data);
        window.location.href = "/blog";
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  // Update a rating and bring user to /blog
  const updateRating = rating => {
    fetch("/api/ratings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rating)
    })
      .then(() => {
        console.log("Attempting update to rating");
        window.location.href = "/blog";
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
});


// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", event => {
  if (event) {
    console.info("DOM loaded");
  }

  // UPDATE
  const changeDevourBtns = document.querySelectorAll(".change-devour");

  // Set up the event listener for the create button
  if (changeDevourBtns) {
    changeDevourBtns.forEach(button => {
      button.addEventListener("click", e => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const newDevour = e.target.getAttribute("data-newDevour");

        const newDevourState = {
          thumbsUp: newDevour
        };

        fetch(`/api/ratings/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newDevourState)
        }).then(response => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed devour to: ${newDevour}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE
  const createBurgerBtn = document.getElementById("create-form");

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("submit", e => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        nameOfPlace: document.getElementById("bu").value.trim(),
        thumbsUp: document.getElementById("devoured").checked
      };

      // Send POST request to create a new quote
      fetch("/api/ratings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger)
      }).then(() => {
        // Empty the form
        document.getElementById("bu").value = "";

        // Reload the page so the user can see the new quote
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtns = document.querySelectorAll(".delete-burger");

  // Set up the event listeners for each delete button
  deleteBurgerBtns.forEach(button => {
    button.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");

      // Send the delete request
      fetch(`/api/ratings/${id}`, {
        method: "DELETE"
      }).then(res => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});



// // Make sure we wait to attach our handlers until the DOM is fully loaded.
// document.addEventListener("DOMContentLoaded", event => {
//     if (event) {
//       console.info("DOM loaded");
//     }
  
//     // UPDATE
//     const changeDevourBtns = document.querySelectorAll(".change-devour");
  
//     // Set up the event listener for the create button
//     if (changeDevourBtns) {
//       changeDevourBtns.forEach(button => {
//         button.addEventListener("click", e => {
//           // Grabs the id of the element that goes by the name, "id"
//           const id = e.target.getAttribute("data-id");
//           const newDevour = e.target.getAttribute("data-newDevour");
  
//           const newDevourState = {
//             thumbsUp: newDevour
//           };
  
//           fetch(`/api/ratings/${id}`, {
//             method: "PUT",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json"
//             },
  
//             // make sure to serialize the JSON body
//             body: JSON.stringify(newDevourState)
//           }).then(response => {
//             // Check that the response is all good
//             // Reload the page so the user can see the new quote
//             if (response.ok) {
//               console.log(`changed devour to: ${newDevour}`);
//               location.reload("/");
//             } else {
//               alert("something went wrong!");
//             }
//           });
//         });
//       });
//     }
  
//     // CREATE
//     const createBurgerBtn = document.getElementById("create-form");
  
//     if (createBurgerBtn) {
//       createBurgerBtn.addEventListener("submit", e => {
//         e.preventDefault();
  
//         // Grabs the value of the textarea that goes by the name, "quote"
//         const newBurger = {
//           nameOfPlace: document.getElementById("bu").value.trim(),
//           thumbsUp: document.getElementById("devoured").checked
//         };
  
//         // Send POST request to create a new quote
//         fetch("/api/ratings", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//           },
  
//           // make sure to serialize the JSON body
//           body: JSON.stringify(newBurger)
//         }).then(() => {
//           // Empty the form
//           document.getElementById("bu").value = "";
  
//           // Reload the page so the user can see the new quote
//           console.log("Created a new burger!");
//           location.reload();
//         });
//       });
//     }
  
//     // DELETE
//     const deleteBurgerBtns = document.querySelectorAll(".delete-burger");
  
//     // Set up the event listeners for each delete button
//     deleteBurgerBtns.forEach(button => {
//       button.addEventListener("click", e => {
//         const id = e.target.getAttribute("data-id");
  
//         // Send the delete request
//         fetch(`/api/ratings/${id}`, {
//           method: "DELETE"
//         }).then(res => {
//           console.log(res);
//           console.log(`Deleted burger: ${id}`);
  
//           // Reload the page
//           location.reload();
//         });
//       });
//     });
//   });