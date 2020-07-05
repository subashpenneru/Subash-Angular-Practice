const firebaseKey = 'AIzaSyBSHGrS1-Jq-fTIYWKpD4W4v5gXc8dHSw0';

export const environment = {
  production: true,
  apiUrl: 'https://recipe-5595.firebaseio.com/',
  SIGN_UP_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseKey,
  SIGN_IN_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseKey
};
