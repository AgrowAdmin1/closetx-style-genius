
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Video, VideoOff, Mic, MicOff, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface CallInterfaceProps {
  mode: 'video' | 'audio';
  contact: string;
  onEndCall: () => void;
}

const CallInterface: React.FC<CallInterfaceProps> = ({ mode, contact, onEndCall }) => {
  const [isVideoOn, setIsVideoOn] = useState(mode === 'video');
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  
  // Simulate call connection
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  // Start call timer once connected
  useEffect(() => {
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success(`${mode === 'video' ? 'Video' : 'Audio'} call connected`);
    }, 2000);
    
    // Call duration timer
    let timer: number;
    if (isConnected) {
      timer = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [mode, isConnected]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleVideo = () => {
    if (mode === 'audio') return;
    setIsVideoOn(prev => !prev);
    toast.info(isVideoOn ? 'Video turned off' : 'Video turned on');
  };
  
  const toggleAudio = () => {
    setIsAudioOn(prev => !prev);
    toast.info(isAudioOn ? 'Microphone muted' : 'Microphone unmuted');
  };
  
  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        {mode === 'video' && isVideoOn ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <p className="text-white">Camera preview would appear here</p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <Avatar className="h-20 w-20">
              <img src="/placeholder.svg" alt={contact} />
            </Avatar>
            <h3 className="mt-4 text-white font-medium">{contact}</h3>
          </div>
        )}
        
        {/* Small self-view for video calls */}
        {mode === 'video' && (
          <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded border border-gray-700">
            <div className="h-full flex items-center justify-center">
              <p className="text-white text-xs">You</p>
            </div>
          </div>
        )}
        
        {/* Call status overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {isConnecting ? 'Connecting...' : formatTime(callDuration)}
        </div>
      </div>
      
      <div className="flex gap-4 justify-center mt-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleAudio}
        >
          {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-red-500" />}
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={onEndCall}
        >
          <Phone className="h-5 w-5 rotate-135" />
        </Button>
        
        {mode === 'video' && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={toggleVideo}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-red-500" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CallInterface;
