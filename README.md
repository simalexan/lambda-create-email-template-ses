
# Lambda (Create Email Template) -> SES (Simple Email Service)

## Description

This is a serverless component consisting of:

- a Lambda that creates an SES email template for sending templated emails. It needs at least 3 parameters:

  - `templateName`
  - `subject`
  - `html` or `text` parameter, containing the HTML or Text content of the Template you want to create.

It's a Nuts & Bolts application component for AWS Serverless Application Repository.

## Deployment Parameters

This component has no CloudFormation deployment parameters.

## Latest Release - 1.0.0

Initial release.

## Roadmap - Upcoming changes

Here are the upcoming changes that I'll add to this serverless component:

- ESLint
- Tests