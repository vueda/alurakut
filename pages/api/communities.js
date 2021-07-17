import { SiteClient } from 'datocms-client'

export default async function loadCommunties (req, res) {
  if (req.method !== 'POST') {
    res.status(404).json({ data: 'Not Found' })
  }

  const client = new SiteClient(process.env.DATOCMS_TOKEN)
  const data = await client.items.create({
    itemType: '975866',
    ...req.body
  })
  res.json(data)
}
