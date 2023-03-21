import React from "react";
import {
  Link,
  useMatch,
  useResolvedPath
} from 'react-router-dom';
import styles from "./index.module.scss";

const NavItem: React.FC<any> = ({ url, childrenUrl, name }: any) => {
  const resolved = useResolvedPath(url);
  const match = useMatch({ path: resolved.pathname, end: true });
  let resolvedChild = null;
  let matchChild = null;

  if (childrenUrl) {
    resolvedChild = useResolvedPath(childrenUrl);

  }
  if (resolvedChild) {
    matchChild = useMatch({ path: resolvedChild.pathname, end: true });
  }

  return (
    <Link to={url} className={`
    flex flex-col lg:justify-center lg:items-center text-neutral-60 font-bold text-base hover:no-underline
    ${styles['navTop-item']} ${match || matchChild ? styles['navTop-item--active'] : ''}`}>
      <span>{name}</span>
      <span className={`${styles['line']} hidden lg:block w-[20px] h-[3px] bg-primary-light mt-1.5`}></span>
    </Link>
  )
}

export default NavItem;