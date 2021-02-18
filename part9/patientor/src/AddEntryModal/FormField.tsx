import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field, ErrorMessage, FieldProps } from 'formik';

import { Entry, HealthCheckRating } from '../types';

export type EntryTypeOption = {
  value: Entry['type'];
  label: string;
};

export type HealthCheckRatingOption = {
  value: HealthCheckRating;
  label: string;
};

type Option = EntryTypeOption | HealthCheckRatingOption;

type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
  hide?: boolean;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  disabled,
  hide
}) => {
  if (hide) {
    return null;
  }
  return (
    <Form.Field disabled={disabled}>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  hide: boolean;
}

export const TextField: React.FC<TextProps> = ({ field, label, placeholder, disabled, hide }) => {
  if (hide) {
    return null;
  }
  return (
    <Form.Field disabled={disabled}>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );
};