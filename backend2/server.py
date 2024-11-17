from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import boto3
import os
import json

app = Flask(__name__)
CORS(app)
load_dotenv()

# Put your AWS credentials in a .env file
access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

client = boto3.client(
    service_name="lambda",
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name="us-west-2",
)

@app.route("/")
def home():
    return "Hello, World"

@app.route("/sendScores", methods=["POST"])
def sendScores():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON payload"}), 400
    print(data)
    userId = data.get("userId")
    pythonScore = data.get("pythonScore")
    reactScore = data.get("reactScore")
    awsScore = data.get("awsScore")

    response = client.invoke(
        FunctionName="SaveQuizScores",
        InvocationType="RequestResponse",
        Payload=json.dumps({
            'userId': userId,
            'pythonScore': pythonScore,
            'reactScore': reactScore,
            'awsScore': awsScore
        })
    )

    response_payload = json.loads(response['Payload'].read())

    return jsonify(response_payload)


if __name__ == "__main__":
    app.run(host="0.0.0.0")