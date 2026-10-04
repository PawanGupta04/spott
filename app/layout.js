import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark ,neobrutalism } from "@clerk/ui/themes";
export const metadata = {
  title: "spott",
  description: "Discover and create amazing events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              theme: dark,
            }}
          >
            <ConvexClientProvider>
              {/* Header */}
              <Header />
              <main className="relative isolate min-h-screen container mx-auto pt-40 md:pt-32">
                {/* glow */}
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
                  <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />
                </div>
                <div className="relative z-10 min-h-[70vh]">{children}</div>
                {/* Footer */}
                <footer className="border-t border-gray-800/50 py-8 px-6 max-w-7xl mx-auto">
                  <div className="text-sm text-gray-400">
                    Made with ❤️ by Pawan Gupta
                  </div>
                </footer>
              </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
