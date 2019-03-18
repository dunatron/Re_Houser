import styled from "styled-components"

const PropertiesTable = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  .headers {
    display: flex;
    flex-wrap: nowrap;
  }
  .strip {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .id {
    word-wrap: break-word;
    line-height: 1;
  }
  .location {
    word-wrap: break-word;
    line-height: 1;
  }
  .item {
    flex-shrink: 2; /* default 1 */
    flex-grow: 2;
    padding: 0 20px;
  }
`

export { PropertiesTable }
