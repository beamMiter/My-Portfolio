import localFont from "next/font/local";

/**
 * Inter, for every small reading-size line in intro sections 2 to 4. The big
 * type stays in the system face; giving the small text a face of its own is
 * what keeps it from reading as the big type shrunk down and left behind.
 *
 * Exposed as a CSS variable (--font-inter-intro): each section puts
 * `inter.variable` on its root and its stylesheet picks the face up by name.
 */
export const inter = localFont({
  src: [
    {
      path: "../../../public/fonts/Inter-VariableFont_opsz,wght.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter-intro",
  display: "swap",
});
