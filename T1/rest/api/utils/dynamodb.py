import uuid
import boto3
from boto3.dynamodb.conditions import Attr, And, Key


dynamodb = boto3.resource('dynamodb',region_name='us-east-1')
table = dynamodb.Table('svp')


def put_item(item) -> None:
    item["id"] = uuid.uuid4().int & (1<<64)-1
    table.put_item(Item={**item})


def purge_item(object) -> None:

    scan = table.scan(
        FilterExpression=Attr("object").eq(object) 
    )

    for item in scan["Items"]:
        table.delete_item(
            Key={
                "id": int(item["id"]),
                "object": int(item["object"])
            }
        )

def query_resume(item):
    validated = table.scan(
        FilterExpression= Attr("object").eq(item["id"]) & Attr("validated").eq(True)
    )

    not_validated = table.scan(
        FilterExpression= Attr("object").eq(item["id"]) & Attr("validated").eq(True)
    )

    return {
        "validated": validated["Items"],
        "not_validated": not_validated["Items"]
    }


