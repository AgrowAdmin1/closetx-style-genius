
import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import PageContainer from './PageContainer';

type AppLayoutProps = {
  children: React.ReactNode;
  weather?: {
    temp: number;
    condition: string;
  };
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, weather }) => {
  return (
    <div className="flex flex-col min-h-screen bg-closetx-offwhite">
      <Header weather={weather} />
      <PageContainer>{children}</PageContainer>
      <Navbar />
    </div>
  );
};

export default AppLayout;
