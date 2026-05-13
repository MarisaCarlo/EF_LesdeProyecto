import React from 'react';


const BackgroundPlant = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      right: '0',
      zIndex: -1, // Se mantiene al fondo de todo
      pointerEvents: 'none', // No interfiere con los clics
      opacity: 0.07, // Muy tenue para que sea elegante
      width: '40%', // Ajusta el tamaño según prefieras
      maxWidth: '600px'
    }}>
      <img 
        src={plantaSVG} 
        alt="Planta Industrial Fondo" 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
};

export default BackgroundPlant;