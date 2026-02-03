"""
Script to save your trained Boston Housing model from Jupyter Notebook
Run this in your Jupyter notebook after training your model
"""

# Example code - replace with your actual model variable name
import joblib

# Assuming your trained model is stored in a variable called 'model'
# Replace 'model' with your actual model variable name
# Make sure your model was trained on the 13 Boston Housing features:
# ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT']

# joblib.dump(model, 'backend/house_price_model.pkl')

print("Model saved successfully!")
print("Make sure to place the saved model file in the backend directory")
print("Ensure your model was trained on Boston Housing dataset features")