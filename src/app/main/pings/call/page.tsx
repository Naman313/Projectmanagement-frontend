'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Minimize, Maximize, PhoneOff, VideoOff, Mic, MicOff } from 'lucide-react';

const CallingPage = () => {
  const router = useRouter();
  const [isCalling, setIsCalling] = useState(true);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoActive, 
          audio: isAudioActive 
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setIsCalling(false);
      }
    };

    startCall();

    return () => {
      const stream = localVideoRef.current?.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoActive, isAudioActive]);

  const toggleVideo = () => {
    setIsVideoActive(prev => !prev);
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoActive;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioActive(prev => !prev);
    const stream = localVideoRef.current?.srcObject as MediaStream;
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioActive;
      }
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      remoteVideoRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const endCall = () => {
    router.push('/chat');
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Top Section */}
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <img 
          src="/profile-icon.png" 
          alt="Profile Icon" 
          className="w-10 h-10 rounded-full"
        />
        <span className="font-medium text-gray-800">User Name</span>
      </div>
      <div className="absolute top-4 right-4">
        <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800">
          <svg className="w-6 h-6"> {/* View Icon */}</svg>
        </button>
      </div>

      {/* Video Section */}
      <div className="flex flex-col items-center justify-center h-full">
        <video 
          ref={remoteVideoRef} 
          className="w-full h-[60%] rounded-lg bg-black"
          autoPlay 
          playsInline
        />
        <video 
          ref={localVideoRef} 
          className="absolute bottom-20 left-4 w-32 h-24 rounded-lg bg-black"
          autoPlay 
          muted 
          playsInline
        />
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-4 w-full flex justify-between items-center px-6">
        {/* Left - Invite Button */}
        <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800">
          <svg className="w-6 h-6"> {/* Invite Icon */}</svg>
        </button>

        {/* Center - Mic, Video, End Call */}
        <div className="flex items-center gap-4">
          <button
            className={`p-3 rounded-full hover:bg-gray-700 transition-colors ${
              isVideoActive ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
            }`}
            onClick={toggleVideo}
          >
            {isVideoActive ? <VideoOff className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>
          <button
            className={`p-3 rounded-full hover:bg-gray-700 transition-colors ${
              isAudioActive ? 'bg-gray-700 text-white' : 'bg-red-500 text-white'
            }`}
            onClick={toggleAudio}
          >
            {isAudioActive ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          <button
            className="p-3 rounded-full hover:bg-gray-700 bg-red-500 text-white transition-colors"
            onClick={endCall}
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>

        {/* Right - Chat, Screen Share, More */}
        <div className="flex items-center gap-4">
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800">
            <svg className="w-6 h-6"> {/* Chat Icon */}</svg>
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800">
            <svg className="w-6 h-6"> {/* Screen Share Icon */}</svg>
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800">
            <svg className="w-6 h-6"> {/* More Icon */}</svg>
          </button>
        </div>
      </div>
    </div>
  );
};


export default CallingPage;

