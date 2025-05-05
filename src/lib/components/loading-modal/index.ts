import { writable, type Writable } from 'svelte/store';

export const LOADING_CONTEXT_KEY = Symbol('loading');

export type LoadingContext = {
  isLoading: Writable<boolean>;
};
export const isLoading = writable(false);
