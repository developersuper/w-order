import React from "react";

import styles from "./index.module.scss";
import { useAuth } from "contexts/Auth/AuthContext";

const NavBottom = () => {
  const auth = useAuth();
  return (
    <div className={styles.navBottom}>
      test
    </div>
  )  
}

export default NavBottom;