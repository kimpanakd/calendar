from flask import Flask, jsonify, request, make_response, json
from flask_httpauth import HTTPTokenAuth
from pymongo import MongoClient
from flask_cors import CORS
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


app = Flask(__name__)
auth = HTTPTokenAuth(scheme='Token')
CORS(app)

token = "h!!sf3423432rr4ff"


client = MongoClient(
    "mongodb+srv://kimguldbransen:XtPx5vpEMRyqZ20o@calendar.fk8qshn.mongodb.net/?retryWrites=true&w=majority")
db = client.dnd
calendar = db.calendar


@auth.verify_token
def verify_token(mytoken):
    if mytoken == token:
        return True
    return False


@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 403)


@app.errorhandler(400)
def not_found_400(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found_404(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/calendar', methods=['GET', 'POST'])
@auth.login_required
def get_tasks():
    if request.method == 'GET':
        dates = list(calendar.find())
        return JSONEncoder().encode(dates)
    if request.method == 'POST':
        date = request.get_json()
        calendar.insert_one(date)
        return JSONEncoder().encode(date), 201


if __name__ == '__main__':
    app.run("0.0.0.0", port=5000, debug=True)
