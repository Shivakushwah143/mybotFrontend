// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Brain, MessageSquare, Zap, Github, Linkedin, Globe, Bot, User, Code, Database, Cpu, Network, Loader2 } from 'lucide-react';

// // TypeScript interfaces
// interface Message {
//   id: string;
//   text: string;
//   sender: 'user' | 'ai';
//   timestamp: Date;
// }

// interface APIResponse {
//   response: string;
// }

// interface TechItem {
//   name: string;
//   icon: React.ElementType;
//   color: string;
// }

// // Generate UUID for thread ID
// const generateUUID = (): string => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = Math.random() * 16 | 0;
//     const v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// };

// export default function Home() {
//   // State management
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [threadId, setThreadId] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);

//   // Refs for scrolling
//   const chatSectionRef = useRef<HTMLElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const messagesContainerRef = useRef<HTMLDivElement>(null);

//   // Initialize thread ID from session storage or create new one
//   useEffect(() => {
//     let storedThreadId = sessionStorage.getItem('digitalShivaThreadId');
//     if (!storedThreadId) {
//       storedThreadId = generateUUID();
//       sessionStorage.setItem('digitalShivaThreadId', storedThreadId);
//     }
//     setThreadId(storedThreadId);

//     // Add welcome message
//     const welcomeMessage: Message = {
//       id: generateUUID(),
//       text: "Hey there! I'm Shiva's digital twin. I've been trained on his thoughts, experiences, and personality. Ask me anything about his work, projects, or just have a casual chat. Let's see if you can tell the difference! 🤖✨",
//       sender: 'ai',
//       timestamp: new Date()
//     };
//     setMessages([welcomeMessage]);
//   }, []);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Tech stack data
//   const techStack: TechItem[] = [
//     { name: 'Next.js', icon: Code, color: '#0ea5e9' },
//     { name: 'TypeScript', icon: Code, color: '#ff7e5c' },
//     { name: 'LangChain', icon: Network, color: '#0ea5e9' },
//     { name: 'LangGraph', icon: Brain, color: '#ff7e5c' },
//     { name: 'Google Gemini', icon: Zap, color: '#0ea5e9' },
//     { name: 'Node.js', icon: Database, color: '#ff7e5c' }
//   ];

//   // Send message to AI
//   const sendMessage = async () => {
//     if (!inputMessage.trim() || isLoading) return;

//     const userMessage: Message = {
//       id: generateUUID(),
//       text: inputMessage.trim(),
//       sender: 'user',
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://localhost:3000/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: userMessage.text,
//           threadId: threadId
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data: APIResponse = await response.json();

//       const aiMessage: Message = {
//         id: generateUUID(),
//         text: data.response,
//         sender: 'ai',
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setError('Sorry, I seem to be having connection issues. Please make sure the backend server is running on localhost:3000 and try again.');

//       const errorMessage: Message = {
//         id: generateUUID(),
//         text: "Oops! Looks like there's a connection issue. My backend might be taking a coffee break ☕. Please check that the server is running and try again!",
//         sender: 'ai',
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle Enter key press
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   // Scroll to chat section
//   const scrollToChat = () => {
//     chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-300">
//       {/* Hero Section */}
//       <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
//         {/* Background Effects */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

//         {/* Floating Elements */}
//         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

//         <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
//           <div className="mb-8">
//             <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700/50 mb-8">
//               <Bot className="w-5 h-5 text-blue-400" />
//               <span className="text-slate-300 text-sm font-medium">Digital Twin • AI Powered</span>
//             </div>
//           </div>

//           <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
//             Hi, I'm Shiva's
//             <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
//               Digital Twin
//             </span>
//           </h1>
//           {/* Your Image - Add this inside the relative z-10 div, before the mb-8 div */}
//           <div className="flex justify-center mb-10">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full animate-pulse opacity-75 blur-md"></div>
//               <img
//                 src="https://res.cloudinary.com/dvcbhvxd6/image/upload/v1756107096/WhatsApp_Image_2025-08-25_at_12.59.04_6d1773e1_ijnvpt.jpg"
//                 alt="Shiva"
//                 className="relative z-10 w-40 h-40 md:w-40 md:h-40 rounded-full object-cover border-4 border-slate-800 shadow-xl"
//               />
//             </div>
//           </div>

//           <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Chat with an AI trained on my resume, projects, and personality.
//             <span className="text-blue-400"> Can you tell the difference?</span>
//           </p>

