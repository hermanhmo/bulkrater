from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

# Load the model and the transformer
model = joblib.load('models/polynomial_regression_meal_model.joblib')
poly_transformer = joblib.load('models/poly_transformer.joblib')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate_score', methods=['POST'])
def calculate_score():
    data = request.get_json()

    # Ensure all fields are present
    if 'cost' not in data or 'protein' not in data or 'calories' not in data:
        return jsonify({'error': 'Missing data'}), 400

    try:
        # Convert to float and validate
        cost = float(data['cost'])
        protein = float(data['protein'])
        calories = float(data['calories'])

        if cost < 0 or protein < 0 or calories < 0:
            raise ValueError

    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid input'}), 400

    # Create the features array
    features = [cost, protein, calories]

    # Transform the features into polynomial features
    poly_features = poly_transformer.transform([features])

    # Predict the score
    score = model.predict(poly_features)[0]

    # Round the score to 2 decimal places
    rounded_score = round(score, 2)

    # Cap the score at 10 and return
    if rounded_score > 10:
        return jsonify({'score': 10.00})
    if rounded_score < 0:
        return jsonify({'score': 0.00})
    return jsonify({'score': rounded_score})


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500


@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Resource Not Found'}), 404


if __name__ == '__main__':
    app.run(debug=False)
