import React, { createContext, useState } from "react";
import doctorsData from "../data/doctor.json"; // JSON estático

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <DoctorContext.Provider value={{ selectedDoctor, setSelectedDoctor, doctors: doctorsData }}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
