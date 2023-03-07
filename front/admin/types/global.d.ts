// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<any>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: number;
  readonly VITE_OPEN: boolean;
  readonly VITE_GLOB_APP_TITLE: string;
  readonly VITE_DROP_CONSOLE: boolean;
  readonly VITE_PROXY_URL: string;
  readonly VITE_BUILD_GZIP: boolean;
  readonly VITE_REPORT: boolean;
  readonly VITE_BASE_API: string;
  readonly VITE_ROUTER_HISTORY: "hash" | "html5";
  readonly VITE_PUBLIC_PATH: string;
}
