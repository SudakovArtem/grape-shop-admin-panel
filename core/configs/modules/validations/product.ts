import * as z from 'zod'

export const productSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  cuttingPrice: z.string(),
  seedlingPrice: z.string(),
  categoryId: z.number(),
  variety: z.string(),
  maturationPeriod: z.string(),
  berryShape: z.string(),
  color: z.string(),
  taste: z.string(),
  cuttingInStock: z.number(),
  seedlingInStock: z.number()
})

export type ProductSchema = z.output<typeof productSchema>
