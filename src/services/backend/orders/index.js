import { firestoreCollections, orderStatuses } from "../../helper"
import { generateFirestoreUid } from "../../helper/methods"
import { addDocument, deleteDocument, setDocument, updateDocument } from "../../utilities"


export const createOrder = async ({ userId, distributorId, reservationDate, numberOfPackages,companyName,companyAddress,companyLocation }) => {
    let response = null
    const id = generateFirestoreUid()
    const data = {
        userId,
        distributorId,
        reservationDate,
        id,
        numberOfPackages,
        status: orderStatuses.pending,
        companyName:companyName,
        companyAddress:companyAddress,
        companyLocation:companyLocation
    
    }
    console.log('createOrder: \ndata: ', data)
    await setDocument({
        collection: firestoreCollections.orders,
        id,
        data
    }).then(res => {
        if (res) {
            response = res
        }
    })
    return response
}

export const updateOrder = async ({ id, data }) => {
    let response = null
    console.log('updateOrder: \nid: ', id, '\ndata: ', data)
    await updateDocument({
        collection: firestoreCollections.orders,
        id,
        data
    }).then(res => {
        if (res) {
            response = res
        }
    })
    return response
}

export const deleteOrder = async ({ id }) => {
    let response = null
    deleteDocument({
        collection: firestoreCollections.orders,
        id,
    }).then(res => {
        if (res) {
            response = res
        }
    })
    return response
}
