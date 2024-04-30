import { useState, useEffect } from 'react';

export function useIsExtraSmallScreen() {

  const [isExtraSmall, setIsExtraSmall] = useState(false); 

  useEffect(() => {
    setIsExtraSmall(window.matchMedia("(min-width: 640px)").matches);

    // I write this into a function for better visibility
    const handleResize = (e:any) => {
      setIsExtraSmall(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 640px)");

    mediaQuery.addEventListener('change', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return {
    isExtraSmall
  }
};


export function useIsSmallScreen() {

  const [isSmallScreen, setIsSmallScreen] = useState(false); 

  useEffect(() => {
    setIsSmallScreen(window.matchMedia("(min-width: 640px)").matches);

    // I write this into a function for better visibility
    const handleResize = (e:any) => {
      setIsSmallScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 640px)");

    mediaQuery.addEventListener('change', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return {
    isSmallScreen
  }
};

export function useIsMediumScreen() {

  const [isMediumScreen, setisMediumScreen] = useState(false); 

  useEffect(() => {
    setisMediumScreen(window.matchMedia("(min-width: 768px)").matches);

    // I write this into a function for better visibility
    const handleResize = (e:any) => {
      setisMediumScreen(e.matches);
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");

    mediaQuery.addEventListener('change', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return {
    isMediumScreen
  }
};


export function useIsLargeScreen() {

    const [isLargeScreen, setIsLargeScreen] = useState(false); 
  
    useEffect(() => {
      setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
  
      // I write this into a function for better visibility
      const handleResize = (e:any) => {
        setIsLargeScreen(e.matches);
      };
  
      const mediaQuery = window.matchMedia("(min-width: 1024px)");
  
      mediaQuery.addEventListener('change', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }, []);
  
    return {
      isLargeScreen
    }
  };

  export function useIsExtraLargeScreen() {

    const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(false); 
  
    useEffect(() => {
      setIsExtraLargeScreen(window.matchMedia("(min-width: 1280px)").matches);
  
      // I write this into a function for better visibility
      const handleResize = (e:any) => {
        setIsExtraLargeScreen(e.matches);
      };
  
      const mediaQuery = window.matchMedia("(min-width: 1280px)");
  
      mediaQuery.addEventListener('change', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        mediaQuery.removeEventListener('change', handleResize);
      };
    }, []);
  
    return {
      isExtraLargeScreen
    }
  };
  

  