import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";

export default function useFetchBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = () => {
      try {
        const bookingsCollection = collection(db, "book");
        const bookingsQuery = query(
          bookingsCollection,
          where("driverId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(
          bookingsQuery,
          (bookingsSnapshot) => {
            const bookingsData = bookingsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setBookings(bookingsData);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching driver data and bookings:", error);
            setError(error);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, loading, error };
}
