import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import { connect } from 'react-redux';
// import firebase from "react-native-firebase";

  


class Privacy extends Component {


  constructor(props) {
    super(props);
    
    this.state = {
    
      
    };
  }

  componentDidMount() {
  }

    
render() { console.log("RENDER terms SCREEN!" );
    

return <View>

<Text style={{ color: "#FFFFFF", fontSize: 14, marginTop: 10, marginLeft:7}}>

<Text style={{fontSize: 16}}> 
This policy explains what information we collect when you use SuperQSO sites, services, mobile applications, products, and content (“Services”). It also has information about how we store, use, transfer, and delete that information. Our aim is not just to comply with privacy law. It’s to earn your trust.
{"\n\n"}
</Text>

<Text style={{fontWeight: "bold",  fontSize: 16}}>
Information We Collect & How We Use It
{"\n\n"}
</Text>


The tracking we do at SuperQSO is to make our product work as well as possible. So, to give you the best possible experience in using SuperQSO, we collect information from your interactions with our Services. Some of this information, you actively tell us (such as your email address, which we use to track your account or communicate with you). Other information, we collect based on actions you take while using SuperQSO, such as what pages you view (including how much of a given page and for how long) and your use of product features (like follows, likes, QsoScans and QsoLinks). This information includes records of those interactions, your Internet Protocol address, information about your device (such as device or browser type), and referral information (how you got to a particular page).
{"\n\n"}
We use this information to:
{"\n\n"}
provide, test, improve, promote and personalize the Services
fight spam and other forms of abuse
generate aggregate, non-identifying information about how people use the Services
Information Disclosure
SuperQSO won’t transfer information about you to third parties for the purpose of providing or facilitating third-party advertising to you. We won’t sell information about you to a third-party.
We may transfer your account information with third parties in some circumstances, including: (1) with your consent; (2) to a service provider or partner who meets our data protection standards; (3) with academic or non-profit researchers, with aggregation, anonymization, or pseudonymization; (4) when we have a good faith belief it is required by law, such as pursuant to a subpoena or other legal process; (5) when we have a good faith belief that doing so will help prevent imminent harm to someone.
If we are going to share your information in response to legal process, we’ll give you notice so you can challenge it (for example by seeking court intervention), unless we’re prohibited by law or believe doing so may endanger others or cause illegal conduct. We will object to legal requests for information about users of our services that we believe are improper.
{"\n\n"}

<Text style={{fontWeight: "bold",  fontSize: 16}}>
Public Data
{"\n\n"}
</Text>
Search engines may index your SuperQSO user profile page, public interactions (such as photos, audios, likes or comments), and post pages (such as QSOs, Listen, Post and the audios & photos), such that people may find these pages when searching against your name on services like Google, DuckDuckGo, or Bing. Users may also share links to your content on social media platforms such as Facebook or Twitter. Information posted about you by other user who use our services may also be public. For example, other user may tag you in a photo or mention you in a Post (Qso, Listen or Post). Other user may take a picture of you or record your voice from the radio during the QSO and post that audio in SuperQSO.
{"\n\n"} 

<Text style={{fontWeight: "bold",  fontSize: 16}}> 
Data Storage
{"\n\n"}
</Text>

SuperQSO uses third-party vendors and hosting partners, such as Amazon, for hardware, software, networking, storage, and related technology we need to run SuperQSO. We maintain two types of logs: server logs and event logs. By using the Services, you authorize SuperQSO  to transfer, store, and use your information in United States, and any other country where we operate.
{"\n\n"}
<Text style={{fontWeight: "bold",  fontSize: 16}}> 
Third-Party Embeds
{"\n\n"}
</Text>
Some of the content that you see displayed on SuperQSO is not hosted by SuperQSO. These “embeds” are hosted by a third-party and embedded in a SuperQSO page, so that it appears to be part of that page. For example: YouTube or Vimeo videos, Imgur or Giphy gifs, SoundCloud audio files, Twitter tweets, GitHub code snippets, or Scribd documents that appear within a SuperQSO post. These files send data to the hosted site just as if you were visiting that site directly (for example, when you load a SuperQSO post page with a YouTube video embedded in it, that video appears because of a pointer to files hosted by YouTube, and in turn YouTube receives data about your activity, such as your IP address and how much of the video you watch).
SuperQSO doesn’t control what data third parties collect in cases like this, or what they ultimately do with it. So, third-party embeds on SuperQSO are not covered by this Privacy Policy. They are covered by the privacy policy of the third-party service (so, when you watch a YouTube video embedded in a SuperQSO post, the use of data about your interactions with the video would be covered by YouTube’s privacy policy).
Some embeds may ask you for personal information, such as submitting your email address, through a form linked to from a SuperQSO post. We do our best to keep bad actors off of SuperQSO. However, if you choose to submit your information to a third party this way, we don’t know what they may do with it. As explained above, their actions are not covered by this Privacy Policy. So, please be careful when you see embedded forms on SuperQSO asking for your email address or any other personal information. Make sure you understand who you are submitting your information to and what they say they plan to do with it. We suggest that you do not submit your email address or other personal information to any third-party through an embedded form.
When posting on SuperQSO, you may not embed a form that allows submission of personal information by users. You must link offsite to a page that allows such submissions by users, and that page’s appearance must be distinct enough from SuperQSO to ensure it does not cause confusion among users over to whom they are submitting personal information. Failure to do so may lead SuperQSO to disable the post or take other action to limit or disable your account.
{"\n\n"}
<Text style={{fontWeight: "bold",  fontSize: 16}}> 
Tracking & Cookies
{"\n\n"}
</Text>
We use browser cookies and similar technologies to recognize you when you return to our Services. We use them in various ways, for example to log you in, remember your preferences (such as default language), evaluate email effectiveness, allow our paywall and meter to function, and personalize content and other services. Without cookies, our metered paywall would not work, so they are necessary to SuperQSO’s basic functionality.
SuperQSO saves data about the URLs you Save to SuperQSO , but we do not otherwise track your visits or activities off SuperQSO Services. We track your interactions within the SuperQSO Services (which encompasses SuperQSO.com, custom domains hosted by SuperQSO, and your interactions with our mobile application).
Some third-party services that we use to provide the Service, such as Google Analytics, may place their own cookies in your browser. This Privacy Policy covers use of cookies by SuperQSO only and not the use of cookies by third parties.
{"\n\n"}

<Text style={{fontWeight: "bold",  fontSize: 16}}> 
Location Information
{"\n\n"}
</Text>

We require information about your signup and current location, which we get from signals such as your IP address or device settings, to securely and reliably set up and maintain your account and to provide our services to you.
Subject to your settings, we may collect, use, and store additional information about your location - such as your current precise position or places where you’ve previously used SuperQSO - to operate or personalize our services including with more relevant content like local trends, posts, ads, calculation of a QSO distance, suggestions for people to follow, and futures features. 
Modifying or Deleting Your Personal Information
If you have a SuperQSO account, you can access, modify or export your personal information, or delete your account.
To protect information from accidental or malicious destruction, we may maintain residual copies for a brief time period (generally several weeks). But, if you delete your account, your information and content will be unrecoverable after that time. SuperQSO may preserve and maintain copies of your information beyond this time period when required to do so by law.
{"\n\n"}

{/* <Text style={{fontWeight: "bold",  fontSize: 16}}>  
Data Security
{"\n\n"}
</Text>

We use encryption (HTTPS/TLS) to protect data transmitted to and from our site. However, no data transmission over the Internet is 100% secure, so we can’t guarantee security. You use the Service at your own risk, and you’re responsible for taking reasonable measures to secure your account.
{"\n\n"} */}

<Text style={{fontWeight: "bold",  fontSize: 16}}>   
Affiliates and Change of Ownership
{"\n\n"}
</Text>

In the event that we are involved in a bankruptcy, merger, acquisition, reorganization, or sale of assets, your personal data may be sold or transferred as part of that transaction. This Privacy Policy will apply to your personal data as transferred to the new entity. We may also disclose personal data about you to our corporate affiliates in order to help operate our services and our affiliates’ services, including the delivery of ads.
Email from SuperQSO
Sometimes we’ll send you emails about your account, service changes or new policies. You can’t opt out of this type of “transactional” email (unless you delete your account). But, you can opt out of non-administrative emails such as digests, newsletters, and activity notifications through your account’s Settings page.
When you interact with an email sent from SuperQSO (such as opening an email or clicking on a particular link in an email), we may receive information about that interaction.
We won’t email you to ask for your password or other account information. If you receive such an email, please forward it to us at legal@superqso.com so we can investigate.
{"\n\n"}
 
<Text style={{fontWeight: "bold",  fontSize: 16}}>   
Children and our Service
{"\n\n"}
</Text>

Our services are not directed to children, and you may not use our services if you are under the age of 13. You must also be old enough to consent to the processing of your personal data in your country (in some countries we may allow your parent or guardian to do so on your behalf)
Changes to this Policy
SuperQSO may periodically update this Policy. We’ll notify you about significant changes to it. The most current version of the policy will always be here and we will archive former versions of the policy here.
 
 
 
</Text>
 



</View>; 
} 

}


 const mapStateToProps = state => {
    return {  

        
     };
};


const mapDispatchToProps = {
    
   
   }

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);