from flask import Flask, request, jsonify, render_template
import joblib
import os

app = Flask(__name__)

# Load the ML model and the pre-processing transformer from the 'models' directory
model = joblib.load('models/polynomial_regression_meal_model.joblib')
poly_transformer = joblib.load('models/poly_transformer.joblib')

@app.route('/')
def index():
    # Render the main page of the web app
    return render_template('index.html')

@app.route('/calculate_score', methods=['POST'])
def calculate_score():
    # Retrieve data from the POST request
    data = request.get_json()

    # Check if all required fields (cost, protein, calories) are in the data
    if 'cost' not in data or 'protein' not in data or 'calories' not in data:
        return jsonify({'error': 'Missing data'}), 400

    try:
        # Attempt to convert the inputs to float and validate if they are non-negative
        cost = float(data['cost'])
        protein = float(data['protein'])
        calories = float(data['calories'])

        if cost < 0 or protein < 0 or calories < 0:
            # Raise a ValueError if any input is negative
            raise ValueError

    except (ValueError, TypeError):
        # Handle any type conversion errors or negative values
        return jsonify({'error': 'Invalid input'}), 400

    # Prepare the input features for the ML model
    features = [cost, protein, calories]

    # Apply polynomial transformation to the features
    poly_features = poly_transformer.transform([features])

    # Use the ML model to predict the score
    score = model.predict(poly_features)[0]

    # Round the predicted score to 2 decimal places
    rounded_score = round(score, 2)

    # Ensure the score is capped between 0 and 10
    if rounded_score > 10:
        return jsonify({'score': 10.00})
    if rounded_score < 0:
        return jsonify({'score': 0.00})
    return jsonify({'score': rounded_score})

@app.errorhandler(500)
def internal_error(error):
    # Custom error handler for internal server errors
    return jsonify({'error': 'Internal Server Error'}), 500

@app.errorhandler(404)
def not_found_error(error):
    # Custom error handler for "not found" errors
    return jsonify({'error': 'Resource Not Found'}), 404

if __name__ == '__main__':
    # Start the Flask app on the specified port
    port = int(os.environ.get('PORT', 8000))  # Default to 8080 if $PORT not set
    app.run(host='0.0.0.0', port=port)
