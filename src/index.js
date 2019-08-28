// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");
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
})
