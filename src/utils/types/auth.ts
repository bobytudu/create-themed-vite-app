export interface User {
    displayName: String,
    email: String,
    emailVerified: Boolean,
    isAnonymous: Boolean,
    phoneNumber: String,
    photoURL: String,
    providerData: Array<any>,
    uid: String
}