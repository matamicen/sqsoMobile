import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1
    // marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20
  },
  title: {
    fontSize: 32
  }
});
export default styles;
// .qso-header {
//   display: grid;
//   grid-template-columns: 50px auto 10px;
//   /* grid-gap: 1em; */
//   grid-template-rows: 25px auto;
//   grid-template-areas: 'profileSection actionSection buttonSection' 'profileSection infoSection buttonSection';
//   /* justify-content: space-evenly; */
// }

// .qso-avatar {
//   grid-area: profileSection;
//   text-align: center;
//   /* position: fixed; */
//   /* grid-column: 1 / 4;
//     grid-row: 1; */
//   /* z-index: 1; */
// }

// .qso-header-action {
//   font-size: 1.3rem;
//   /*grid-column: span 4;*/
//   grid-area: actionSection;
//   /* grid-column: 2;
//     grid-row: 2; */
//   /* max-width: 730px; */
//   align-self: end;
//   margin-left: 4px;
// }

// .qso-header-info {
//   grid-area: infoSection;
//   margin-top: 0.1rem;
//   margin-left: 10px;
//   display: flex;
//   justify-content: space-between;
//   text-align: center;
//   font-size: 1rem;
//   line-height: 1.2em;
//   /* position: sticky;
//   top: 60px;
//   left: 0;
//   height: 100vh; */
// }
// .qso-header-info-post {
//   grid-area: infoSection;
//   margin-top: 0.1rem;
//   margin-left: 4px;
//   display: flex;
//   justify-content: flex-start;
//   text-align: center;
//   font-size: 1rem;
//   line-height: 2em;
//   align-self: center;
//   /* position: sticky;
//   top: 60px;
//   left: 0;
//   height: 100vh; */
// }
// .qso-header-info-post > div {
//   margin: 5px;
// }
// .qso-header-button {
//   grid-area: buttonSection;
//   /* position: sticky;
//   top: 60px;
//   left: 0;
//   height: 100vh; */
// }

// @media (max-width: 910px) {
//   .qso-header {
//     display: grid;
//     grid-template-columns: 50px auto 10px;
//     /* grid-gap: 1em; */
//     grid-template-rows: auto auto;
//     grid-template-areas: 'profileSection actionSection buttonSection' 'profileSection infoSection buttonSection';
//     /* justify-content: space-evenly; */
//   }

//   .qso-avatar {
//     grid-area: profileSection;
//     text-align: center;
//     /* position: fixed; */
//     /* grid-column: 1 / 4;
//       grid-row: 1; */
//     /* z-index: 1; */
//   }

//   .qso-header-action {
//     font-size: 1.2rem;
//     /*grid-column: span 4;*/
//     grid-area: actionSection;
//     /* grid-column: 2;
//       grid-row: 2; */
//     /* max-width: 730px; */
//     align-self: end;
//     margin-left: 4px;
//   }

//   .qso-header-info {
//     grid-area: infoSection;
//     margin-top: 0.1rem;
//     margin-left: 10px;
//     display: flex;
//     justify-content: space-between;
//     text-align: center;
//     font-size: 0.8rem;
//     line-height: 1.2em;
//     /* position: sticky;
//     top: 60px;
//     left: 0;
//     height: 100vh; */
//   }
//   .qso-header-info-post {
//     grid-area: infoSection;
//     margin-top: 0.1rem;
//     margin-left: 4px;
//     display: flex;
//     justify-content: flex-start;
//     text-align: center;
//     font-size: 1rem;
//     line-height: 2em;
//     align-self: center;
//     /* position: sticky;
//     top: 60px;
//     left: 0;
//     height: 100vh; */
//   }
//   .qso-header-info-post > div {
//     margin: 5px;
//   }
//   .qso-header-button {
//     grid-area: buttonSection;
//     /* position: sticky;
//     top: 60px;
//     left: 0;
//     height: 100vh; */
//   }
// }

// .slick-track {
//   display: flex;
// }
// .rdw-image-modal {
//   position: relative !important;
// }
// .rdw-emoji-modal {
//   position: relative !important;
// }
// .rdw-embedded-modal {
//   position: relative !important;
// }
// .ReactVirtualized__Grid {
//   overflow: visible !important;
// }
// .ReactVirtualized__List {
//   overflow: visible !important;
// }
// .ReactVirtualized__Grid__innerScrollContainer {
//   overflow: visible !important;
// }
// .ui.segment {
//   margin: 0.5rem 0em;
//   padding: 0.5em 0.5em;
// }
// .link-button-follow {
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   text-decoration: underline;
//   /* display: flex; */
//   margin: 0;
//   padding: 0;
//   font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
//   font-size: 0.9rem;
//   color: #4183c4;
//   margin-bottom: -4px;
//   margin-left: 5px;
//   text-decoration: none;
// }

