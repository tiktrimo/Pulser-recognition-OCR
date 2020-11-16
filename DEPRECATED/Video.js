import React, { useRef } from "react";
import useUserMedia from "./useUserMedia";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "user" },
};
export default function Video(props) {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }
  return (
    <video
      width="1200"
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
    />
  );
}
