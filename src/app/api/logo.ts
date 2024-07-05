import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Using Lorem Picsum API to get a random image as a logo
    const imageId = Math.floor(Math.random() * 1000) // Random ID between 0 and 999
    const imageUrl = `https://picsum.photos/id/${imageId}/200/200`
    
    // Fetch the image to ensure it exists
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }
    
    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Error fetching logo:', error)
    res.status(500).json({ error: 'Failed to fetch logo' })
  }
}