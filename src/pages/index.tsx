import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1 className="font-mono p-6">Make interfaces.</h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>crafts | ideyuta.com</title>
