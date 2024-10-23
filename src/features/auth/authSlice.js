import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "../../config/firebaseConfig";
import { formatDate } from "../../utils/formatDate";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const register = createAsyncThunk(
  "auth/register",
  async ({
    firstName,
    lastName,
    email,
    mobileNumber,
    birthDate,
    gender,
    weight,
    vehicle,
    plateNumber,
    maxLoad,
    password,
  }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );

    const user = userCredential.user;
    const createdAt = serverTimestamp();

    await setDoc(doc(db, "drivers", user.uid), {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: user.email,
      mobileNumber: mobileNumber.trim(),
      birthDate: birthDate,
      address: "",
      gender: gender.trim(),
      weight: weight.trim(),
      vehicle: vehicle.trim(),
      plateNumber: plateNumber.trim(),
      maxLoad: maxLoad.trim(),
      profilePic: "",
      isApproved: true,
      role: "driver",
      createdAt,
    });

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      await signOut(auth);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      await signOut(auth);
      throw new Error(
        "Please verify your email to login. A verification email has been sent."
      );
    }

    const userDocRef = doc(db, "drivers", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await signOut(auth);
      throw new Error("User not found in our driver database");
    }

    const userData = userDocSnap.data();

    if (!userData.isApproved) {
      await signOut(auth);
      throw new Error("Your account is deactivated. Please contact support.");
    }

    return {
      ...userData,
      createdAt: formatDate(userData.createdAt),
      birthDate: formatDate(userData.birthDate),
    };
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const userDocRef = doc(db, "drivers", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("User not found in our user database");
    }

    const userData = userDocSnap.data();
    return {
      ...userData,
      createdAt: formatDate(userData.createdAt),
      birthDate: formatDate(userData.birthDate),
    };
  }
);

export const changeProfilePic = createAsyncThunk(
  "auth/changeProfilePic",
  async (blob) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const storageRef = ref(storage, `user/${user.uid}/profilePic`);

    const snapshot = await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(snapshot.ref);

    const userDocRef = doc(db, "drivers", user.uid);
    await updateDoc(userDocRef, { profilePic: url });

    return url;
  }
);

export const editPersonalInfo = createAsyncThunk(
  "auth/editPersonalInfo",
  async ({
    firstName,
    lastName,
    address,
    weight,
    vehicle,
    plateNumber,
    maxLoad,
  }) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const userDocRef = doc(db, "drivers", user.uid);

    await updateDoc(userDocRef, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      weight: weight.trim(),
      vehicle: vehicle.trim(),
      plateNumber: plateNumber.trim(),
      maxLoad: maxLoad.trim(),
    });

    return { firstName, lastName, address, weight, vehicle, plateNumber, maxLoad };
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async ({ newEmail, password }) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password.trim()
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail.trim());
    await signOut(auth);
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    await sendPasswordResetEmail(auth, email.trim());
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ newPassword, currentPassword }) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword.trim()
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword.trim());
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(changeProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeProfilePic.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePic = action.payload;
        }
        state.loading = false;
      })
      .addCase(changeProfilePic.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPersonalInfo.fulfilled, (state, action) => {
        if (state.user) {
          const { firstName, lastName, address, weight, vehicle, plateNumber, maxLoad } = action.payload;
          state.user.firstName = firstName;
          state.user.lastName = lastName;
          state.user.address = address;
          state.user.weight = weight;
          state.user.vehicle = vehicle;
          state.user.plateNumber = plateNumber;
          state.user.maxLoad = maxLoad;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(editPersonalInfo.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeEmail.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isLoggedIn = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
