import React, { useMemo, cloneElement, } from 'react';
import { useCurrentPath } from "./useCurrentPath";

interface RoutesProps {
  children: React.ReactNode;
}

interface RouteProps{
  path: string;
  component: React.ComponentType<any>;
}

const isRouteElement = (child: any): child is React.ReactElement<RouteProps> => {
  if (!React.isValidElement(child)) return false;

  const props = child.props as Partial<RouteProps>;
  return props && 'path' in props;
};

export const Routes = ({ children }:RoutesProps) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = React.Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
};

export const Route = ({ component: Component }: RouteProps) => {
  return <Component/>;
};

export const Link = ({ to, children }: {to: string; children: React.ReactNode}) => {
  const handleClick = (e: React.MouseEvent) => {
  e.preventDefault();

  window.history.pushState({},"",to);

  const navEvent = new Event("pushState_event");
  window.dispatchEvent(navEvent);
};

return (
  <a href={to} onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'underline'}}>{children}
  </a>
);
};