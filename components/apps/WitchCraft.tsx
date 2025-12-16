import React from 'react';

export const WitchCraft: React.FC = () => {
  // Adres pod którym działa Twoja aplikacja Yii2 (np. na Apache/Nginx lub php yii serve)
  const yiiAppUrl = "http://yii-application.test"; 

  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <iframe 
        src={yiiAppUrl} 
        className="w-full h-full border-none"
        title="Yii2 Application"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
};