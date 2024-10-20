function callhallucinateFunctions() {
var inputText = document.querySelector(".input-window").value;
var inputWindow = document.querySelector('.input-window');
inputWindow.disabled = true;
var submitbtn=document.getElementById("submit-btn");
submitbtn.disabled=true;
const submitLoader = document.getElementById("submit-loader");
submitLoader.style.display = "inline-block";
// Send input text to Flask route
fetch("/code_evaluation", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputText: inputText }),
})
    .then(function (response) {
        inputWindow.disabled = false;
        submitbtn.disabled=false;
        submitLoader.style.display = "none";
    return response.json();
    })
    .then(function (data) {
    // Display the generated hallucination response
    animateText(data, ".input-window-response");
    })
    .catch(error => {
        inputWindow.disabled = false;
        submitbtn.disabled=false;
        submitLoader.style.display = "none";
        console.log(error);
        alert("Google quota limit reached. Please re-enter your input after some time.");
    });
}

function animateText(text, targetSelector) {
    var targetInput = document.querySelector(targetSelector);
    targetInput.value = "";

    var index = 0;
    var typingInterval = setInterval(function() {
        targetInput.value += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(typingInterval);
        }
    }, 10); // Adjust the typing speed by changing the interval value (in milliseconds)
}


function refreshPage() {
    location.reload();
}
