"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";

// Extend Window interface for Google Maps
declare global {
  interface Window {
    google?: typeof google;
  }
}

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: { address: string; lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  apiKey: string;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter address",
  className = "",
  apiKey,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Load Google Maps Places API script if not already loaded
    if (!scriptLoadedRef.current && typeof window !== "undefined") {
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api/js"]',
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          scriptLoadedRef.current = true;
          initializeAutocomplete();
        };
        document.head.appendChild(script);
      } else {
        // Script exists, check if places library is loaded
        const checkPlaces = setInterval(() => {
          if (
            typeof window.google !== "undefined" &&
            window.google.maps &&
            window.google.maps.places
          ) {
            clearInterval(checkPlaces);
            scriptLoadedRef.current = true;
            initializeAutocomplete();
          }
        }, 100);

        // Cleanup interval after 5 seconds
        setTimeout(() => clearInterval(checkPlaces), 5000);
      }
    } else if (scriptLoadedRef.current) {
      initializeAutocomplete();
    }

    function initializeAutocomplete() {
      if (
        !inputRef.current ||
        typeof window.google === "undefined" ||
        !window.google.maps ||
        !window.google.maps.places
      ) {
        return;
      }

      // Create autocomplete instance
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "ge" }, // Restrict to Georgia
          fields: ["formatted_address", "geometry", "name"],
        },
      );

      autocompleteRef.current = autocomplete;

      // Listen for place selection
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || place.name || value;

          // Update the input value
          onChange(address);

          // Call the callback with place details
          onPlaceSelect({
            address,
            lat,
            lng,
          });
        }
      });
    }

    return () => {
      // Cleanup: remove autocomplete listeners
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(
          autocompleteRef.current,
        );
      }
    };
  }, [apiKey, value, onChange, onPlaceSelect]);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default PlacesAutocomplete;
