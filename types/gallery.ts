import type { Image } from "./image";

export interface Gallery {
  _path: string;
  title: string;
  description?: string;
  cover?: Image;
  images?: Image[];
}