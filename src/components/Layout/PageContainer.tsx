
import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto pb-20 pt-safe">
      <div className="container mx-auto px-4 py-4">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
