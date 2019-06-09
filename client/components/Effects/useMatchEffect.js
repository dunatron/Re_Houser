import { useState, useEffect } from "react"
/**
 * https://dev.to/joelnet/react-i-really-wish-this-is-how-i-could-write-components-1k4j
 */

const render = data => match =>
  data.pending ? match.pending()
  : data.error ? match.error(data.error)
  : data.data  ? match.data(data.data)
  : null // prettier-ignore

export const useMatchFetch = url => {
  const [data, setData] = useState({ pending: true })

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData({ data, pending: false }))
      .catch(error => setData({ error, pending: false }))
  }, [url])

  return render(data)
}
