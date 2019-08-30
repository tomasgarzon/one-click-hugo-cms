// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
$(function(){
    $('#form-join').submit(function(event){
        event.preventDefault();
        var $this = $(this);
        debugger;
        console.log($this);
    });
    var slider = tns({
      container: '.homepage',
      items: 1,
      autoplay: true,
      speed: 400,
      center: true,
      controls: false
    });
    var slider2 = tns({
      container: '.allies',
      items: 5,
      autoplay: true,
      speed: 400,
      center: true,
      controls: false
    });
    var slider3 = tns({
      container: '.organizations',
      items: 5,
      autoplay: true,
      center: true,
      speed: 400,
      controls: false
    });
      /**************************************************************
     * START -> Modal box for 'Im interested' management
     **************************************************************/

    const modal = document.getElementById('modal-box');

    $(".join-button").on('click', () => {
      ga('send', {
        hitType: 'event',
        eventCategory: 'ExOSummits',
        eventAction: 'open_join',
        eventLabel: 'Open Join the Community'
      });
      modal.style.display = "block"});
    $(".close").on('click', () => modal.style.display = "none");
    $(".button-close").on('click', () => modal.style.display = "none");


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var recaptcha = 'exosummit';
    grecaptcha.ready(function() {
          grecaptcha.execute(
              '6LcXJa0UAAAAAEWUOTbPKb9_JAh0-l8kwLKCbR_i',
              {action: 'homepage'},
          ).then(function(token) {
               recaptcha = token;
          });
      });
    $('#form-sign-up').on('submit', function(event) {
      event.preventDefault();
      var data = {
          firstName: $('#first_name').val(),
          lastName: $('#last_name').val(),
          email: $('#email').val(),
          policy: $('#policy').val(),
          customText: $('#custom').val(),
          recaptcha: recaptcha,
          entry_point: {
            'refereal': window.location.hostname,
            'name': $(this).data('hubspotproperty'),
          }
      };
      var url = $(this).attr('action');
      $.ajax({
            url: url,
            type: 'post',
            data : JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function(data){
              ga('send', {
                hitType: 'event',
                eventCategory: 'ExOSummits',
                eventAction: 'joined',
                eventLabel: 'Join the Community'
              });
              $('#form-layer').hide(); $('#form-layer-ok').show();
              //location.href = domain + '/auth/go-to?token=' + data['token'];
            },
            error: function(jqXHR, textStatus, errorThrown){
              if (jqXHR.status == 400){
                $('#form-layer').hide(); $('#form-layer-ok').show();
                $('#form-layer-ok .title').html("You have signed up to the community in the past");
                $('#form-layer-ok .subtitle').html("Please check your inbox or reset your password");
              } else{
                $('#form-layer').hide(); $('#form-layer-ko').show();
              }

            }
        });
    });

    $('.button-try').on('click', () => {$('#form-layer-ko').hide(); $('#form-layer').show()});

    /**************************************************************
     * END -> Modal box for 'attending the workshop' management
     **************************************************************/
})
