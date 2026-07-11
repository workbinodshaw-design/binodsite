import { db, storage } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EMPLOYEES_COLLECTION = 'employees';

export const getNextEmployeeId = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const q = query(employeesRef, orderBy('id', 'desc'), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return 'CF-0001';
  }
  
  const lastEmployee = querySnapshot.docs[0].data();
  const lastId = lastEmployee.id; // e.g. "CF-0001"
  
  if (!lastId || !lastId.startsWith('CF-')) {
    return 'CF-0001';
  }
  
  const numStr = lastId.split('-')[1];
  const nextNum = parseInt(numStr, 10) + 1;
  return `CF-${nextNum.toString().padStart(4, '0')}`;
};

export const uploadEmployeePhoto = async (file, employeeId) => {
  if (!file) return null;
  const storageRef = ref(storage, `employees/${employeeId}_${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const createEmployee = async (employeeData, photoFile) => {
  const newId = await getNextEmployeeId();
  
  let photoUrl = null;
  if (photoFile) {
    photoUrl = await uploadEmployeePhoto(photoFile, newId);
  }
  
  const newEmployee = {
    id: newId,
    ...employeeData,
    photoUrl,
    status: employeeData.status || 'active',
    joiningDate: employeeData.joiningDate || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  await setDoc(doc(db, EMPLOYEES_COLLECTION, newId), newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id, updateData, newPhotoFile) => {
  const employeeRef = doc(db, EMPLOYEES_COLLECTION, id);
  let photoUrl = updateData.photoUrl;
  
  if (newPhotoFile) {
    photoUrl = await uploadEmployeePhoto(newPhotoFile, id);
  }
  
  const dataToUpdate = {
    ...updateData,
    photoUrl,
    updatedAt: new Date().toISOString()
  };
  
  await updateDoc(employeeRef, dataToUpdate);
  return { id, ...dataToUpdate };
};

export const getActiveEmployees = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const querySnapshot = await getDocs(employeesRef);
  
  const employees = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.status === 'active') {
      employees.push(data);
    }
  });
  
  // Sort by ID
  return employees.sort((a, b) => a.id.localeCompare(b.id));
};

export const getAllEmployees = async () => {
  const employeesRef = collection(db, EMPLOYEES_COLLECTION);
  const querySnapshot = await getDocs(employeesRef);
  
  const employees = [];
  querySnapshot.forEach((doc) => {
    employees.push(doc.data());
  });
  
  return employees.sort((a, b) => a.id.localeCompare(b.id));
};

export const getEmployeeById = async (id) => {
  const employeeRef = doc(db, EMPLOYEES_COLLECTION, id);
  const employeeSnap = await getDoc(employeeRef);
  
  if (employeeSnap.exists()) {
    return employeeSnap.data();
  }
  
  return null;
};
