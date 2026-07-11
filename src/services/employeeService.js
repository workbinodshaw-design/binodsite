import { db } from '../firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  orderBy 
} from 'firebase/firestore';

const EMPLOYEES_COLLECTION = 'employees';

export const getNextEmployeeId = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const q = query(employeesRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return 'CF-0001';
  
  const existingIds = snapshot.docs.map(doc => doc.id);
  
  // Find highest CF-XXXX
  let maxId = 0;
  existingIds.forEach(id => {
    if (id.startsWith('CF-')) {
      const num = parseInt(id.split('-')[1]);
      if (num > maxId) maxId = num;
    }
  });
  
  const nextNum = maxId + 1;
  return `CF-${nextNum.toString().padStart(4, '0')}`;
};

export const createEmployee = async (employeeData) => {
  const employeeId = await getNextEmployeeId();
  
  const newEmployee = {
    id: employeeId,
    ...employeeData,
    status: employeeData.status || 'active',
    joiningDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await setDoc(doc(db, EMPLOYEES_COLLECTION, employeeId), newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id, employeeData) => {
  const employeeRef = doc(db, EMPLOYEES_COLLECTION, id);
  
  const updatedData = {
    ...employeeData,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(employeeRef, updatedData);
  return { id, ...updatedData };
};

export const deleteEmployee = async (id) => {
  const employeeRef = doc(db, EMPLOYEES_COLLECTION, id);
  await deleteDoc(employeeRef);
};

export const getActiveEmployees = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const querySnapshot = await getDocs(employeesRef);
  
  const employees = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.status === 'active') {
      employees.push({ id: doc.id, ...data });
    }
  });
  
  // Sort by ID safely
  return employees.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
};

export const getAllEmployees = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const querySnapshot = await getDocs(employeesRef);
  
  const employees = [];
  querySnapshot.forEach((doc) => {
    employees.push({ id: doc.id, ...doc.data() });
  });
  
  return employees.sort((a, b) => (a.id || '').localeCompare(b.id || ''));
};

export const getEmployeeById = async (id) => {
  const employeeRef = doc(db, EMPLOYEES_COLLECTION, id);
  const employeeSnap = await getDoc(employeeRef);
  
  if (employeeSnap.exists()) {
    return { id: employeeSnap.id, ...employeeSnap.data() };
  }
  
  return null;
};
