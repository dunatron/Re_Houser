var fs = require("fs"); // file system
var JSZip = require("jszip");
var path = require("path");
var Docxtemplater = require("docxtemplater");
var _difference = require("lodash/difference");
var docxMime =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

var parseTemplateData = function(jsonString) {
  try {
    var jsonObj = JSON.parse(jsonString);
    return jsonObj;
  } catch (e) {
    return { error: { message: "parsing the template data", reason: e } };
  }
};

var zipDocxFile = function(file) {
  try {
    var content = fs.readFileSync(
      path.resolve(__dirname, "./documents/test.docx"),
      "binary"
    );
    // var content = fs.readFileSync(file.path, "binary")
    // var content = fs.readFileSync(file.path, "binary")
    // var zip = new JSZip(content)
    // return zip
    var zip = new JSZip(content);
    return zip;
  } catch (e) {
    return { error: { message: "error zipping the document", reason: e } };
  }
};

var getArrDifference = function(arr1, arr2) {
  return _difference(arr1, arr2);
};

var renderDocyDocument = function(zip, templateData) {
  var doc = new Docxtemplater();
  doc.loadZip(zip);
  doc.setData(templateData);

  // This will allow us to check all of the template syntax.
  var templateKeys = [];
  var templateDataKeys = Object.keys(templateData);

  doc.setOptions({
    parser: function(tag) {
      return {
        get: function(scope) {
          templateKeys.push(tag);
          return scope[tag]; // needed for template replacement
        }
      };
    }
  });

  try {
    doc.render();
  } catch (e) {
    return {
      error: { message: "docxTemplater error", reason: e }
    };
  }

  var theDiff = getArrDifference(templateKeys, templateDataKeys);
  // We want to throw early and give the user a list of template syntax used that has no keys
  if (theDiff.length > 0) {
    return {
      error: { message: "Differenece in the keys", reason: theDiff }
    };
  }
  var buf = doc.getZip().generate({ type: "nodebuffer" });
  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.

  return buf;
};

var convertDocument = function(data, file) {
  // 1. convert and validate the templateData
  var templateData = parseTemplateData(data);
  if (templateData.error) {
    return {
      error: {
        message: "Syntax included in template without a data key translation",
        reason: templateData.error
      }
    };
  }
  // 2: validate that the file is a valid docx file
  // if (file.mimetype !== docxMime) {
  //   return {
  //     error: {
  //       message: "invalid mimetype",
  //       reason: "The file is not a valid docx file",
  //     },
  //   }
  // }

  // 3. zip up our docx file as that is required for docxTemplater
  var zip = zipDocxFile(file);
  if (zip.error) {
    // it would be an error obj
    return zip;
  }

  // 4. use our zip and templateData to create a new docx files as a buffer
  var docyBuf = renderDocyDocument(zip, templateData);
  // Not actually needed as it is the last func but will leave for clarity
  if (docyBuf.error) {
    return docyBuf;
  }

  // 5. return our docy buff
  return docyBuf;
};

module.exports = {
  convertDocument,
  parseTemplateData,
  zipDocxFile,
  renderDocyDocument
};
