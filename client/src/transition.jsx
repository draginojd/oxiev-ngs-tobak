import { motion } from "framer-motion";

const transition = (MVPComponent) => {
    return () => (
        <>
            <MVPComponent />
            <motion.div className="slide-in"
                   initial={{opacity:1,scale:0}
                }
                    animate={{
                        
                     
                       
                        scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                          }
                        
                      }}
                      transition={{
                        duration: 0.8,
                     
                        ease: "easeIn",
                      
                      
                     
                      }}
                    exit={{ opacity:1 }}
                    
            ><p>HEJ</p></motion.div>

        {/*     <motion.div className="slide-out"
                 initial={{ opacity:0}}
                animate={{x:"100%", scaleY: 0, opacity: 1}}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.5}} 
            /> */}
        </>

    );
};

export default transition;