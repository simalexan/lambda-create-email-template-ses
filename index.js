const AWS = require('aws-sdk'),
  SES = new AWS.SES(),
  MISSING_PARAMS = 'Please specify template parameters: templateName, subject';

exports.handler = (event) => {
  if (!event.body) {
    return Promise.resolve(MISSING_PARAMS);
  }
  const templateData = JSON.parse(event.body);

  if (!templateData.templateName || !templateData.subject) {
    return Promise.resolve(MISSING_PARAMS);
  }

  const templateParams = {
    Template: {
      TemplateName: templateData.templateName,
      SubjectPart: templateData.subject
    }
  }
  if (templateData.html) {
    templateParams.HtmlPart = templateData.html;
  }

  if (templateData.text) {
    templateParams.TextPart = templateData.text;
  }

  return SES.createTemplate(templateParams).promise()
    .catch(err => {
      console.log(err);
      const errorResponse = `Error: Execution update, caused a SES error, please look at your logs.`;
      return errorResponse;
    });
};