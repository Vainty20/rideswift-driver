import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage, db, auth } from "../../config/firebaseConfig";
import { formatDate } from "../../utils/formatDate";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async () => {
    const user = auth.currentUser.uid;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const reportsQuery = query(
      collection(db, "reports"),
      where("driverId", "==", user),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(reportsQuery);
    const reports = [];

    querySnapshot.forEach((doc) => {
      reports.push({
        id: doc.id,
        ...doc.data(),
        bookCreatedAt: formatDate(doc.data().bookCreatedAt),
        createdAt: formatDate(doc.data().createdAt),
      });
    });

    return reports;
  }
);

export const createReport = createAsyncThunk(
  "reports/createReport",
  async (reportData) => {
    const { images, title, description, item } = reportData;
    const reportQuerySnapshot = await getDocs(
      query(
        collection(db, "reports"),
        where("bookId", "==", `${item.id}${item.driverId}-dr`)
      )
    );

    if (!reportQuerySnapshot.empty) {
      throw new Error("A report for this booking already exists.");
    }

    const uploadedImageUrls = [];

    for (const imageUri of images) {
      const imageRef = ref(
        storage,
        `reports/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`
      );

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      uploadedImageUrls.push(downloadURL);
    }

    const reportDoc = {
      title,
      description,
      images: uploadedImageUrls,
      driverId: item.driverId,
      driverMobileNumber: item.driverMobileNumber,
      driverName: item.driverName,
      driverProfilePic: item.driverProfilePic,
      driverPlateNumber: item.driverPlateNumber,
      userId: item.userId,
      userMobileNumber: item.userMobileNumber,
      userName: item.userName,
      rideDistance: item.rideDistance,
      ridePrice: item.ridePrice,
      rideTime: item.rideTime,
      dropoffCoords: item.dropoffCoords,
      dropoffLocation: item.dropoffLocation,
      pickupCoords: item.pickupCoords,
      pickupLocation: item.pickupLocation,
      bookCreatedAt: item.createdAt,
      bookId: `${item.id}${item.driverId}-dr`,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "reports"), reportDoc);

    return {
      ...reportDoc,
      bookCreatedAt: formatDate(reportDoc.bookCreatedAt),
      createdAt: formatDate(reportDoc.createdAt),
    };
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.reports.push(action.payload);
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
