import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load the dataset
df = pd.read_csv('models/meal_scoring_dataset.csv')  # Update the path to your dataset file

# Define the features and the target
X = df[['cost', 'protein', 'calories']]
y = df['score']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Creating polynomial features
poly = PolynomialFeatures(degree=2)
X_poly_train = poly.fit_transform(X_train)
X_poly_test = poly.transform(X_test)

# Training the linear regression model on polynomial features
model = LinearRegression()
model.fit(X_poly_train, y_train)

# Predicting the scores with the polynomial model
y_pred = model.predict(X_poly_test)

# Evaluation metrics
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse}')
print(f'R² Score: {r2}')

# Save the model and the transformer
joblib.dump(model, 'polynomial_regression_meal_model.joblib')
joblib.dump(poly, 'poly_transformer.joblib')
