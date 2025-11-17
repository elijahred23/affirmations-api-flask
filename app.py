from flask import Flask, jsonify
import random

app = Flask(__name__)

AFFIRMATIONS = [
    "You are capable of amazing things.",
    "You are enough just as you are.",
    "You are growing and improving every day.",
    "You are stronger than you think.",
    "Your work and effort matter.",
]

@app.route("/affirmation", methods=["GET"])
def get_affirmation():
    return jsonify({
        "affirmation": random.choice(AFFIRMATIONS)
    })

@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "message": "Welcome to the Affirmations API!",
        "endpoint": "/affirmation"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

