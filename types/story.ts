import type { Image } from "./image";

export interface Story {
  _path: string;
  title: string;
  description?: string;
  cover?: Image;
  date?: string;
  tags?: string[];
}
