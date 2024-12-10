const swRegister = async () => {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported in the browser');
      return;
    }
  
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
  
      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none'
      });
  
      console.log('Service Worker registration successful with scope:', registration.scope);
  
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
  
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New Service Worker available');
            // if (confirm('New version available! Reload to update?')) {
            //   window.location.reload();
            // }
          }
        });
      });
  
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };
  
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker controller changed');
  });
  
  export default swRegister;