const config = {
    Auth: {
    identityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1',
    region:  'us-east-1',
    userPoolId: 'us-east-1_yznBlsoTx',
    userPoolWebClientId: '55lhidgnj7jtbo9vn0rrq3c0qa'
    },
    API: {
      endpoints: [
        {
          name: "superqso",
          endpoint: "https://bvi2z1683m.execute-api.us-east-1.amazonaws.com/reactWeb",
         
        }
      ]
    },
    Storage: {
      bucket: 'sqso', //REQUIRED -  Amazon S3 bucket
      region: 'us-east-1', //OPTIONAL -  Amazon service region
      identityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1'
  },
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: '3e67d1118562499dad5be6e0aef50eaf',
    // Amazon service region
    region: 'us-east-1',
    mandatorySignIn: false,
},
AWSKinesis: {

  // OPTIONAL -  Amazon Kinesis service region
  region: 'us-east-1',
  
  // OPTIONAL - The buffer size for events in number of items.
  bufferSize: 1000,
  
  // OPTIONAL - The number of events to be deleted from the buffer when flushed.
  flushSize: 100,
  
  // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
  flushInterval: 5000, // 5s
  
  // OPTIONAL - The limit for failed recording retries.
  resendLimit: 5
} 

  
  }
  export default config