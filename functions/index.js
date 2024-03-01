/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentCreated,onDocumentDeleted,onDocumentUpdated} = require("firebase-functions/v2/firestore");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
admin.initializeApp();
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//On create a food reservation order
exports.onOrderCreated =
  onDocumentCreated('orders/{orderId}',async (event, context) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const orderData = snapshot.data();
    const distributorId = orderData.distributorId;
    const numberOfPeople = orderData.numberOfPeople || 1;


    try {
      // Retrieve the corresponding distributer document
      const distributerDoc = await admin.firestore().collection('distributors').doc(distributorId).get();

      if (!distributerDoc.exists) {
        console.error(`Distributer with ID ${distributorId} not found.`);
        return null;
      }

      // Update availableMeals field in the distributer document
      const currentAvailableMeals = distributerDoc.data().availableMeals;
      const updatedAvailableMeals = Number(currentAvailableMeals) - Number(numberOfPeople);

      await admin.firestore().collection('distributors').doc(distributorId).update({
        availableMeals: updatedAvailableMeals,
      });

      console.log(`Updated availableMeals for Distributer ID ${distributorId}: ${updatedAvailableMeals}`);
      return null;
    } catch (error) {
      console.error('Error updating availableMeals:', error);
      return null;
    }
  })


  //On cancel a food reservation order
  exports.onOrderCancelled =
  onDocumentUpdated('orders/{orderId}',async (event,context) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const newData = snapshot.after.data();
    const oldData = snapshot.before.data();
    if (oldData.status === 'pending' && newData.status === 'cancelled') {
    const orderData = newData;
    const distributorId = orderData.distributorId;
    const numberOfPeople = oldData.numberOfPeople || 1;

    try {
      // Retrieve the corresponding distributer document
      const distributerDoc = await admin.firestore().collection('distributors').doc(distributorId).get();

      if (!distributerDoc.exists) {
        console.error(`Distributer with ID ${distributorId} not found.`);
        return null;
      }

      // Update availableMeals field in the distributer document
      const currentAvailableMeals = distributerDoc.data().availableMeals;
      const updatedAvailableMeals = Number(currentAvailableMeals) + Number(numberOfPeople);

      await admin.firestore().collection('distributors').doc(distributorId).update({
        availableMeals: updatedAvailableMeals,
      });

      console.log(`Updated availableMeals for Distributer ID ${distributorId}: ${updatedAvailableMeals}`);
      return null;
    } catch (error) {
      console.error('Error updating availableMeals:', error);
      return null;
    }
  }
  })








  //On check the expired pending foor reservation orders
  exports.checkAndUpdateExpiredOrders = onSchedule("every day 00:01", async (event) => {
    const currentDate = new Date();

    // Set the time to midnight for accurate date comparison
    currentDate.setUTCHours(0, 0, 0, 0);

    try {
      // Query orders with status 'pending' and reservation date less than the current date
      const querySnapshot = await admin.firestore().collection('orders')
        .where('status', '==', 'pending')
        .where('reservationDate', '<=', currentDate)
        .get();

      // Update the status of each expired order to 'cancelled'
      const batch = admin.firestore().batch();
      querySnapshot.forEach((doc) => {
        const orderRef = admin.firestore().collection('orders').doc(doc.id);
        batch.update(orderRef, { status: 'cancelled' });
      });

      await batch.commit();

      console.log(`Updated status for expired orders: ${querySnapshot.size}`);
    } catch (error) {
      console.error('Error updating expired orders:', error);
    }

    return null;
  });



















// exports.updateAvailableMeals = functions.firestore
//   .document('orders/{orderId}')
//   .onCreate(async (snapshot, context) => {
//     const orderData = snapshot.data();
//     const distributorId = orderData.distributorId;

//     try {
//       // Retrieve the corresponding distributer document
//       const distributerDoc = await admin.firestore().collection('distributors').doc(distributorId).get();

//       if (!distributerDoc.exists) {
//         console.error(`Distributer with ID ${distributorId} not found.`);
//         return null;
//       }

//       // Update availableMeals field in the distributer document
//       const currentAvailableMeals = distributerDoc.data().availableMeals;
//       const updatedAvailableMeals = currentAvailableMeals - 1; // Assuming you decrement by 1, adjust as needed.

//       await admin.firestore().collection('distributors').doc(distributorId).update({
//         availableMeals: updatedAvailableMeals,
//       });

//       console.log(`Updated availableMeals for Distributer ID ${distributorId}: ${updatedAvailableMeals}`);
//       return null;
//     } catch (error) {
//       console.error('Error updating availableMeals:', error);
//       return null;
//     }
//   });
