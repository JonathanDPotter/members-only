import { motion } from "framer-motion";
import React, { FC } from "react";

interface Iprops {
  component: React.ReactNode;
}

const Framer: FC<Iprops> = ({ component }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <>{component}</>
    </motion.div>
  );
};

export default Framer;
