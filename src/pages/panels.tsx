import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Panel from "../components/panel"

const PanelsPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1 className="font-mono p-6">Make interfaces.</h1>
      <Panel />
    </main>
  )
}

export default PanelsPage

export const Head: HeadFC = () => <title>panels | crafts</title>
