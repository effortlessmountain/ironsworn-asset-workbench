import React from "react";
import { useHistory } from "react-router-dom";

export function PrintPreview(props: { images: string[] }) {
  const history = useHistory();

  return (
    <>
      <section className="print-controls" style={{ marginLeft: "20px" }}>
        <div className="print-help">
          <p>
            If you want a PDF, select "Print to PDF" as your printer. If you
            want the images of the sheets of assets, right click and save.
          </p>
        </div>
        <div className="sidebar">
          <button onClick={() => history.push("/")}>BACK</button>
          <button onClick={window.print}>PRINT</button>
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
