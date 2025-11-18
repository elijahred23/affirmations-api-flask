import json
import random
from flask import Flask, jsonify

app = Flask(__name__)


def load_affirmations():
    """Load affirmations from the JSON file."""
    try:
        with open("affirmations.json", "r") as file:
            data = json.load(file)
            return data.get("affirmations", [])
    except Exception as e:
        print(f"Error loading affirmations.json: {e}")
        return []


AFFIRMATIONS = load_affirmations()


@app.route("/affirmation", methods=["GET"])
def get_affirmation():
    return jsonify({
        "affirmation": random.choice(AFFIRMATIONS)
    })


@app.route("/affirmations", methods=["GET"])
def get_affirmations():
    return jsonify({
        "affirmations": AFFIRMATIONS
    })


@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "message": "Welcome to the Affirmations API!",
        "endpoints": [
            {"endpoint": "/affirmation", "method": "GET"},
            {"endpoint": "/affirmations", "method": "GET"},
        ],
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
