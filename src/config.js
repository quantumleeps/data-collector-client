export default {
  MAX_ATTACHMENT_SIZE: 15000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "app-collector-api-dev-attachmentsbucket-p4xpydpjo1ov"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ko598eemce.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_fdLaTwPuh",
    APP_CLIENT_ID: "4ii64d8vghaggi3s5d5iv1antr",
    IDENTITY_POOL_ID: "us-east-1:0a7920cf-008b-400e-8b5d-99d898fe6232"
  }
};
