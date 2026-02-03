"""
Create a sample model for testing purposes
This will generate a dummy model that you can replace with your actual trained model
"""

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

# Create sample training data (Boston Housing dataset format)
np.random.seed(42)
n_samples = 506  # Same as Boston Housing dataset

# Generate sample features (similar to Boston Housing dataset ranges)
data = {
    'CRIM': np.random.exponential(3, n_samples),  # Crime rate
    'ZN': np.random.uniform(0, 100, n_samples),   # Residential land zoned
    'INDUS': np.random.uniform(0, 30, n_samples), # Non-retail business
    'CHAS': np.random.choice([0, 1], n_samples, p=[0.93, 0.07]), # Charles River
    'NOX': np.random.uniform(0.3, 0.9, n_samples), # Nitric oxides
    'RM': np.random.uniform(3, 9, n_samples),     # Rooms per dwelling
    'AGE': np.random.uniform(0, 100, n_samples),  # Pre-1940 units
    'DIS': np.random.exponential(4, n_samples),   # Distance to employment
    'RAD': np.random.randint(1, 25, n_samples),   # Highway accessibility
    'TAX': np.random.uniform(180, 750, n_samples), # Property tax
    'PTRATIO': np.random.uniform(12, 22, n_samples), # Pupil-teacher ratio
    'B': np.random.uniform(0, 400, n_samples),    # Proportion of blacks
    'LSTAT': np.random.uniform(1, 40, n_samples)  # Lower status %
}

# Create DataFrame
df = pd.DataFrame(data)

# Create realistic MEDV values based on features
# Base price in thousands of dollars
base_price = 15
medv = (
    base_price -
    data['CRIM'] * 0.1 +           # Higher crime lowers price
    data['ZN'] * 0.05 +            # More residential zoning increases price
    data['INDUS'] * -0.03 +        # More business areas decrease price
    data['CHAS'] * 3 +             # Waterfront premium
    data['NOX'] * -2 +             # Pollution decreases price
    data['RM'] * 4 +               # More rooms increase price
    data['AGE'] * -0.02 +          # Older housing decreases price
    data['DIS'] * 0.5 +            # Better access increases price
    data['RAD'] * 0.1 +            # Better highway access increases price
    data['TAX'] * -0.01 +          # Higher taxes decrease price
    data['PTRATIO'] * -0.5 +       # Worse ratios decrease price
    data['B'] * 0.01 +             # Demographics factor
    data['LSTAT'] * -0.5 +         # Higher lower status decreases price
    np.random.normal(0, 3, n_samples)  # Add some noise
)

# Ensure positive prices
medv = np.maximum(medv, 5)  # Minimum $5,000

# Train model
X = df.values
y = medv

model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, 'house_price_model.pkl')
print("Sample model created and saved as 'house_price_model.pkl'")
print(f"Model trained on {n_samples} samples")
print("R² score:", model.score(X, y))

# Test prediction
# Sample input similar to Boston Housing dataset
sample_input = np.array([[0.00632, 18.0, 2.31, 0, 0.538, 6.575, 65.2, 4.0900, 1, 296.0, 15.3, 396.90, 4.98]])
prediction = model.predict(sample_input)
print(f"Sample prediction for test input: ${prediction[0]*1000:,.2f}")