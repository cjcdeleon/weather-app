terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_dynamodb_table" "weather-table" {
  name           = "weather-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }
}

data "aws_iam_policy_document" "lambda_policy_document" {
  statement {
    actions = [
      "dynamodb:Scan",
      "dynamodb:PutItem",
    ]
    resources = [
      aws_dynamodb_table.weather-table.arn
    ]
  }
}

resource "aws_iam_policy" "dynamodb_lambda_policy" {
  name        = "dynamodb-lambda-policy"
  description = "This policy will be used by the lambda to write get data from DynamoDB"
  policy      = data.aws_iam_policy_document.lambda_policy_document.json
}

resource "aws_iam_role_policy_attachment" "lambda_attachements" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.dynamodb_lambda_policy.arn
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      },
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "*"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }
  EOF
}


data "archive_file" "lambda_function_file" {
  type = "zip"
  source_file = "index.mjs"
  output_path = "currentWeather.zip"
}

resource "aws_lambda_function" "message_filter_lambda" {
  filename         = "currentWeather.zip"
  function_name    = "currentWeather"
  handler          = "index.handler"
  runtime          = "nodejs18.x"
  role             = "${aws_iam_role.iam_for_lambda.arn}"
  source_code_hash = data.archive_file.lambda_function_file.output_base64sha256
  timeout = 30
}
