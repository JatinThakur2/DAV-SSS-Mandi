/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ConvexClientProvider from "../ConvexClientProvider.js";
import type * as auth from "../auth.js";
import type * as gallery from "../gallery.js";
import type * as hooks from "../hooks.js";
import type * as news from "../news.js";
import type * as notices from "../notices.js";
import type * as scholarship from "../scholarship.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ConvexClientProvider: typeof ConvexClientProvider;
  auth: typeof auth;
  gallery: typeof gallery;
  hooks: typeof hooks;
  news: typeof news;
  notices: typeof notices;
  scholarship: typeof scholarship;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
