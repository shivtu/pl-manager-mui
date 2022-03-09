import React, { FocusEventHandler } from 'react';

export interface ISteps {
  label: string;
  elements: JSX.Element;
}

export interface IFormField {
  label?: string;
  name: string;
  helperText?: string;
  type: 'textInput';
  actionOnBlur?: {
    isPromise: boolean;
    action:
      | Promise<any>
      | FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
      | undefined;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

export interface IFormElement {
  stepperLabel: string;
  formFields: IFormField[];
}

export interface IStepperForms {
  actionOnSubmit: () => any;
  elements: IFormElement[];
}

export interface IAppState {
  token?: string;
  projects?: [];
  designs?: [];
}

export interface IAppStateAction {
  type: string;
  payload: IAppState;
}
