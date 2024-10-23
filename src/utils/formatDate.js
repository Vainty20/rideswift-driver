import { Timestamp } from 'firebase/firestore';

export const formatDate = (timestamp) => {
  if (!timestamp || !(timestamp instanceof Timestamp)) return ''; 

  const date = timestamp.toDate();
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