// .link-button-follow:hover,
// .link-button-follow:focus {
//   text-decoration: none;
// }
// .link-button {
//   background-color: transparent;
//   border: none;
//   cursor: pointer;
//   text-decoration: underline;
//   display: flex;
//   margin: 0;
//   padding: 0;
//   font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
//   font-size: 1.1rem;
//   color: #4183c4;
//   margin-bottom: 5px;
//   text-decoration: none;
// }

// .link-button:hover,
// .link-button:focus {
//   text-decoration: none;
// }
// #banner {
//   position: fixed;
//   left: 50%;
//   margin-right: -50%;
//   transform: translate(-50%, -50%);
// }
// .adMobile {
//   display: none;

//   justify-content: center;
//   visibility: hidden;
//   padding: initial;
// }
// .socialMobile {
//   display: none;

//   /* justify-content: center; */
//   visibility: hidden;
//   padding: initial;
// }
// .socialDesktop {
//   display: grid;
//   visibility: visible;
//   /* justify-content: center; */
//   padding: initial;
// }
// .adDesktop {
//   display: flex;
//   visibility: visible;
//   justify-content: center;
//   padding: initial;
// }

// .slick-slide {
//   /* padding: 0 15px; */
//   padding-right: 1em;
// }

// .slick-list {
//   padding: 1px;
// }

// /* .ReactVirtualized__Grid__innerScrollContainer {
//   overflow: visible !important;
// } */
// /* HOME */
// .notifIcon {
//   display: flex;
// }
// /*logo mobile*/
// .mobile {
//   display: none;
//   padding: 0;
//   height: 50px;
// }

// .desktop {
//   display: block;
//   padding: 0;
//   height: 48px;
// }
// .image {
//   height: 50vh;
// }
// .NavBar {
//   /* padding: 2px; */
//   width: 80%;
// }
// .global-container {
//   display: grid;
//   grid-template-columns: 160px 730px 160px;
//   /* grid-gap: 1em; */
//   grid-template-rows: 60px auto;
//   grid-template-areas: 'pageHeader pageHeader pageHeader' 'leftSection mainSection rightSection';
//   justify-content: space-evenly;
// }

// .site-header {
//   grid-area: pageHeader;
//   position: fixed;
//   /* grid-column: 1 / 4;
//     grid-row: 1; */
//   z-index: 1;
// }

// .site-main {
//   /*grid-column: span 4;*/
//   grid-area: mainSection;
//   /* grid-column: 2;
//     grid-row: 2; */
//   max-width: 730px;
// }

// .site-left {
//   grid-area: leftSection;
//   position: sticky;
//   top: 60px;
//   left: 0;
//   height: 100vh;
// }

// .site-right {
//   grid-area: rightSection;
//   /* grid-column: 3;
//     grid-row: 2; */
//   position: sticky;
//   top: 60px;
//   left: 0;
//   height: 100vh;
// }

// /* FEED ITEMS */

// .feed-item-comments {
//   overflow: 'visible';
// }
// /* .feed-item-qras-segment {
//   padding-top: 1vh;
//   padding-bottom: 0.5vh;
//   min-width: 30%;
//   text-align: center;
// } */
// /* .feed-item-qras {
//   display: flex;
//   overflow-x: auto;
//   overflow-y: hidden;
//   justify-content: flex-start;
//   flex-wrap: nowrap;
//   gap: 10px;
// } */

// /* .feed-item-qras::before,
// .feed-item-qras::after {
//   content: '';
//   /* Insert pseudo-element */
// /* margin: auto; */
// /* Make it push flex items to the center */
// /* } */
// .slick-prev:before,
// .slick-next:before {
//   color: black;
//   display: none;
// }

// /* QRA PROFILE */

// .profile-container {
//   display: grid;
//   grid-template-columns: 160px 730px 160px;
//   /* grid-gap: 1em; */
//   grid-template-rows: 60px auto;
//   grid-template-areas: 'pageHeader pageHeader pageHeader' 'leftSection mainSection rightSection';
//   justify-content: space-evenly;
//   margin: 0.5em;
// }

// .profile-main {
//   /*grid-column: span 4;*/
//   grid-area: mainSection;
//   display: -ms-flexbox;
//   display: -webkit-flex;
//   display: flex;
//   -webkit-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   -webkit-flex-wrap: nowrap;
//   -ms-flex-wrap: nowrap;
//   flex-wrap: nowrap;
//   -webkit-justify-content: flex-start;
//   -ms-flex-pack: start;
//   justify-content: flex-start;
//   -webkit-align-content: stretch;
//   -ms-flex-line-pack: stretch;
//   -webkit-align-items: center;
//   -ms-flex-align: center;
//   align-items: stretch;
//   align-content: center;
//   max-width: 730px;
// }

