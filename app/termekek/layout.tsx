// File: app/termekek/layout.tsx
// Ez a layout biztosítja, hogy a /termekek/ alatti oldalak
// a fő layouton (root) belül jelenjenek meg.

import React from 'react';

export default function TermekekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nincs szükség Navbar-ra, Footer-re vagy globals.css importra,
  // mert azokat már a gyökér app/layout.tsx kezeli.
  return (
    <>
      {children}
    </>
  );
}