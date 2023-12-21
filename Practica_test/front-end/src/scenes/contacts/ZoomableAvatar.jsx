import React, { useState } from "react";
import { Box, Avatar } from "@mui/material";

const ZoomableAvatar = ({ src }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e) => {
    setDragging(true);
    setPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoomLevel = Math.min(Math.max(zoomLevel + e.deltaY * 0.01, 1), 3);
    setZoomLevel(newZoomLevel);
  };

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      style={{
        overflow: "hidden",
        width: "200px", // Ajusta el tamaño según sea necesario
        height: "200px", // Ajusta el tamaño según sea necesario
      }}
    >
      <Avatar
        alt="Zoomable Image"
        src={src}
        style={{
          transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
    </Box>
  );
};

export default ZoomableAvatar;
