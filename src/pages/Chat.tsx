
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Paperclip, Send, Video, Mic, ShoppingCart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import AppLayout from '@/components/Layout/AppLayout';
import { Card } from '@/components/ui/card';
import ChatMessage from '@/components/Chat/ChatMessage';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CallInterface from '@/components/Chat/CallInterface';
import EmojiPicker from '@/components/Chat/EmojiPicker';
import StarRating from '@/components/UI/StarRating';
import { useParams, useNavigate } from 'react-router-dom';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  attachment?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  };
};

const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey, I love your latest outfit post!',
      sender: 'other',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Thanks! I just got that jacket yesterday.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000)
    },
    {
      id: '3',
      text: 'Here\'s that dress I was telling you about',
      sender: 'other',
      timestamp: new Date(Date.now() - 1800000),
      attachment: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop',
        name: 'summer_dress.jpg'
      }
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isInAudioCall, setIsInAudioCall] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [cartItems, setCartItems] = useState<{image: string, name: string, price: number}[]>([
    {
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop',
      name: 'Summer Dress',
      price: 79.99
    }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'That sounds great! Looking forward to seeing more of your style.',
        sender: 'other',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };
  
  const handleAttachment = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload the file to your storage
    // and get back a URL. For this demo, we'll create an object URL.
    const fileType = file.type.startsWith('image/') ? 'image' : 'document';
    
    const message: Message = {
      id: Date.now().toString(),
      text: `Sent an attachment: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      attachment: {
        type: fileType,
        url: URL.createObjectURL(file),
        name: file.name
      }
    };
    
    setMessages([...messages, message]);
    toast.success('Attachment sent!');
  };
  
  const startVideoCall = () => {
    setIsInVideoCall(true);
  };
  
  const startAudioCall = () => {
    setIsInAudioCall(true);
  };
  
  const endCall = () => {
    setIsInVideoCall(false);
    setIsInAudioCall(false);
    toast.info('Call ended');
  };
  
  const handleFeedbackSubmit = () => {
    toast.success('Thank you for your feedback!');
    setShowFeedback(false);
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };
  
  const goBack = () => {
    navigate('/chat-overview');
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={goBack}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="Contact" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Sarah Chen</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={startAudioCall}>
                  <Mic className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Audio Call</DialogTitle>
                </DialogHeader>
                <CallInterface mode="audio" contact="Sarah Chen" onEndCall={endCall} />
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" onClick={startVideoCall}>
                  <Video className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Video Call</DialogTitle>
                </DialogHeader>
                <CallInterface mode="video" contact="Sarah Chen" onEndCall={endCall} />
              </DialogContent>
            </Dialog>
            
            {/* Shopping Cart Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cartItems.length > 0 ? (
                    <>
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: 1</p>
                            <p className="font-semibold">${item.price.toFixed(2)}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => 
                            setCartItems(prev => prev.filter((_, i) => i !== index))
                          }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between mb-2">
                          <span>Subtotal</span>
                          <span className="font-semibold">
                            ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                          </span>
                        </div>
                        <Button className="w-full bg-closetx-teal">Proceed to Checkout</Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-center py-8 text-gray-500">Your cart is empty</p>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <Card className="flex-1 overflow-auto p-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </Card>
        
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline" 
            size="icon"
            onClick={handleAttachment}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
        
        {/* Feedback Sheet */}
        <Sheet open={showFeedback} onOpenChange={setShowFeedback}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Rate Your Experience</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 pt-4">
              <p className="text-gray-600">How would you rate your conversation with Sarah?</p>
              <StarRating 
                rating={rating} 
                onRatingChange={setRating} 
                readOnly={false} 
                animated={true} 
                size={24}
              />
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2" 
                  onClick={() => toast.success("Thanks for your feedback!")}
                >
                  <ThumbsUp className="h-4 w-4" /> Helpful
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={() => toast.success("Thanks for your feedback!")}
                >
                  <ThumbsDown className="h-4 w-4" /> Not helpful
                </Button>
              </div>
              <textarea 
                className="w-full border rounded p-2 mt-2" 
                rows={4} 
                placeholder="Share your feedback (optional)"
              ></textarea>
              <Button onClick={handleFeedbackSubmit} className="w-full bg-closetx-teal">
                Submit Feedback
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-center mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFeedback(true)}
          className="text-xs"
        >
          Rate this conversation
        </Button>
      </div>
    </AppLayout>
  );
};

export default Chat;
