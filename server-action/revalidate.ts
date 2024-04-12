'use server'

import { revalidatePath, revalidateTag } from "next/cache"

export async function serverRevalidatePath(path: string) {
  revalidatePath(path, 'page')
}

export async function serverRevalidateTag(tag: string) {
  revalidateTag(tag)
}