//           <button
//             onClick={scrollToChat}
//             className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
//           >
//             <MessageSquare className="w-5 h-5" />
//             Chat Now
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//           </button>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-24 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
//         <div className="relative z-10 max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//               Three steps to experience the future of AI personality cloning
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: Brain,
//                 title: "Learn",
//                 description: "The AI was trained on my past messages, writings, and opinions.",
//                 color: "from-blue-500 to-blue-600"
//               },
//               {
//                 icon: Cpu,
//                 title: "Simulate",
//                 description: "Powered by LangChain & LangGraph, it builds a stateful model of my personality.",
//                 color: "from-orange-500 to-orange-600"
//               },
//               {
//                 icon: MessageSquare,
//                 title: "Chat",
//                 description: "You get to test the results. Ask me anything!",
//                 color: "from-blue-500 to-orange-500"
//               }
//             ].map((step, index) => (
//               <div key={index} className="group">
//                 <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
//                   <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300`}>
//                     <step.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
//                   <p className="text-slate-400 leading-relaxed">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Chat Interface Section */}
//       <section ref={chatSectionRef} className="py-24 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
//         <div className="relative z-10 max-w-4xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Chat with Digital Shiva
//             </h2>
//             <p className="text-xl text-slate-400">
//               Start a conversation and see how well the AI captures my personality
//             </p>
//           </div>

//           {/* Chat Container */}
//           <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
//             {/* Chat Messages */}
//             <div
//               ref={messagesContainerRef}
//               className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
//             >
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
//                     {/* Avatar */}
//                     <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
//                         ? 'bg-orange-500'
//                         : 'bg-gradient-to-r from-blue-500 to-blue-600'
//                       }`}>
//                       {message.sender === 'user' ? (
//                         <User className="w-4 h-4 text-white" />
//                       ) : (
//                         <Bot className="w-4 h-4 text-white" />
//                       )}
//                     </div>

//                     {/* Message Bubble */}
//                     <div className={`rounded-2xl p-4 ${message.sender === 'user'
//                         ? 'bg-orange-500 text-white'
//                         : 'bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 text-slate-200'
//                       }`}>
//                       <p className="whitespace-pre-wrap">{message.text}</p>
//                       <span className={`text-xs opacity-70 mt-2 block ${message.sender === 'user' ? 'text-orange-100' : 'text-slate-400'
//                         }`}>
//                         {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Typing Indicator */}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="flex gap-3 max-w-[80%]">
//                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
//                       <Bot className="w-4 h-4 text-white" />
//                     </div>
//                     <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
//                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
//                         <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20">
//                 <p className="text-red-400 text-sm">{error}</p>
//               </div>
//             )}

