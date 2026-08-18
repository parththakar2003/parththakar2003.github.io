import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  other: {
    "x-ctf-03": "RkxBR3ttM3Q0X2Q0dDRfa24wd3NfNGxsfQ==",
  },
};

export default function CTFLayout({ children }: { children: React.ReactNode }) {
  return children;
}
