document.addEventListener("DOMContentLoaded", function () {
    updateOutputContainer();
    // Add event listeners to all radio buttons with class 'check-type'
    var radioButtons = document.querySelectorAll('.check_type');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            updateOutputContainer(); // Call the function whenever a radio button is selected
        });
    });
});

function updateOutputContainer() {
    var selectedCheckType = getSelectedRadioValue('check_type');
    console.log(selectedCheckType);
    // Update sidebar content based on active link
    if (selectedCheckType === "Input_Layer_Check") {
        sidebarContent3 = `Lexical Mapping`; 
        sidebarContent1 = `Links English words to their concepts and analyzes relationships to grasp sentence meaning. It also identifies emotional tone, intent, and retrieves relevant database information.`
        sidebarContent = "Could you please pass the salt?";
        
    } else if (selectedCheckType === "Database_Layer_Check") {
        sidebarContent3 = `Semantic Search`; 
        sidebarContent1 = `Analyzes underlying meanings and uses vector embeddings to represent semantic relationships. It focuses on intent, matches relevant ASL signs, and retrieves contextually appropriate information.`
        sidebarContent = "Could you please pass the salt?";
        
    } else if (selectedCheckType === "Connected_Apps_Layer_Check") {
        sidebarContent3 = ` Fitment and Transformation`; 
        sidebarContent1 = `Arranges ASL signs in a natural order and ensures visual coherence. It also integrates appropriate movements and expressions to convey emotion and nuance.`
        sidebarContent = "Could you please pass the salt?";
        
    } else if (selectedCheckType === "Sensitive_Input_Layer") {
        sidebarContent3 = ` Context Memory`; 
        sidebarContent1 = `Tracks evolving context while processing sentences and retains information from previous text. It uses both long-term knowledge and short-term context for comprehension.`
        sidebarContent = "Could you please pass the salt?";
        
    } else if (selectedCheckType === "Output_Layer_Check") {
        sidebarContent3 = `Output`; 
        sidebarContent1 = `Scrutinizes outgoing data and responses, ensuring that only legitimate information is transmitted to authorized recipients`
        sidebarContent = "Could you please pass the salt?";
        
    }

    var copyableTextArea = document.getElementById('copyableText');
    copyableTextArea.value = sidebarContent;

    // Update the static text
    var staticTextElement = document.getElementById('staticText');
    staticTextElement.textContent = sidebarContent1;
    var staticTextElement = document.getElementById('staticText1');
    staticTextElement.textContent = sidebarContent3;
}

