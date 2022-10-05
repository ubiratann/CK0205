import os
import api.router.object as object
import api.router.user as user
from flask import Flask

app = Flask(__name__)

ENVIRONMENT = os.environ.get("ENVIRONMENT", "DEV")

if(ENVIRONMENT == "DEV"):
    app.config.from_pyfile("config.py")

version = os.environ.get("API_VERSION", "v1")

app.register_blueprint(object.blueprint, url_prefix=f"/api/{version}/object")
app.register_blueprint(user.blueprint, url_prefix=f"/api/{version}/user")
