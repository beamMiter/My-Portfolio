// src/types/model-viewer.d.ts
import type { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        poster?: string;
        "camera-controls"?: boolean | "";
        "auto-rotate"?: boolean | "";
        ar?: boolean | "";
        "environment-image"?: string;
        exposure?: number | string;
        "shadow-intensity"?: number | string;
        "disable-zoom"?: boolean | "";
        style?: CSSProperties;
      };
    }
  }
}
export {};
