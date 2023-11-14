import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Finds an item in an array by its id.
 *
 * @param items - The array of items to search in. Each item must be an object with an `id` property of type `string`.
 * @param id - The id of the item to find.
 * @returns The found item, or `undefined` if no item was found with the specified id.
 */
export const findById = <T extends { id: string }>(
  items: T[],
  id: string
): T | undefined => {
  return items.find((item) => item.id === id);
};
