import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { RenameModal } from "@/components/modals/rename-modal";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="!pointer-events-auto">
        <ConvexClientProvider>
          {/* Global Modal so it's available everywhere */}
          <RenameModal />
          
          {/* Page content */}
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
