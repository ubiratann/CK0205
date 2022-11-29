import mysql.connector
import os
import logging
from mysql.connector import MySQLConnection
from mysql.connector.cursor import MySQLCursor
from mysql.connector import Error

USER     = os.environ.get("MYSQL_USER", "root")
PASSWORD = os.environ.get("MYSQL_PASSWORD", "qwe123")
HOST     = os.environ.get("MYSQL_HOST", "localhost")
DATABASE = os.environ.get("MYSQL_DATABASE", "svp")

class DatabaseConnector:

    def __init__(self) -> None:
        self.connection = None  
        self.get_connection()

    def get_cursor(self) -> MySQLCursor:
        self.get_connection()
        return self.connection.cursor(dictionary=True)

    def get_connection(self):
        if not self.connection:
            try:
                self.connection: MySQLConnection = mysql.connector.connect(host=HOST,
                                                                        database=DATABASE,
                                                                        user=USER,
                                                                        password=PASSWORD,
                                                                        autocommit=True)
            except Error as err:
                logging.error(err)

    def close_connection(self) -> None:
        self.connection.close()
