import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  ComponentType,
  AnchorHTMLAttributes,
} from 'react';

type Params = Record<string, string>;

interface RouterCtxValue {
  pathname: string;
  search: string;
  params: Params;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
}

const RouterCtx = createContext<RouterCtxValue>({
  pathname: '/',
  search: '',
  params: {},
  navigate: () => {},
});

export function useNavigate() {
  return useContext(RouterCtx).navigate;
}

export function useParams(): Params {
  return useContext(RouterCtx).params;
}

export function useLocation() {
  const { pathname, search } = useContext(RouterCtx);
  return { pathname, search };
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, children, onClick, style, ...rest }: LinkProps) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      style={{ textDecoration: 'none', ...style }}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          navigate(to);
          onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export interface Route {
  path: string;
  Component: ComponentType;
  index?: boolean;
}

function matchPattern(pattern: string, pathname: string): Params | null {
  if (pattern === '*') return {};
  const pp = pattern.replace(/^\//, '').split('/').filter(Boolean);
  const pa = pathname.replace(/^\//, '').split('/').filter(Boolean);
  if (pp.length === 0 && pa.length === 0) return {};
  if (pp.length !== pa.length) return null;
  const params: Params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) {
      params[pp[i].slice(1)] = decodeURIComponent(pa[i]);
    } else if (pp[i] !== pa[i]) {
      return null;
    }
  }
  return params;
}

interface AppRouterProps {
  routes: Route[];
  Layout: ComponentType<{ children: ReactNode; pathname: string }>;
}

export function AppRouter({ routes, Layout }: AppRouterProps) {
  const [loc, setLoc] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }));

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    if (opts?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    const url = new URL(to, window.location.href);
    setLoc({ pathname: url.pathname, search: url.search });
  }, []);

  useEffect(() => {
    const onPop = () =>
      setLoc({ pathname: window.location.pathname, search: window.location.search });
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  let CurrentComponent: ComponentType = () => (
    <div style={{ padding: '120px 24px', textAlign: 'center', color: '#1d1d1f' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700 }}>404</h1>
      <p style={{ color: '#6e6e73', marginTop: '8px' }}>Page not found</p>
    </div>
  );
  let matchedParams: Params = {};

  const { pathname } = loc;

  for (const route of routes) {
    if (route.index) {
      if (pathname === '/' || pathname === '') {
        CurrentComponent = route.Component;
        matchedParams = {};
        break;
      }
      continue;
    }
    const params = matchPattern(route.path, pathname);
    if (params !== null) {
      CurrentComponent = route.Component;
      matchedParams = params;
      break;
    }
  }

  return (
    <RouterCtx.Provider value={{ ...loc, params: matchedParams, navigate }}>
      <Layout pathname={pathname}>
        <CurrentComponent />
      </Layout>
    </RouterCtx.Provider>
  );
}
