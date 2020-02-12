const config = {
    Auth: {
      identityPoolId: "us-east-1:800789c1-c80d-4041-a395-b96f8c520a08",
      region: "us-east-1",
      userPoolId: "us-east-1_M18Nqj16I",
      userPoolWebClientId: "6ekve4eh0fof6nqt9biq3876kh",
    //   mandatorySignIn: false,
    //   aws_mandatory_sign_in: "enable",
    //   bucket: "sqso"
    },
    
    API: {
      endpoints: [
        {
          name: "superqso",
          endpoint: "https://3hzhw0ugo1.execute-api.us-east-1.amazonaws.com/Prod",
          region: "us-east-1"
        }
      ]
    },
    Storage: {
      bucket: "sqsovpcrds-sqsobucket-7mm5nfwuu0ws", //REQUIRED -  Amazon S3 bucket
      region: "us-east-1", //OPTIONAL -  Amazon service region
      identityPoolId: "us-east-1:800789c1-c80d-4041-a395-b96f8c520a08"
    }
    // Analytics: {
    //   // OPTIONAL -  Amazon Pinpoint App ID
    //   disabled: true,
    //   // OPTIONAL -  Amazon service region
    //   region: "us-east-1"
    // }
  };
  export default config;