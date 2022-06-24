/* APIに関連しない関数 */

type TextFieldRule = {
  min?: number;
  max?: number;
  pattern?: RegExp;
  required?: boolean;
};

export const textValidation = (
  value: string,
  label: string,
  rule: TextFieldRule
) => {
  if (rule.required && !value) {
    return `${label}は必須項目です`;
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    return `入力された${label}に不正な文字が含まれます`;
  }
  if (rule.min && value.length < rule.min) {
    return `${label}は${rule.min}文字以上で入力してください`;
  }
  if (rule.max && value.length > rule.max) {
    return `${label}は${rule.max}文字以下で入力してください`;
  }
  return null;
};
