export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "quallasuyu-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://k7ixzm3zr0.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_y3LHvvlPG",
    APP_CLIENT_ID: "7t5u8rmgkdqmsokh0bteamt16a",
    IDENTITY_POOL_ID: "admin@example.com"
  }
};
