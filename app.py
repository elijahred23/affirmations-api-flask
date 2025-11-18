from flask import Flask, jsonify, send_from_directory
import json
import random
import os

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

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(f"static/{path}"):
        return send_from_directory("static", path)
    return send_from_directory("static", "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
