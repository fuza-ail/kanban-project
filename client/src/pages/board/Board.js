import React from "react";
import { useParams } from "react-router-dom";

export default function Board() {
  const param = useParams();

  return (
    <div>
      {JSON.stringify(param)}
    </div>
  );
}
