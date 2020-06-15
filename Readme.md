Getting Started With Serverless

### CHAPTER 1 ###
-------------------------
Setup IAM Role and System Configuration
- Create USER has permission to create and modify by creating IAM Role
- Install Packages for setup cli-- 
    - npm i -g aws-cli
    - aws configure

- New Serverless Project and deploying a Lambda ()
  Serverless SETUP
    - npm i -g serverless
    - sls config credentials --provider aws --key aws_key --secret aws_secret --profile serverless-admin (SAME Name of IAM User)

    eg:
        sls config credentials --provider aws --key AKIAUDCONGQBWNMEBI3B --secret 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 --profile serverless-admin
       
- Create Template
    - sls create -t aws-nodejs 
        or
    - sls create --template aws-nodejs --path project_name
- sls deploy
- serverless deploy --aws-profile devProfile (With Profile)

Result: Service Information
service: serverlessproject
stage: dev
region: us-east-1
stack: serverlessproject-dev
resources: 6
api keys:
  None
endpoints:
  None
functions:
  hello: serverlessproject-dev-hello
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing


### CHAPTER 2 ###
-------------------------
Deploy an s3 bucket and upload data

- Add in serverless.yml file
```
resources:
  Resources:
    DemoBucketUpload:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: my-sls-bucket-demo

sls deploy

```

Add data in s3 bucket and create folder name upload and put some file into it 
```
plugins:
  - serverless-s3-sync

custom:
  s3Sync:
    - bucketName: my-sls-bucket-demo
      localDir: upload

npm i --save serverless-s3-sync

sls deploy
```

### CHAPTER 3 ###
-------------------
Creating API Serverless

Create a folder name lambdas and create js file name getUser.js that contains data object and accessed with key of object. Also created API Responses so that we can pass message with api calls
Setup yml file and modify functions

```

functions:
  getUser:
    handler: lambdas/getUser.handler
    events:
      - http:
          path: get-user/{ID}
          method: get
          cors: true
```
Result: Service Information

service: serverlessproject
stage: dev
region: us-east-1
stack: serverlessproject-dev
resources: 14
api keys:
  None
endpoints:
  GET - https://td4tfykn6i.execute-api.us-east-1.amazonaws.com/dev/get-user/{ID}
functions:
  getUser: serverlessproject-dev-getUser
layers:
  None
S3 Sync: Syncing directories and S3 prefixes

### CHAPTER 4 ###
---------------------
Adding Webpack to our Project and fix Lambda Upload Limits
Modify yml file with "serverless-webpack" and package 

```
plugins:
  - serverless-s3-sync
  - serverless-webpack

package:
  individually: true

```
npm i --save serverless-webpack
npm i --save webpack

Improve upload speed and seperation of upload limit. In webpack.config.js
If you change mode: "production" to "none", and save. We are not run in production we don't need extra processing to minify the code

``` sls deploy -f getUser```


### CHAPTER 5 ###
-------------------------
Create a Serverless Database - How we can build and deploy DynamoDB

- add DynamoDB to yml file as resources
  ```
  resources:
    Resources:
      MyDynamoDbTable:
        Type: AWS::DynamoDB::Table
        Properties:
          TableName: ${self:custom.tableName}
          AttributeDefinitions:
            - AttributeName: ID
              AttributeType: S
          KeySchema:
            - AttributeName: ID
              KeyType: HASH
          BillingMode: PAY_PER_REQUEST

  custom:
    tableName: player-points
  ```