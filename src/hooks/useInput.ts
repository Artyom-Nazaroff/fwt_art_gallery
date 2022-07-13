import { useEffect, useState } from 'react';

type ValidationsType = {
  isEmpty: boolean;
  maxLength?: number;
  minLength?: number;
  isEmail?: boolean;
  isValidPassword?: boolean;
};

export const useValidation = (value: string, validations: ValidationsType) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    Object.keys(validations).forEach((validation) => {
      switch (validation) {
        case 'minLength':
          if (validations.minLength && value.length < validations.minLength) {
            setMinLengthError(true);
          } else {
            setMinLengthError(false);
          }
          break;
        case 'maxLength':
          if (validations.maxLength && value.length > validations.maxLength) {
            setMaxLengthError(true);
          } else {
            setMaxLengthError(false);
          }
          break;
        case 'isEmpty':
          if (value.length > 0) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
          break;
        case 'isEmail':
          if (
            /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value.toLowerCase()
            )
          ) {
            setEmailError(false);
          } else {
            setEmailError(true);
          }
          break;
        case 'isValidPassword':
          if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
            setPasswordError(false);
          } else {
            setPasswordError(true);
          }
          break;
        default:
          break;
      }
    });
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || emailError || passwordError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError, passwordError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    passwordError,
    inputValid,
  };
};

export const useInput = (initialValue: string, validations: ValidationsType) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const valid = useValidation(inputValue, validations);

  useEffect(() => {
    if (isDirty && valid.isEmpty) {
      setErrorMessage('Поле не может быть пустым!');
    } else if (isDirty && valid.passwordError) {
      setErrorMessage(
        'Пароль должен: быть от 8 символов, содержать одну заглавную букву, одну цифру и один спец.символ!'
      );
    } else if (isDirty && valid.emailError) {
      setErrorMessage('Email не может быть длиннее 50 символов и должен содержать “@“ и “.” !');
    } else if (isDirty && valid.minLengthError) {
      setErrorMessage('Пароль должен содержать минимум 8 символов!');
    } else if (isDirty && valid.maxLengthError) {
      setErrorMessage('Email должен содержать максимум 50 символов!');
    } else if (
      isDirty &&
      !valid.passwordError &&
      !valid.emailError &&
      !valid.minLengthError &&
      !valid.maxLengthError
    ) {
      setErrorMessage('');
    }
  }, [valid]);

  const onChange = (val: string) => {
    setInputValue(val);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    inputValue,
    setInputValue,
    onChange,
    onBlur,
    isDirty,
    setDirty,
    errorMessage,
    ...valid,
  };
};
