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
})
