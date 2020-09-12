import React, { useLayoutEffect, ReactNode } from "react";
import html2canvas from "html2canvas";
export function RenderImage(props: {
  children: ReactNode;
  handleImage(dataUrl: string): void;
}) {
  useLayoutEffect(() => {
    //TODO: make a nice overlay to mask the rendering
    window.scrollTo(0, 0);
    const render = document.querySelector(".render");
    html2canvas(render.firstChild as HTMLElement, {
      allowTaint: true,
    }).then((canvas) => {
      props.handleImage(canvas.toDataURL());
    });
  });

  return <div className="render">{props.children}</div>;
}
