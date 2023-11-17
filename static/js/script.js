document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit');
    const inputs = document.querySelectorAll('input[type="number"]');

    // Enable button when all fields are filled
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            let allFilled = Array.from(inputs).every(input => input.value.length > 0);
            submitButton.disabled = !allFilled;
        });
    });

    // Event listener for the submit button
    submitButton.addEventListener('click', function() {
        let cost = parseFloat(document.getElementById('cost').value);
        let protein = parseFloat(document.getElementById('protein').value);
        let calories = parseFloat(document.getElementById('calories').value);

        // Basic validation checks
        if (isNaN(cost) || cost < 0 || isNaN(protein) || protein < 0 || isNaN(calories) || calories < 0) {
            return;
        }

        // Update or transform these variables as required by your model
        let features = {
            cost: parseFloat(cost),
            protein: parseFloat(protein),
            calories: parseFloat(calories)
        };

        fetch('/calculate_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cost: parseFloat(cost),
            protein: parseFloat(protein),
            calories: parseFloat(calories)
        }),
    })
        .then(response => response.json())
        .then(data => {
            let scoreElement = document.getElementById('score');
            scoreElement.innerText = `Score: ${data.score}`;
            scoreElement.classList.remove('score-placeholder'); // Remove placeholder styling
        });
    });
});
