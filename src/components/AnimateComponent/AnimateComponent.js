import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const AnimateComponent = ({children, keyAction, className}) => {
  const timeout = { enter: 300, exit: 200 };
 // const currentKey = location.pathname.split("/")[1] || "/";
  return (
    <>
     <TransitionGroup component="main" className={className}>
        <CSSTransition
          key={keyAction}
          timeout={timeout}
          classNames="fade"
          appear
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default AnimateComponent;

