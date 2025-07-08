
import React from 'react';

const ShipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 21h20" />
    <path d="M5 21V5.07a4 4 0 0 1 1.58-3.22A4 4 0 0 1 10.15 1h3.7a4 4 0 0 1 3.57 2.85A4 4 0 0 1 19 5.07V21" />
    <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    <path d="M12 11h.01" />
  </svg>
);

export default ShipIcon;
