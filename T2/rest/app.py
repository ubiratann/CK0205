import os
import api.router.object as obj
import api.router.user as user
import api.router.menu as menu
import api.router.healthcheck as healthcheck
import api.utils.minio as minio

from flask import Flask

app = Flask(__name__)

ENVIRONMENT = os.environ.get("ENVIRONMENT", "DEV")
BUCKET_NAME = os.environ.get("BUCKET_NAME", "svp")

if(ENVIRONMENT == "DEV"):
    app.config.from_pyfile("config.py")

version = os.environ.get("API_VERSION", "v1")

minio.create_bucket(BUCKET_NAME)

app.register_blueprint(healthcheck.blueprint, url_prefix='/api/v1/health')
app.register_blueprint(obj.blueprint, url_prefix=f"/api/{version}/object")
app.register_blueprint(user.blueprint, url_prefix=f"/api/{version}/user")
app.register_blueprint(menu.blueprint, url_prefix=f"/api/{version}/menu")
