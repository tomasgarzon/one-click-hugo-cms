// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");

$(function() {
  $("#form-join").submit(function(event) {
    event.preventDefault();
    const $this = $(this);
    console.log($this);
  });

  tns({
    container: ".homepage",
    items: 1,
    autoplay: true,
    speed: 400,
    center: true,
    controls: false
  });

  tns({
    container: ".allies",
    items: 5,
    autoplay: true,
    speed: 400,
    center: true,
    controls: false
  });

  tns({
    container: ".organizations",
    items: 5,
    autoplay: true,
    center: true,
    speed: 400,
    controls: false
  });

  /**************************************************************
   * START -> Modal box for 'Im interested' management
   **************************************************************/

  const modal = document.getElementById("modal-box");

  $(".join-button").on("click", () => {
    modal.style.display = "block";
  });
  $(".close").on("click", () => {
    modal.style.display = "none";
  });
  $(".button-close").on("click", () => {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  let recaptcha = "exosummit";
  grecaptcha.ready(() => {
    grecaptcha.execute(
      "6LcXJa0UAAAAAEWUOTbPKb9_JAh0-l8kwLKCbR_i",
      { action: "homepage" }
    ).then((token) => {
      recaptcha = token;
    });
  });

  $("#form-sign-up").on("submit", function(event) {
    event.preventDefault();
    const data = {
      firstName: $("#name").val(),
      email: $("#email").val(),
      policy: $("#policy").val(),
      customText: $("#custom").val(),
      recaptcha,
      entry_point: {
        refereal: window.location.hostname,
        name: $(this).data("hubspotproperty")
      }
    };
    const url = $(this).attr("action");

    $.ajax({
      url,
      type: "post",
      data: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      success: function(responseData) {
        $("#form-layer").hide();
        $("#form-layer-ok").show();
        return responseData;
      },
      error: function(jqXHR) {
        if (jqXHR.status === 400) {
          $("#form-layer").hide();
          $("#form-layer-ok").show();
          $("#form-layer-ok .title").html("You have signed up to the community in the past");
          $("#form-layer-ok .subtitle").html("Please check your inbox or reset your password");
        } else {
          $("#form-layer").hide();
          $("#form-layer-ko").show();
        }
      }
    });
  });

  $(".button-try").on("click", () => {
    $("#form-layer-ko").hide();
    $("#form-layer").show();
  });

  /**************************************************************
   * END -> Modal box for 'attending the workshop' management
   **************************************************************/
});
