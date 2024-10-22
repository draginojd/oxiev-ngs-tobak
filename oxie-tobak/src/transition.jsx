import { motion } from "framer-motion";

const transition = (MVPComponent) => {
    return () => (
        <>
            <MVPComponent />
            <motion.div className="slide-in"
                    initial={{ opacity:0}}
                    animate={{  opacity: 1}}
                    exit={{ opacity:0 }}
                    transition={{ duration: 0.5}} 
            />

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