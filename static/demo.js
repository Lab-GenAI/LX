function callFunctions_demo() {
    // Get the input text from the textarea
    var inputText = document.querySelector('.input-window').value;

    console.log(inputText);

    // Show the loader while fetching the GIF
    document.getElementById('submit-loader').hidden = false;

    // Fetch the GIF from the API
    fetch('/get_gif', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputText: inputText
        }) // Send the input text as part of the request body
    })
    .then(response => response.json())
    .then(data => {
        // Hide the loader
        document.getElementById('submit-loader').hidden = true;

        // Assuming the API returns a GIF URL in the 'gif_url' field of the response
        var gifUrl = data.gif_url;

        // Update the existing iframe to display the GIF
        var iframe = document.getElementById('gifFrame');
        iframe.src = gifUrl;  // Set the src of the iframe to the returned GIF URL
    })
    .catch(error => {
        console.error('Error fetching GIF:', error);
        document.getElementById('submit-loader').hidden = true;
        alert('Failed to fetch GIF. Please try again.');
    });
}
