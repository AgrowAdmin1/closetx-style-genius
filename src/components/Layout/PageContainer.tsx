
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto pb-20 pt-20">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
