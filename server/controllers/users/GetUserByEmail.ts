import admin from "firebase-admin";

export const getUserByUserEmail = async (req: any, res: any) => {
  try {
    const query = (
      await admin
        .firestore()
        .collection("users")
        .where("email", "==", req.body.email)
        .get()
    ).docs[0];

    const result = query ? query.data() : null;

    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ message: `Error in ${e}` });
  }
};
