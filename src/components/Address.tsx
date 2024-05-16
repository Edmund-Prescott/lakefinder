import React, { useState } from "react";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import "../App.css";

const Address: React.FC = () => {
  const [formattedAddress, setFormattedAddress] = useState<string>("");

  const handlePlaceChange = (e: any) => {
    setFormattedAddress(e.target.value?.formattedAddress ?? "");
  };

  const countries: string[] = [];

  return (
    <div>
      <APILoader apiKey="" solutionChannel="GMP_GCC_placepicker_v1" />
      <div className="container">
        <PlacePicker
          country={countries}
          placeholder="Enter a place to see its address"
          onPlaceChange={handlePlaceChange}
        />
        <div className="result">{formattedAddress}</div>
      </div>
    </div>
  );
};

export default Address;
