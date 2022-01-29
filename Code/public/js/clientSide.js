const nextPage = document.querySelector(".continue");
let signup = "";
fetch("./serverResponse.env")
  .then((response) => response.text())
  .then((text) => {
    signup = text;
    if (signup.length) {
      nextPage.href = "./userDetails.html";
      nextPage.style = "pointer-events: visible";
      nextPage.style.background = "#5e27a7";
      // delete data inside serverResponse
    } else {
      console.log("something went wrong");
    }
  });
