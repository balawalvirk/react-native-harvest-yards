/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentCreated,onDocumentDeleted} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.onOrderCreated = 
  onDocumentCreated('orders/{orderId}',async (event, context) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const orderData = snapshot.data();
    const distributerId = orderData.distributerId;

    try {
      // Retrieve the corresponding distributer document
      const distributerDoc = await admin.firestore().collection('distributers').doc(distributerId).get();
      
      if (!distributerDoc.exists) {
        console.error(`Distributer with ID ${distributerId} not found.`);
        return null;
      }

      // Update availableMeals field in the distributer document
      const currentAvailableMeals = distributerDoc.data().availableMeals;
      const updatedAvailableMeals = currentAvailableMeals - 1; // Assuming you decrement by 1, adjust as needed.

      await admin.firestore().collection('distributers').doc(distributerId).update({
        availableMeals: updatedAvailableMeals,
      });

      console.log(`Updated availableMeals for Distributer ID ${distributerId}: ${updatedAvailableMeals}`);
      return null;
    } catch (error) {
      console.error('Error updating availableMeals:', error);
      return null;
    }
  })
  
  exports.onOrderCancelled = 
  onDocumentDeleted('orders/{orderId}',async (event, context) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log("No data associated with the event");
        return;
    }
    const orderData = snapshot.data();
    const distributerId = orderData.distributerId;

    try {
      // Retrieve the corresponding distributer document
      const distributerDoc = await admin.firestore().collection('distributers').doc(distributerId).get();
      
      if (!distributerDoc.exists) {
        console.error(`Distributer with ID ${distributerId} not found.`);
        return null;
      }

      // Update availableMeals field in the distributer document
      const currentAvailableMeals = distributerDoc.data().availableMeals;
      const updatedAvailableMeals = currentAvailableMeals + 1; // Assuming you decrement by 1, adjust as needed.

      await admin.firestore().collection('distributers').doc(distributerId).update({
        availableMeals: updatedAvailableMeals,
      });

      console.log(`Updated availableMeals for Distributer ID ${distributerId}: ${updatedAvailableMeals}`);
      return null;
    } catch (error) {
      console.error('Error updating availableMeals:', error);
      return null;
    }
  })

//Older version
// exports.updateAvailableMeals = functions.firestore
//   .document('orders/{orderId}')
//   .onCreate(async (snapshot, context) => {
//     const orderData = snapshot.data();
//     const distributerId = orderData.distributerId;

//     try {
//       // Retrieve the corresponding distributer document
//       const distributerDoc = await admin.firestore().collection('distributers').doc(distributerId).get();
      
//       if (!distributerDoc.exists) {
//         console.error(`Distributer with ID ${distributerId} not found.`);
//         return null;
//       }

//       // Update availableMeals field in the distributer document
//       const currentAvailableMeals = distributerDoc.data().availableMeals;
//       const updatedAvailableMeals = currentAvailableMeals - 1; // Assuming you decrement by 1, adjust as needed.

//       await admin.firestore().collection('distributers').doc(distributerId).update({
//         availableMeals: updatedAvailableMeals,
//       });

//       console.log(`Updated availableMeals for Distributer ID ${distributerId}: ${updatedAvailableMeals}`);
//       return null;
//     } catch (error) {
//       console.error('Error updating availableMeals:', error);
//       return null;
//     }
//   });