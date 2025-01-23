"use client";

import { useDrawingContext } from "@/lib/contexts/drawing-context";

export default function DrawingNameInput() {
  const { savedDrawings, currentDrawingDetails } = useDrawingContext();
  return (
    <>
      {/* {JSON.stringify(currentDrawingDetails?.id)} */}
      <input
        type="text"
        placeholder="Untitled Drawing"
        defaultValue={
          currentDrawingDetails
            ? currentDrawingDetails?.title
            : `squibble #${savedDrawings.length + 1}`
        }
        // onChange={(evt) => {
        // const drawingDetailsObj = {
        //   ...currentDrawingDetails,
        // };
        // drawingDetailsObj.title = evt.target.value;
        // setCurrentDrawingDetails({
        //   title: evt.target.value,
        //   ...currentDrawingDetails,
        // });
        // console.log(
        //   "new title",
        //   evt.target.value,
        //   currentDrawing,
        //   drawingDetailsObj,
        // );
        // setCurrentDrawingDetails((prev) => ({
        //   ...prev,
        //   title: evt.target.value,
        //   data: currentDrawing,
        // }));
        // setDrawingTitle(evt.target.value);
        // if (currentDrawingDetails !== null) {
        // setCurrentDrawingDetails({
        //   title: evt.target.value,
        //   ...currentDrawingDetails,
        // });
        // }
        // }}
        className="p-2"
      />
    </>
  );
}
