import uuid
import boto3
from boto3.dynamodb.conditions import Attr, And, Key
from decimal import Decimal


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
        FilterExpression= Attr("object").eq(item["id"]) & Attr("validated").eq('true')
    )

    not_validated = table.scan(
        FilterExpression= Attr("object").eq(item["id"]) & Attr("validated").eq('false')
    )

    parse_decimal(validated["Items"])
    parse_decimal(not_validated["Items"])

    return {
        "validated":  validated["Items"],
        "not_validated":  not_validated["Items"]
    }

def parse_decimal(body):

    if isinstance(body, list):
        for list_item in body:
            list_item = parse_decimal(list_item)
    
    elif isinstance(body, dict):
        for item in body:
            if isinstance(body[item], dict):
                body[item] = parse_decimal(body[item])
           
            if isinstance(body[item], Decimal):
                body[item] = int(body[item])  
            
            if isinstance(body[item], list):
                for index in range(len(body[item])):
                    if isinstance(body[item][index], Decimal):
                        print("entrou")
                        body[item][index] = int(body[item][index])
