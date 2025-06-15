import React from 'react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-[75px] h-[75px] rounded-lg bg-transparent">
              <img 
                src="/lovable-uploads/25f1c559-b32f-4727-806d-66731a23df9d.png" 
                alt="IntelliDose Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  console.log('Image failed to load from:', e.currentTarget.src);
                  console.log('Falling back to text logo');
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-blue-600 font-bold text-lg">ID</span>';
                }}
                onLoad={() => console.log('Logo image loaded successfully from:', '/lovable-uploads/25f1c559-b32f-4727-806d-66731a23df9d.png')}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">IntelliDose</h1>
              <p className="text-sm text-gray-600">Your intelligent supplement companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://productunicorn.substack.com/p/intellidose-supplement-tracker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Help & Feedback
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
