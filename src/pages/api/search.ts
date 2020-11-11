import { NextApiResponse, NextApiRequest } from 'next'

import { getAllFaqsData } from 'lib/faqs'

const faqs = getAllFaqsData()

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const { q } = req.query

  const results = q
    ? faqs.filter((faq) => faq.slug.toLowerCase().includes(`${q}`))
    : []

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ results }))
}
