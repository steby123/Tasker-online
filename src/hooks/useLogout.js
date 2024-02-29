import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { user, dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // Check if the user is available
      const { uid } = user;
      if (uid) {
        // Update online status
        await projectFirestore.collection('users').doc(uid).update({
          online: false,
        });
      }

      // Sign the user out
      await projectAuth.signOut();

      // Dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // Update state
      if (!isPending) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      // Update state in case of an error
      if (!isPending) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      setIsPending(false);
      setError(null);
    };
  }, []);

  return { logout, error, isPending };
};
