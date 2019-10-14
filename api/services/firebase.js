const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://pub-wallet.firebaseio.com"
});
let db = admin.firestore();
module.exports = {
  getPushTokenByCustomerIdAndSendNotification(userId, notification) {

    db.collection('customer').where('_id', '==', userId ).get()
      .then(snapshot => {
        let payload = {
          notification
        };
        snapshot.forEach( doc => {
          const data = doc.data()
          if(data.push_token) {
            const options = {
              priority: 'high',
              timeToLive: 60 * 60 * 24
            };
          admin.messaging().sendToDevice(data.push_token, payload, options)
            .then((response) => {
              // Response is a message ID string.
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
          }

        });
      })
      .catch(console.log)
    return id
  }
}
