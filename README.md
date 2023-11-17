# Bulking Meal Rater
Machine learning web app to rate a meal from 0 to 10 based on the cost (Norwegian Kr), protein amount (grams) and calorie amount (kcal). The rating model was trained with a polynomial regression model in scikit-learn, based on a manually crafted data set of 100 meals.

The rating will work best for people eating approximately 3000 calories daily, divided into 3-4 meals.

Feel free to create a new model with your own data set, or add to the current data set (located at models/meal_scoring_dataset.csv) and retrain the model using the **models/polynomial_regression_trainer.py**

The current evaluation metrics for the machine learning model are a Mean Squared Error (MSE) of 0.7798 and an R² Score of 0.8786. 

## Run the prebuilt web app on Google Cloud:

[Link to the deployed web app on Google Cloud](https://bulkrater-7jh2arsyhq-uc.a.run.app)

(Loading can take up to 10 seconds if no one else is using the app, as Google shuts down the container instance when there is no traffic)

## Run locally:
Clone the repository to your local machine:
```bash
git clone https://github.com/hermanhmo/bulkrater.git
```
**cd** to the **/bulkrater** directory and build the docker image:
```bash
docker build -t bulkrater .
```
Run the docker image:
```bash
docker run -p 8080:8080 bulkrater
```
Now you can access the web app in your browser:
```
localhost:8080
```
