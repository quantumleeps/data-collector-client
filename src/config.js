export default {
  MAX_ATTACHMENT_SIZE: 15000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "app-collector-api-dev-attachmentsbucket-14j0mv5ddh804"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://dawxivussa.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_stulRX6Mw",
    APP_CLIENT_ID: "322ujfr04dpqnukndrjuhl0qhj",
    IDENTITY_POOL_ID: "us-east-1:b2d83a4c-8478-4fee-822a-18f427e36b74"
  }
};
