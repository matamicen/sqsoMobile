const config = {
    Auth: {
      identityPoolId: 'us-east-1:630321b3-e3c0-4886-a6a8-1d7e66a192d9',
      region: 'us-east-1',
  
      userPoolId: 'us-east-1_v0hUEyUMg',
      userPoolWebClientId: '2pms2b0i64226gr4tiokknpm0s',
  
      mandatorySignIn: false,
      aws_mandatory_sign_in: 'enable',
      bucket: 'sqso',
  
      cookieStorage: {
        domain: 'localhost',
        secure: false,
        path: '/',
        expires: 365
      }
  
      //   mandatorySignIn: false,
      //   aws_mandatory_sign_in: "enable",
      //   bucket: "sqso"
    },
  
    API: {
      endpoints: [
        {
          name: 'superqso',
          endpoint: 'https://api.zxcvbnmasd.com',
          region: 'us-east-1'
        }
      ]
    },
    Storage: {
      bucket: 'sqsovpcrds-sqsobucket-1cbtj8fwlc47a', // REQUIRED -  Amazon S3 bucket
      region: 'us-east-1',
      identityPoolId: 'us-east-1:630321b3-e3c0-4886-a6a8-1d7e66a192d9'
    },
    predictions: {
        convert: {
            translateText: {
                region: "us-east-1",
                proxy: false,
                defaults: {
                    sourceLanguage: "auto",
                    targetLanguage: "en"
                }
            },
            "speechGenerator": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "VoiceId": "Ivy",
                    "LanguageCode": "en-US"
                }
            },
            "transcription": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "language": "en-US"
                }
            }
        },
        "identify": {
            "identifyText": {
                "proxy": false,
                "region": "us-east-1",
                "defaults": {
                    "format": "PLAIN"
                }
            },
            "identifyEntities": {
                "proxy": false,
                "region": "us-east-1",
                "celebrityDetectionEnabled": true,
                "defaults": {
                    "collectionId": "identifyEntities8b89c648-test",
                    "maxEntities": 50
                }
            },
            "identifyLabels": {
                "proxy": false,
                "region": "us-east-1",
                "defaults": {
                    "type": "LABELS"
                }
            }
        },
        "interpret": {
            "interpretText": {
                "region": "us-east-1",
                "proxy": false,
                "defaults": {
                    "type": "ALL"
                }
            }
        }
    }
    // Analytics: {
    //   // OPTIONAL -  Amazon Pinpoint App ID
    //   disabled: true,
    //   // OPTIONAL -  Amazon service region
    //   region: "us-east-1"
    // }
  };
  export default config;
  