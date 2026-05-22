import KapcsolatClient from "./KapcsolatClient";
import { headers } from "next/headers";

export const metadata = {
  title: "Kapcsolat",
};

export default function KapcsolatPage() {
  return <KapcsolatClient />;
}
