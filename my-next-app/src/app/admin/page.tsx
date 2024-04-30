"use client";
import {motion} from 'framer-motion';
export default function Home() {
  return (
    <>

    <div>

      <motion.div
        initial={{ opacity: 0 , transform: 'translateY(-40vh)'}}
        animate={{ opacity: 1 , transform: 'translateY(50vh)' }}
        
        transition={{ duration: 1.2 , type: 'spring' , bounce: 0.4}}
      >
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-[400]">Discover the Essence.
</h1>
      </motion.div>
    </div>  
    </>
  );  
}
