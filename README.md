# Meal Rater
Machine learning web app to rate a meal from 0 to 10 based on the cost (Norwegian Kr), protein amount (grams) and calorie amount (kcal). The rating model was trained with 2 different polynomial regression models in scikit-learn, based on 2 manually crafted data set of 100 meals.

The **bulk** rating will work best for people eating approximately 3000 calories daily, divided into 3-4 meals. The **cut** rating will work for anyone wanting a high protein diet with as little calories as possible, without overspending on food.

Feel free to create a new model with your own data set, or add to the current data sets (located in the **models** folder) and retrain the model using the **models/polynomial_regression_trainer.py**

### Current evaluation metrics for the machine learning models:

**Bulking** model(2nd degree polynomial regression):

* Mean Squared Error: 0.7798

* R² Score: 0.8786. 

**Cutting** model (3rd degree polynomial regression): 

* Mean Squared Error: 0.6793

* R² Score: 0.9291.

## Run the prebuilt web app on Google Cloud:

[Link to the deployed web app on Google Cloud](https://mealrater-7jh2arsyhq-uc.a.run.app)

(Loading can take up to 10 seconds if no one else is using the app, as Google shuts down the container instance when there is no traffic)

## Run locally:
Clone the repository to your local machine:
```bash
git clone https://github.com/hermanhmo/mealrater.git
```
**cd** to the **/mealrater** directory and build the docker image:
```bash
docker build -t mealrater .
```
Run the docker image:
```bash
docker run -p 8080:8080 mealrater
```
Now you can access the web app in your browser:
```
localhost:8080
```
