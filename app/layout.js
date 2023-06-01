"use client";
import { UserProvider } from "@/contexts/UserContext";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import "./globals.css";
import { RoomProvider } from "@/contexts/RoomContext";
import { PeerProvider } from "@/contexts/PeerContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HMSRoomProvider>
          <UserProvider>
            <RoomProvider>
              <PeerProvider>
              {children}
              </PeerProvider>
              </RoomProvider>
          </UserProvider>
        </HMSRoomProvider>
      </body>
    </html>
  );
}