//             {/* Input Area */}
//             <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Ask me anything about Shiva's work, projects, or personality..."
//                   className="flex-1 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full px-6 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   disabled={isLoading}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   disabled={!inputMessage.trim() || isLoading}
//                   className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="w-5 h-5 text-white animate-spin" />
//                   ) : (
//                     <Send className="w-5 h-5 text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Tech Stack Section */}
//       <section className="py-24 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
//         <div className="relative z-10 max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Built With Cutting-Edge AI & Web Tech
//             </h2>
//             <p className="text-xl text-slate-400 max-w-2xl mx-auto">
//               A modern stack combining the latest in AI, web development, and cloud technologies
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             {techStack.map((tech, index) => (
//               <div key={index} className="group">
//                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
//                   <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300`}
//                     style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
//                     <tech.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
//                     {tech.name}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-16 relative border-t border-slate-800">
//         <div className="absolute inset-0 bg-slate-900"></div>
//         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
//           <div className="mb-8">
//             <div className="flex justify-center gap-6 mb-8">
//               <a
//                 href="https://github.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
//               >
//                 <Github className="w-6 h-6 text-slate-400 group-hover:text-white" />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
//               >
//                 <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-white" />
//               </a>
//               <a
//                 href="#"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
//               >
//                 <Globe className="w-6 h-6 text-slate-400 group-hover:text-white" />
//               </a>
//             </div>
//           </div>

//           <p className="text-slate-400 mb-4">
//             This is a personal project by Shiva. The AI is for demonstration purposes only 😊
//           </p>

//           <div className="text-sm text-slate-500">
//             <p>© 2025 Digital Shiva. Powered by AI, built with passion.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, MessageSquare, Zap, Github, Linkedin, Globe, Bot, User, Code, Database, Cpu, Network, Loader2 } from 'lucide-react';

// TypeScript interfaces
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface APIResponse {
  response: string;
}

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

// Generate UUID for thread ID
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default function Home() {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Refs for scrolling
  const chatSectionRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize thread ID from session storage or create new one
  useEffect(() => {
    let storedThreadId = sessionStorage.getItem('digitalShivaThreadId');
    if (!storedThreadId) {
      storedThreadId = generateUUID();
      sessionStorage.setItem('digitalShivaThreadId', storedThreadId);
    }
    setThreadId(storedThreadId);

    // Add welcome message
    const welcomeMessage: Message = {
      id: generateUUID(),
      text: `Hey! 👋 I'm Shiva a Full Stack Developer. Ask me anything about My projects, work, or just chat casually.  
Check out My latest work, connect on Instagram, or explore his GitHub for cool projects! 🚀  
`,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom of messages only when new messages arrive and user is near bottom
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      // Only scroll if user was near the bottom already
      const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100;

      if (isNearBottom || messages.length <= 1) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: messages.length <= 1 ? 'auto' : 'smooth',
            block: 'end'
          });
        }, 50);
      }
    }
  }, [messages]);

  // Tech stack data
  const techStack: TechItem[] = [
    { name: 'Next.js', icon: Code, color: '#0ea5e9' },
    { name: 'TypeScript', icon: Code, color: '#ff7e5c' },
    { name: 'React', icon: Network, color: '#0ea5e9' },
    { name: 'LangChain', icon: Brain, color: '#ff7e5c' },
    { name: 'Prisma', icon: Zap, color: '#0ea5e9' },
    { name: 'Node.js', icon: Database, color: '#ff7e5c' }
  ];

  // Send message to AI
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateUUID(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://mybot-yov8.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          threadId: threadId
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: APIResponse = await response.json();

      const aiMessage: Message = {
        id: generateUUID(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Sorry, I seem to be having connection issues. Please make sure the backend server is running on localhost:3000 and try again.');

      const errorMessage: Message = {
        id: generateUUID(),
        text: "Oops! Looks like there's a connection issue. My backend might be taking a coffee break ☕. Please check that the server is running and try again!",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Scroll to chat section (only for initial button click)
  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-700/50 mb-8">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 text-sm font-medium">Digital Twin • AI Powered</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm Shiva's
            <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Digital Twin
            </span>
          </h1>


          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Chat with an AI trained on my resume, projects, and personality.
            <span className="text-blue-400"> Can you tell the difference?</span>
          </p>

          <button
            onClick={scrollToChat}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <MessageSquare className="w-5 h-5" />
            Chat Now
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Three steps to experience the future of AI personality cloning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code, 
                title: "Build",
                description: "I create modern websites and social media presets that help you stand out online."
                ,
                color: "from-green-500 to-blue-500",
              },
              {
                icon: Cpu,
                title: "Simulate",
                description: "Powered by LangChain & LangGraph, it builds a stateful model of my personality.",
                color: "from-orange-500 to-orange-600"
              },
              {
                icon: MessageSquare,
                title: "Chat",
                description: "You get to test the results. Ask me anything!",
                color: "from-blue-500 to-orange-500"
              }
            ].map((step, index) => (
              <div key={index} className="group">
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section ref={chatSectionRef} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Chat with Digital Shiva
            </h2>
            <p className="text-xl text-slate-400">
              Start a conversation and see how well the AI captures my personality
            </p>
          </div>

          {/* Chat Container */}
          <div className="relative bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat Messages */}
            <div
              ref={messagesContainerRef}
              className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
              style={{ maxHeight: '400px' }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                        ? 'bg-orange-500'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div> */}
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                      ? 'bg-orange-500'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : isLoading && messages[messages.length - 1].id === message.id ? (
                        // Show "Typing..." for the latest AI message being generated
                        <span className="text-xs text-white font-semibold animate-pulse">Typing...</span>
                      ) : (
                        <img
                          src="https://res.cloudinary.com/dvcbhvxd6/image/upload/v1756107096/WhatsApp_Image_2025-08-25_at_12.59.04_6d1773e1_ijnvpt.jpg"
                          alt="Shiva"
                          className="w-8 h-8 rounded-full object-cover border-2 border-slate-800"
                        />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-2xl p-4 ${message.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 text-slate-200'
                      }`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <span className={`text-xs opacity-70 mt-2 block ${message.sender === 'user' ? 'text-orange-100' : 'text-slate-400'
                        }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[90%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-6 py-3 bg-red-500/10 border-t border-red-500/20">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Shiva's work, projects, or personality..."
                  className="flex-1 bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-full px-6 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built With Cutting-Edge AI & Web Tech
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A modern stack combining the latest in AI, web development, and cloud technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300`}
                    style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                    <tech.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {tech.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative border-t border-slate-800">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 hover:scale-110 group"
              >
                <Globe className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          <p className="text-slate-400 mb-4">
            This is a personal project by Shiva. The AI is for demonstration purposes only 😊
          </p>

          <div className="text-sm text-slate-500">
            <p>© 2025 Digital Shiva. Powered by AI, built with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}