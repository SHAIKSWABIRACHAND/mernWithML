from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = joblib.load('model5.pkl')

# Load and process the CSV file to create a mapping for item purchased
item_data = pd.read_csv('C:\\Users\\B.Ramakrishnan\\Downloads\\SF_accuracy.csv')
# Assuming there is a column "item_purchased" in the CSV
unique_items = item_data['item_purchased'].unique()
item_mapping = {item: idx for idx, item in enumerate(unique_items)}

# New API to get unique items purchased
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(list(unique_items))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Map the item purchased to its corresponding numerical value
    item_purchased = data['item_purchased']
    if item_purchased not in item_mapping:
        return jsonify({'error': 'Item purchased not found in the mapping'}), 400
    
    item_encoded = item_mapping[item_purchased]
    
    # Prepare input features for the model
    input_features = np.array([[
        data['purchase_amount'],
        data['payment_method'],
        data['year'],
        data['month'],
        data['day'],
        item_encoded
        
    ]])
    
    # Predict the review rating
    prediction = model.predict(input_features)
    
    return jsonify({'predicted_rating': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
