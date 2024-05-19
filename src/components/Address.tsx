import React, { useState, useEffect } from "react";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import "../App.css";

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "googlemapsapi";

const client = new SecretsManagerClient({
  region: "us-west-2",
});

const Address: React.FC = () => {
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await client.send(
          new GetSecretValueCommand({
            SecretId: secret_name,
            VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
          })
        );
        const secret = response.SecretString;
        if (secret) {
          setApiKey(secret);
        }
      } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        console.error("Error retrieving secret:", error);
      }
    };

    fetchSecret();
  }, []);

  const handlePlaceChange = (e: any) => {
    setFormattedAddress(e.target.value?.formattedAddress ?? "");
  };

  const countries: string[] = [];

  return (
    <div>
      <APILoader apiKey={apiKey} solutionChannel="GMP_GCC_placepicker_v1" />
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
