import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "YOUR_USER_POOL_ID",
  ClientId: "YOUR_CLIENT_ID"
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], null, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const login = (email, password) => {
  const user = new CognitoUser({
    Username: email,
    Pool: userPool
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err)
    });
  });
};