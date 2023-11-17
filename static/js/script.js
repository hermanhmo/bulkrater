document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    const inputs = document.querySelectorAll('input[type="number"]');
    var checkbox = document.getElementById('toggleSwitch');
    var body = document.body;
    var headerTitle = document.getElementById('headerTitle');
    var scoreElement = document.getElementById('score');


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

        // Retrieve the state of the toggle switch
        let isBulk = checkbox.checked;

        // Add the state of the toggle to the features object
        let features = {
            cost: cost,
            protein: protein,
            calories: calories,
            isBulk: isBulk
            }

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

    // Toggle switch change event
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            // Change background color when checked
            body.style.backgroundColor = '#c3f5bf'; // Replace with your color
            headerTitle.textContent = 'Bulking Meal Rater'; // Text when toggled right
        } else {
            // Change background color when unchecked
            body.style.backgroundColor = '#b9e9f0'; // Replace with your color
            headerTitle.textContent = 'Cutting Meal Rater'; // Text when toggled left
        }
        // Reset the score to placeholder value when toggle is switched
        scoreElement.innerText = 'Score: 0';
        scoreElement.classList.add('score-placeholder');
    });
});
