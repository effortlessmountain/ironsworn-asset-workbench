import React, { ReactNode } from "react";
import html2canvas from "html2canvas";
export function RenderImage(props: {
  children: ReactNode;
  handleImage(dataUrl: string): void;
}) {
  //TODO: make a nice overlay to mask the rendering

  // Using both setTimeout (with no timeout length) and requestAnimationFrame
  // fixes an issue where html2canvas would throw  the following error:
  //
  // CSSStyleSheet.cssRules getter: Can't access rules of still-loading stylsheet
  //
  //See https://stackoverflow.com/a/34999925 for more info

  window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      const render = document.querySelector(".render");
      html2canvas(render.firstChild as HTMLElement, {
        allowTaint: true,
      }).then((canvas) => {
        props.handleImage(canvas.toDataURL());
      });
    });
  });

  return <div className="render">{props.children}</div>;
}
