export default {
  MAX_ATTACHMENT_SIZE: 15000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "app-collector-api-dev-attachmentsbucket-7m690qjdhtzm"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://okfsmd5q74.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_61ekbBadf",
    APP_CLIENT_ID: "6ivm0ec54sf8qkh1o5sad0rpm7",
    IDENTITY_POOL_ID: "us-east-1:746be8b6-6fb3-4bdd-a793-23b0d4cdb927"
  }
};
