import _ from "lodash";
import { BaseFieldDefinition } from "metabase-types/forms";

export function createErrorMessageMarkdown(
  message?: string,
  formFields?: BaseFieldDefinition[],
): string | undefined {
  if (!message) {
    return undefined;
  }

  const fieldTitles = (formFields || [])
    .map(formField => formField.title)
    .filter(_.identity) as string[];

  return fieldTitles.reduce((transformedMessage, fieldTitle) => {
    return transformedMessage.replaceAll(fieldTitle, `**${fieldTitle}**`);
  }, message);
}