function callFunctions() {
    console.log('callFunctions called');

    var inputText = document.querySelector('.input-window').value;

    var selectedCheckType = getSelectedRadioValue('check_type');
    updateOutputContainer();
    var inputWindow = document.querySelector('.input-window');
    inputWindow.disabled = true;
    var submitbtn = document.getElementById("submit-btn");
    submitbtn.disabled = true;
    const submitLoader = document.getElementById("submit-loader");
    submitLoader.style.display = "inline-block";


    if (selectedCheckType === "Input_Layer_Check") {
        checkInputLayer(inputText); // Call the function to check the input layer
    } else if (selectedCheckType === "Database_Layer_Check") {
        checkDatabaseLayer(inputText); // Call the function to check the database layer
    } else if (selectedCheckType === "Connected_Apps_Layer_Check") {
        checkConnectedAppsLayer(inputText); // Call the function to check the connected apps layer
    } else if (selectedCheckType === "Sensitive_Input_Layer") {
        checkpiiLayer(inputText); // Call the function to check the connected apps layer
    } else if (selectedCheckType === "Output_Layer_Check") {
        checkOutputLayer(inputText); // Call the function to check the output layer
    }
    else {
        checkInputLayer(inputText); // Call the function to check the output layer
    }

    // Function to check the input layer
    function checkInputLayer(inputText) {
        fetch('/check_input_layer_mp', { // Replace with the appropriate route in your Flask app
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                animateText(data, ".input-window-response");

                // Remove the loader and add the green tick
                // sidebarContentElement.innerHTML = '<i class="fa fa-check green-tick"></i>' + sidebarContent + '<br><br>' + sidebarContent1;
            })
            .catch(error => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                console.log(error);
                alert("Google quota limit reached. Please re-enter your input after some time.");
            });
    }

    function checkDatabaseLayer(inputText) {
        fetch('/check_data_layer_mp', { // Replace with the appropriate route in your Flask app
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                animateText(data, ".input-window-response");

                // Remove the loader and add the green tick
                // sidebarContentElement.innerHTML = '<i class="fa fa-check green-tick"></i>' + sidebarContent + '<br><br>' + sidebarContent1;
            })
            .catch(error => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                console.log(error);
                alert("Google quota limit reached. Please re-enter your input after some time.");
            });
    }

    function checkConnectedAppsLayer(inputText) {
        fetch('/check_connected_layer_mp', { // Replace with the appropriate route in your Flask app
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                animateText(data, ".input-window-response");

                // Remove the loader and add the green tick
                // sidebarContentElement.innerHTML = '<i class="fa fa-check green-tick"></i>' + sidebarContent + '<br><br>' + sidebarContent1;
            })
            .catch(error => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                console.log(error);
                alert("Google quota limit reached. Please re-enter your input after some time.");
            });
    }

    function checkOutputLayer(inputText) {
        fetch('/check_output_layer_mp', { // Replace with the appropriate route in your Flask app
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                animateText(data, ".input-window-response");

                // Remove the loader and add the green tick
                // sidebarContentElement.innerHTML = '<i class="fa fa-check green-tick"></i>' + sidebarContent + '<br><br>' + sidebarContent1;
            })
            .catch(error => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                console.log(error);
                alert("Google quota limit reached. Please re-enter your input after some time.");
            });
    }

    function checkpiiLayer(inputText) {
        fetch('/check_pii_layer_mp', { // Replace with the appropriate route in your Flask app
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputText: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                animateText(data, ".input-window-response");

                // Remove the loader and add the green tick
                // sidebarContentElement.innerHTML = '<i class="fa fa-check green-tick"></i>' + sidebarContent + '<br><br>' + sidebarContent1;
            })
            .catch(error => {
                inputWindow.disabled = false;
                submitbtn.disabled = false;
                submitLoader.style.display = "none";
                console.log(error);
                alert("Google quota limit reached. Please re-enter your input after some time.");
            });
    }
}

function animateText(text, targetSelector) {
    var targetInput = document.querySelector(targetSelector);
    targetInput.value = "";

    var index = 0;
    var typingInterval = setInterval(function () {
        targetInput.value += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(typingInterval);
        }
    }, 50); // Adjust the typing speed by changing the interval value (in milliseconds)
}

function getSelectedRadioValue(radioGroupName) {
    var radios = document.getElementsByName(radioGroupName);

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }

    // Return null or handle the case where no radio button is selected
    return null;
}


function refreshPage() {
    location.reload();
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        callFunctions();
    }
}

// function copyOutputText() {
//     // Select the text in the output container
//     var outputText = document.getElementById('outputContent').innerText;
    
//     // Copy the selected text to the clipboard
//     navigator.clipboard.writeText(outputText)
//         .then(() => {
//             alert("Text copied to clipboard!");
//         })
//         .catch(err => {
//             console.error('Failed to copy text: ', err);
//             alert("Failed to copy text. Please try again.");
//         });
// }

function copyOutputText() {
    // Select the text in the copyable textarea
    var copyableTextArea = document.getElementById('copyableText');
    copyableTextArea.select();
    
    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Deselect the textarea to prevent unwanted text selection
    copyableTextArea.blur();
}

function copyOutputText1() {
    // Select the text in the copyable textarea
    var copyableTextArea = document.getElementById('copyableText1');
    copyableTextArea.select();
    
    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Deselect the textarea to prevent unwanted text selection
    copyableTextArea.blur();
}