// .profile-header {
//   -webkit-order: 0;
//   -ms-flex-order: 0;
//   order: 0;
//   -webkit-flex: 0 1 auto;
//   -ms-flex: 0 1 auto;
//   flex: 0 1 auto;
// }

// .profile-header .inner {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: center;
//   align-content: center;
// }

// .profile-header .inner .pic {
//   -webkit-order: 1;
//   -ms-flex-order: 1;
//   order: 1;
//   -webkit-flex: 0 1 auto;
//   -ms-flex: 0 1 auto;
//   flex: 0 1 auto;
// }

// .profile-header .inner .detail {
//   -webkit-order: 2;
//   -ms-flex-order: 2;
//   order: 2;
//   -webkit-flex: 1 1 auto;
//   -ms-flex: 1 1 auto;
//   flex: 1 1 auto;
//   align-self: flex-start;
//   margin-left: 10%;
// }

// .profile-header .inner .detail .qra {
//   font-size: 4rem;
// }

// .profile-header .inner .detail .name {
//   font-size: 2rem;
// }
// .profile-header .inner .detail .kpi {
//   display: flex;
//   font-size: smaller;
//   margin-top: 1vh;
// }
// /* .profile-header .inner .detail .follow {
//   margin-left: 30%;
// } */

// .profile-buttons {
//   -webkit-order: 1;
//   -ms-flex-order: 1;
//   order: 1;
//   -webkit-flex: 0 1 auto;
//   -ms-flex: 0 1 auto;
//   flex: 1 1 auto;
//   display: flex;
//   justify-content: space-between;
// }

// /* .profile-buttons .inner {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-start;
//   align-items: center;
//   align-content: center;
// } */
// .exploreUsers-main {
//   /*grid-column: span 4;*/
//   grid-area: mainSection;
//   display: -ms-flexbox;
//   display: -webkit-flex;
//   display: flex;
//   -webkit-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   -webkit-flex-wrap: nowrap;
//   -ms-flex-wrap: nowrap;
//   flex-wrap: nowrap;
//   -webkit-justify-content: flex-start;
//   -ms-flex-pack: start;
//   justify-content: flex-start;
//   -webkit-align-content: stretch;
//   -ms-flex-line-pack: stretch;
//   -webkit-align-items: center;
//   -ms-flex-align: center;
//   align-items: stretch;
//   align-content: center;
//   max-width: 730px;
// }
// .exploreUsers {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(190px, 2fr));
//   grid-template-rows: 200px;
//   grid-column-gap: 20px;
//   grid-row-gap: 20px;
//   justify-items: center;
//   align-items: center;
// }
// .exploreUsers .qra {
//   display: flex;
//   -webkit-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   align-content: stretch;
// }
// .profile-following {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(70px, 2fr));
//   grid-template-rows: 100px;
//   grid-column-gap: 20px;
//   grid-row-gap: 20px;
//   justify-items: center;
//   align-items: center;
// }

// .profile-following .qra {
//   display: flex;
//   -webkit-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   align-content: stretch;
// }

// .profile-following .qra .avatar {
//   flex: 0 1 80%;
//   /* height: 70px; */
//   align-content: center;
// }

// .profile-following .qra .qra {
//   flex: 0 1 20%;
//   align-content: center;
//   text-align: center;
// }

// .profile-detail {
//   -webkit-order: 2;
//   -ms-flex-order: 2;
//   order: 2;
//   /* -webkit-flex: 1 1 auto;
//   -ms-flex: 1 1 auto;
//   flex: 1 1 auto; */
// }

// .profile-bio > img {
//   max-height: 100%;
//   max-width: 100%;
//   height: auto;
//   width: auto;
// }

// /* QSO DETAIL */

// .qsoDetail-container {
//   display: grid;
//   grid-template-columns: 160px 570px 160px;
//   /* grid-gap: 1em; */
//   grid-template-rows: 60px auto;
//   grid-template-areas: 'pageHeader pageHeader pageHeader' 'leftSection mainSection rightSection';
//   justify-content: space-evenly;
// }

// .qsoDetail-main {
//   /*grid-column: span 4;*/
//   grid-area: mainSection;
//   /* grid-column: 2;
//     grid-row: 2; */
//   max-width: 730px;
// }

// /* Notifications */

// .notifications-container {
//   display: grid;
//   grid-template-columns: 160px 570px 160px;
//   /* grid-gap: 1em; */
//   grid-template-rows: 60px auto;
//   grid-template-areas: 'pageHeader pageHeader pageHeader' 'leftSection mainSection rightSection';
//   justify-content: space-evenly;
// }

