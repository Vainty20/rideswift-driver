import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default function useCurrentBooking(id) {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const currentBookingDocRef = doc(db, "book", id);

    const unsubscribe = onSnapshot(
      currentBookingDocRef,
      (currentBookingDocSnapshot) => {
        if (currentBookingDocSnapshot.exists()) {
          const fetchedCurrentBooking = {
            id: currentBookingDocSnapshot.id,
            ...currentBookingDocSnapshot.data(),
          };
          setCurrentBooking(fetchedCurrentBooking);
        } else {
          console.log("Book document does not exist");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching book data:", error);
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  return { currentBooking, loading, error };
}
