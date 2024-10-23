export const formatFirebaseAuthErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-email": "The email address is invalid. Please check and try again.",
    "auth/user-disabled": "This user account has been disabled. Please contact support.",
    "auth/user-not-found": "No account found with this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already in use by another account.",
    "auth/weak-password": "Your password is too weak. Please choose a stronger password.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/too-many-requests": "Too many unsuccessful login attempts. Please try again later.",
    "auth/requires-recent-login": "Please log in again to proceed with this action.",
    "auth/invalid-credential": "The provided credentials are invalid. Please try again.",
    "Firebase: Error (auth/invalid-credential).": "The provided credentials are invalid. Please try again.",
    "Please verify your email to login. A verification email has been sent.": "Please verify your email to login. A verification email has been sent.",
    "User not found in our driver database": "User not found in our driver database.",
    "An email address is required to send the password reset link.": "An email address is required to send the password reset link.",
    "Your account is deactivated. Please contact support.": "Your account is deactivated. Please contact support.",
  };

  return errorMessages[errorCode] || "An unknown error occurred. Please try again.";
};
