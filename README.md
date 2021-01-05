# Serverless-React-Amplify-Cognito-Appsync-App

![Architecture]()


##### This Component will be used as reference implementation or starter kit for micro-services based implementation for React APP in serverless way. It can be used to deploy any API.

#### Techonologies used -
- React 
- GraphQL
- AWS 
 
#### Used following AWS services :
 
##### AWS component to be used - 
 - AWS App Sync
 - AWS Lambda
 - AWS DynamoDB
 - AWS Cognito
 
##### Deployment -
 - AWS Amplify
 - Serverless.yml

##### Prerequisite -
 - Node 12+
 - npm
 - Python 3+

### Steps for setup and deployment -

### Clone repository on local using 

```bash
git clone ""
```


###  To setup Backend follow below steps 

```bash
cd backend
```

### First Install serverless framework

```bash
npm i serverless -g
```
### You have to configure IAM user from our AWS account to use aws service and deployment

#### Go to IAM service on aws & 
- create new user with programattic access 
- attached existing policy to the user & set administrator access

```bash
cd backend
serverless config credentials --provider aws --key xxx --secret yyy --profile zzz
```

### Now you have to update serverless.yml file for below configurations

- region: '********' # add region
- profile: '************' # add user profile name here
- userPoolId:  '*****' # required # user pool ID

### Next, we'll run the deploy command to create the services in our account:

```bash
sls deploy
```

#### Once the deploy is complete, the AWS Appsync service, Dynampdb & Lambda functions have been successfully created in our account.

### You can check above services in your AWS account

### Now to setup frontend i.e. React APP follow below steps - 

```bash
cd ..
cd frondend
```

```bash
npm i
```

### The next thing we need to do is install & configure the AWS Amplify CLI. To do so, we'll use npm:

```bash
npm install -g @aws-amplify/cli
```

### Once the CLI is installed, we'll need to configure it to use an IAM user from our AWS account

```bash
amplify configure
```

### Next, we'll run the push command to create the services in our account:

```bash
amplify push
```

### Now, you'll be prompted for the following:

- Do you want to generate code for your newly created GraphQL API? Y

- Choose the code generation language target: JavaScript

- Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/*/.js

- Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Y

##### Once the push is complete, the AWS Amplify service have been successfully created in our account.

##### The library will recognize this directive & automcatically expand the schema into additional schema that is typically necessary for a robust API, including queries, mutations, subscriptions, resolvers & a data source (Amazon DynamoDB). Everything you need to get up & running is now set up for you using this directive.

##### If at any time you would like to view the services that have been created in your Amplify configuration, you can run amplify status.

##### Now before running app you have to configure aws cognito user pool id & graphql API endpoint which we have created using backend setup in aws-exports.js

##### Now, we should be able to run the app & see the queried data rendered to our screen:

```bash
npm start
```



