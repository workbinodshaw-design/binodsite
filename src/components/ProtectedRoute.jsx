import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        // Fetch role from Firestore 'users' collection
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
        
          // Founder Fail-Safe: Always grant admin to the founder's exact email
          if (user.email && user.email.toLowerCase() === 'work.binodshaw@gmail.com') {
            setUserRole('admin');
            // Automatically create/fix their admin document in the database just in case
            if (!userDoc.exists() || userDoc.data().role !== 'admin') {
              await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'admin',
                createdAt: userDoc.exists() ? userDoc.data().createdAt : new Date()
              }, { merge: true });
            }
          } else if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            // Default role if not assigned
            setUserRole('guest');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole('guest');
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <Loader2 className="spin" size={48} color="#a388ff" />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (requiredRole === 'admin') return <Navigate to="/admin-login" replace />;
    if (requiredRole === 'employee') return <Navigate to="/team-login" replace />;
    return <Navigate to="/client-login" replace />;
  }

  // If a specific role is required and user doesn't have it (Admin overrides everything)
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    if (userRole === 'employee') return <Navigate to="/employee" replace />;
    if (userRole === 'client') return <Navigate to="/client" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
