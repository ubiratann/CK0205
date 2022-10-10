import os
import api.router.object as obj
import api.router.user as user
import api.router.menu as menu

from flask import Flask

app = Flask(__name__)

ENVIRONMENT = os.environ.get("ENVIRONMENT", "DEV")

if(ENVIRONMENT == "DEV"):
    app.config.from_pyfile("config.py")

version = os.environ.get("API_VERSION", "v1")

app.register_blueprint(obj.blueprint, url_prefix=f"/api/{version}/object")
app.register_blueprint(user.blueprint, url_prefix=f"/api/{version}/user")
app.register_blueprint(menu.blueprint, url_prefix=f"/api/{version}/menu")
