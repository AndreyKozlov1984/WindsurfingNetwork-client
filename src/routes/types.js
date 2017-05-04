// @flow
import React from 'react';
export type Location = {
  params: { [string]: string },
};
export type OnEnter = (location: Location) => any;
export type IndexRouteConfig = {
  onEnter?: OnEnter,
  component: Class<React.Component<*, *, *>> | ((props: any) => React$Element<any>),
};
export type RouteConfig = {
  path: string,
  onEnter?: OnEnter,
  childRoutes?: Array<RouteConfig>,
  indexRoute?: IndexRouteConfig,
  component?: Class<React.Component<*, *, *>> | ((props: any) => React$Element<any>),
};

