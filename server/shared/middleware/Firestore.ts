const { getFirestore } = require('firebase-admin/firestore');

export const getCollection = (collection: string) => getFirestore().collection(collection);

export const getAllDocs = async (collection: string) => {
  const snapshot = await getFirestore().collection(collection).get();
  const documents = snapshot.docs.map((doc: any) => doc.data());
  return documents;
}

export const getDoc = async (collection: string, doc: any) => {
  const document = await getCollection(collection).doc(doc).get();
  return document;
}
