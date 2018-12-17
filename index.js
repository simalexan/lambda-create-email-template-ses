const AWS = require('aws-sdk'),
  SES = new AWS.SES(),
  MISSING_PARAMS = 'Please specify template parameters: templateName, subject';

exports.handler = (event) => {
  if (!event.body) {
    return Promise.resolve({statusCode: 200, body: MISSING_PARAMS});
  }
  const templateData = JSON.parse(event.body);

  if (!templateData.templateName || !templateData.subject) {
    return Promise.resolve({statusCode: 200, body: MISSING_PARAMS});
  }

  const templateParams = {
    Template: {
      TemplateName: templateData.templateName,
      SubjectPart: templateData.subject
    }
  }
  if (templateData.html) {
    templateParams.Template.HtmlPart = templateData.html;
  }

  if (templateData.text) {
    templateParams.Template.TextPart = templateData.text;
  }

  return SES.createTemplate(templateParams).promise()
    .then(() => ({statusCode: 200, body: ''}))
    .catch(err => {
      console.log(err);
      const errorResponse = `Error: Execution update, caused a SES error, please look at your logs.`;
      return {statusCode: 400, body: errorResponse};
    });
};