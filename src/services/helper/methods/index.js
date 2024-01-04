import firestore from '@react-native-firebase/firestore'

export function getFirestoreDate() {
  return new Date(firestore.Timestamp.now().seconds * 1000)
}

export function roundToDecimal(number, decimalPlaces) {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(number * multiplier) / multiplier;
}

export function generateFirestoreUid(length = 20) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function formatToOrderReservationDate(date){
return moment(date).format('YYYY-MM-DD')
}

export function formatFromOrderReservationDate(date){
  return moment(date,'YYYY-MM-DD').format('YYYY-MM-DD')
  }