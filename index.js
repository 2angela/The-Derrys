/*
  Submission for Web Development Basic Final Assignment
  Dicoding - Bangkit Academy Program
*/

// save input inside object
var booking = {
  name: "",
  address: "",
  datetime: "",
  guests: "",
  clowns: [],
  reqs: "",
};
var checked = false;
var valid = false;

// event listener for submit form button
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    const inputsEl = document.querySelectorAll("input");
    const inputs = [...inputsEl]; // convert NodeList to array
    const checkboxes = inputs.filter((item) => item.type == "checkbox");

    // validate and save checkbox input
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checked = true;
        booking.clowns.push(checkboxes[i].value);
      }
    }

    if (checked) {
      valid = true;
      // validate non-checkbox input
      for (var i = 0; i < inputs.length - checkboxes.length; i++) {
        if (!inputs[i].value.trim()) {
          valid = false;
          break;
        } else {
          // if input not empty, set booking properties to form input value
          const dataName = inputs[i].id;
          if (dataName == "datetime") {
            booking[dataName] = new Date(inputs[i].value).toLocaleString();
          } else {
            booking[dataName] = inputs[i].value.trim();
          }
        }
      }

      // set booking for textarea input
      booking["reqs"] = document.querySelector("textarea").value;

      if (valid) {
        // show pop-up
        document.querySelector("#popup").style.display = "unset";

        // fill the booking summary elements with values from booking object
        const tdEl = document.querySelectorAll("td");
        for (var i = 0; i < tdEl.length; i++) {
          tdEl[i].innerHTML = booking[tdEl[i].id];
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// Event listener for OK button inside pop up
document.querySelector("#popupButton").addEventListener("click", (event) => {
  event.preventDefault();

  // hide pop-up
  document.querySelector("#popup").style.display = "none";
  location.href = "index.html";
});

// Event listener for Go to top button (bottom right)
document.querySelector("#goToTop").addEventListener("click", (event) => {
  event.preventDefault();

  window.scrollTo({ top: 0, behavior: "smooth" });
});
