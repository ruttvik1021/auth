export const baseUrl = "localhost:3000/";

export const authApiEndPoints = {
  signUp: "/api/auth/signup",
  signIn: "/api/auth/signin",
  signOut: "/api/auth/signout",
  currentUser: "/api/auth/currentuser",
  completeProfile: "/api/auth/completeprofile",
  countryList: "/api/auth/countryList",
  industries: "/api/auth/industries",
};

export const middlewareLocations = {
  CurrentUser: "CurrentUser",
};

export const currentUserMessagesAndErrors = {
  didNotFindUser: "Did not find user",
  detailsUpdatesSuccessfully: "Details updated successfully",
};

export const JWT_KEY = process.env.JWT_KEY!;
// export const JWT_KEY = "UnV0dHZpazEwMjE=";
