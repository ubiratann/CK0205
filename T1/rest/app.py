import os
import api.router.object as object

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

ENVIRONMENT = os.environ.get("ENVIRONMENT", "DEV")

if(ENVIRONMENT == "DEV"):
    app.config.from_pyfile("config.py")

version = os.environ.get("API_VERSION", "v1")

app.register_blueprint(object.blueprint, url_prefix=f"/api/{version}/object")