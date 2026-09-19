import React from "react";
import SiteNav from "./SiteNav";

// Shared bar for every page except the home page (which uses the same
// SiteNav, transparent over the hero).
export default function Navbar() {
  return <SiteNav variant="page" />;
}
