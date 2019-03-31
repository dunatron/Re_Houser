import FileSaver from "file-saver"

export function saveDocyFile(content, fileName) {
  // const blob = new Blob([content], {
  //   type:
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // })
  // FileSaver.saveAs(blob, `${fileName}.docx`)
  // const blob = new Blob([content], {})
  // FileSaver.saveAs(blob, `${fileName}.docx`)
  // var file = new File(content, "hello world.txt", {
  //   type: "text/plain;charset=utf-8",
  // })
  // FileSaver.saveAs(file)
  var blob = new Blob(content, { type: "text/plain;charset=utf-8" })
  FileSaver.saveAs(blob, "hello world.txt")
}
