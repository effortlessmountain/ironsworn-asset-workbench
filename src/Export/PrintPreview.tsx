import React from "react";

export function PrintPreview(props: { images: string[]; back() }) {
  return (
    <>
      <section className="print-controls" style={{ marginLeft: "20px" }}>
        <p>
          If you want a PDF, select "Print to PDF" as your printer when you t.If
          you want the images of the sheets of assets, right click and save.
        </p>
        <div className="vertical">
          <button onClick={window.print}>PRINT</button>
          <button onClick={props.back}>BACK</button>
        </div>
      </section>
      {props.images.map((image, i) => {
        return (
          <section className="print-page" key={i}>
            <img src={image} alt="A rendered page of assets"></img>
          </section>
        );
      })}
    </>
  );
}
