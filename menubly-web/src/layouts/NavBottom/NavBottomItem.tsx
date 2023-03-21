import React from "react";
import {
  Link,
  useMatch,
  useResolvedPath
} from 'react-router-dom';
import styles from "./index.module.scss";

const NavBottomItem:React.FC<any> = ({ url, icon, childrenUrl }: any) => {
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });
  let resolvedChild = null;
  let matchChild = null;
  
  if(childrenUrl) {
    resolvedChild = useResolvedPath(childrenUrl);
    
  }
  if(resolvedChild) {
    matchChild = useMatch({ path: resolvedChild.pathname, end: true });
  }

  return (
    <Link to={url} className={`${styles['navBottom-item']} ${match || matchChild ? styles['navBottom-item--active'] : ''}`}>
      {React.createElement(icon)}
    </Link>
  )  
}

export default NavBottomItem;