// export interface IItem {
//   id: number;
//   name: string;
//   path?: string;
//   icon?: any;
// }

export interface IMenu {
  id: number;
  name: string;
  path: string;
  icon: any;
  state?: string;
}

export interface IRoute extends Omit<IMenu, "icon"> {
  page: React.LazyExoticComponent<() => JSX.Element>;
}

export interface IMenuConfig {
  main: IMenu[];
  users: IMenu[];
  routes: IRoute[];
}
