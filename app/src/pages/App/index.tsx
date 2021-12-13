import React from "react";

import Address from "../Address";
import AddressList from "../List";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Address />} />
      <Route path="/address" element={<Address />} />
      <Route path="/login" element={<Address />} />
      <Route path="/list" element={<AddressList />} />
    </Routes>
  );
}
