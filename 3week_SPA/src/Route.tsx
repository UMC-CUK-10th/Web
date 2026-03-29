interface RouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export const Route = ({ component: Component } : RouteProps) => {
  return <Component/>
};