document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    const inputs = document.querySelectorAll('input[type="number"]');

    // Check if all input fields are filled to enable the submit button
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            let allFilled = Array.from(inputs).every(input => input.value.length > 0);
            submitButton.disabled = !allFilled;
        });
    });

    // Handling the click event on the submit button
    submitButton.addEventListener('click', function() {
        // Retrieve and parse input values
        let cost = parseFloat(document.getElementById('cost').value);
        let protein = parseFloat(document.getElementById('protein').value);
        let calories = parseFloat(document.getElementById('calories').value);

        // Perform basic validation on the inputs
        if (isNaN(cost) || cost < 0 || isNaN(protein) || protein < 0 || isNaN(calories) || calories < 0) {
            // If validation fails, exit the function without proceeding
            return;
        }

        // Prepare the data object for the API request
        let features = {
            cost: cost,
            protein: protein,
            calories: calories
        };

        // Sending a POST request to the '/calculate_score' endpoint
        fetch('/calculate_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(features),
        })
        .then(response => response.json())
        .then(data => {
            // Update the score element with the received score
            let scoreElement = document.getElementById('score');
            scoreElement.innerText = `Score: ${data.score}`;
            // Remove the placeholder styling after receiving the score
            scoreElement.classList.remove('score-placeholder');
        });
    });
});