// .notifications-main {
//   /*grid-column: span 4;*/
//   grid-area: mainSection;
//   /* grid-column: 2;
//     grid-row: 2; */
//   max-width: 730px;
// }

// /* Auth */

// .changepassword-main {
//   grid-area: mainSection;
//   display: flex;
//   -webkit-flex-direction: column;
//   -ms-flex-direction: column;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: stretch;
//   align-content: stretch;
//   text-align: center;
//   align-self: center;
// }
// /*--------------------------------*/
// @media (max-width: 910px) {
//   .socialMobile {
//     display: grid;
//     visibility: visible;
//     /* justify-content: center; */
//     padding: initial;
//   }

//   .socialDesktop {
//     display: none;

//     /* justify-content: center; */
//     visibility: hidden;
//     padding: initial;
//   }
//   .adMobile {
//     display: flex;
//     visibility: visible;
//     justify-content: center;
//     padding: initial;
//   }

//   .adDesktop {
//     display: none;

//     justify-content: center;
//     visibility: hidden;
//     padding: initial;
//   }
//   .NavBar {
//     /* padding: 2px; */
//     width: 100%;
//   }
//   .notifIcon {
//     flex: '1 1 auto';
//     padding: 0;
//   }
//   .mobile {
//     display: block;
//     padding: 0;
//     margin: 3px;
//     height: 40px;
//   }
//   .desktop {
//     display: none;
//   }
//   .image {
//     height: 40vh;
//   }

//   .global-container {
//     grid-template-columns: repeat(1, 100%);
//     grid-template-rows: 60px auto;
//     grid-template-areas: 'pageHeader' 'mainSection';
//     justify-content: space-between;
//   }
//   .site-header {
//     grid-area: pageHeader;
//     position: fixed;
//     width: 100%;
//   }
//   .site-main {
//     /*grid-column: span 4;*/
//     grid-area: mainSection;
//     /* grid-column: 2;
//         grid-row: 2; */
//     max-width: 730px;
//   }
//   .site-left {
//     display: none;
//   }
//   .site-right {
//     display: none;
//   }
//   .profile-container {
//     display: grid;
//     grid-template-columns: repeat(1, 100%);
//     /* grid-gap: 1em; */
//     grid-template-rows: 60px auto;
//     grid-template-areas: 'pageHeader' 'mainSection';
//     justify-content: space-between;
//   }
//   .profile-main {
//     /*grid-column: span 4;*/
//     grid-area: mainSection;
//     /* grid-column: 2;
//         grid-row: 2; */
//     max-width: 730px;
//   }
//   .qsoDetail-container {
//     grid-template-columns: repeat(1, 100%);
//     grid-template-rows: 60px auto;
//     grid-template-areas: 'pageHeader' 'mainSection';
//     justify-content: space-between;
//   }
//   .qsoDetail-main {
//     /*grid-column: span 4;*/
//     grid-area: mainSection;
//     /* grid-column: 2;
//         grid-row: 2; */
//     max-width: 730px;
//   }
//   .notifications-container {
//     grid-template-columns: repeat(1, 100%);
//     grid-template-rows: 70px auto;
//     grid-template-areas: 'pageHeader' 'mainSection';
//     justify-content: space-between;
//   }
//   .notifications-main {
//     /*grid-column: span 4;*/
//     grid-area: mainSection;
//     /* grid-column: 2;
//         grid-row: 2; */
//     max-width: 730px;
//   }
//   .profile-header .inner .detail {
//     -webkit-order: 2;
//     -ms-flex-order: 2;
//     order: 2;
//     -webkit-flex: 1 1 auto;
//     -ms-flex: 1 1 auto;
//     flex: 1 1 auto;
//     align-self: flex-start;
//   }
//   .profile-header .inner .detail .qra {
//     font-size: 3rem;
//     /* margin-left: 10%; */
//   }
//   .profile-header .inner .detail .name {
//     font-size: 1.5rem;
//     /* margin-left: 10%; */
//   }
//   /* .profile-header .inner .detail .follow {
//     margin-left: 10%;
//   } */
//   .profile-following {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(70px, 2fr));
//     grid-template-rows: 100px;
//     grid-column-gap: 20px;
//     grid-row-gap: 20px;
//     justify-items: center;
//     align-items: center;
//   }
//   .changepassword-main {
//     grid-area: mainSection;
//     display: flex;
//     -webkit-flex-direction: column;
//     -ms-flex-direction: column;
//     flex-direction: column;
//     justify-content: flex-start;
//     align-items: stretch;
//     align-content: stretch;
//     align-self: center;
//     text-align: center;
//   }
// }
