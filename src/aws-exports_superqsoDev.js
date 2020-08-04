const config = {
  Auth: {
  //  identityPoolId: "us-east-1:800789c1-c80d-4041-a395-b96f8c520a08",
  // identityPoolId: 'us-east-1:2cf52faa-ca6d-41a5-9bd0-70d7a57f025a',
  identityPoolId: 'us-east-1:daa39e2c-c363-4b97-91a9-de1ae54c7590',
    region: "us-east-1",
 //   userPoolId: 'us-east-1_4pxrtcUkJ',
    userPoolId: 'us-east-1_IZ0rymzBv',
    // userPoolWebClientId: '3sj7e62qn4fcm9q5bee4q4vl2',
    userPoolWebClientId: '32ouiqpjfne8l0vnsasplhmgvr',
    // userPoolId: "us-east-1_M18Nqj16I",
    // userPoolWebClientId: "6ekve4eh0fof6nqt9biq3876kh",
  //   mandatorySignIn: false,
  //   aws_mandatory_sign_in: "enable",
  //   bucket: "sqso"
  mandatorySignIn: false,
  aws_mandatory_sign_in: 'enable',
  bucket: 'sqso',
 
  cookieStorage: {
    domain: 'localhost',
    secure: false,
    path: '/',
    expires: 365
  }
  },
  
  // API: {
  //   endpoints: [
  //     {
  //       name: "superqso",
  //       endpoint: "https://3hzhw0ugo1.execute-api.us-east-1.amazonaws.com/Prod",
  //       region: "us-east-1"
  //     }
  //   ]
  // },
  // https://l06twd2dz0.execute-api.us-east-1.amazonaws.com
  API: {
    endpoints: [
      {
        name: "superqso",
        // endpoint: "https://d1xllikkw9xhcf.cloudfront.net",
        // endpoint: "https://api.zxcvbnmasd.com",
        endpoint: 'https://hlcyk2ty6c.execute-api.us-east-1.amazonaws.com/Prod',
//          endpoint: "https://l06twd2dz0.execute-api.us-east-1.amazonaws.com/Prod",
        region: "us-east-1"
      }
    ]
  },
  Storage: {
    // bucket: "sqsovpcrds-sqsobucket-7mm5nfwuu0ws", //REQUIRED -  Amazon S3 bucket
    bucket: 'sqsovpcrds-sqsobucket-12jwrpncf5o8h', // REQUIRED -  Amazon S3 bucket
  // bucket: 'sqsovpcrds-sqsobucket-12jwrpncf5o8h', // REQUIRED -  Amazon S3 bucket    region: "us-east-1", //OPTIONAL -  Amazon service region
    // identityPoolId: "us-east-1:800789c1-c80d-4041-a395-b96f8c520a08"
    // identityPoolId: 'us-east-1:2cf52faa-ca6d-41a5-9bd0-70d7a57f025a',
    region: 'us-east-1', // OPTIONAL -  Amazon service region
    identityPoolId: 'us-east-1:daa39e2c-c363-4b97-91a9-de1ae54c7590'
  }
  // Analytics: {
  //   // OPTIONAL -  Amazon Pinpoint App ID
  //   disabled: true,
  //   // OPTIONAL -  Amazon service region
  //   region: "us-east-1"
  // }
};
export default config;