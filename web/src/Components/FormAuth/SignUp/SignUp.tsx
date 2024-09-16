import { ChangeEvent, FormEventHandler, useState } from 'react';

import { useAuth } from '../../../Hooks';

// components
import { Divider } from '../..//Divider';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface FormState {
  email: string;
  password: string;
}

export function SignUp() {
  const { signup } = useAuth();

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const [userResponse, setUserResponse] = useState("");

  const setField = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      })
    }
  }

  const validateForm = () => {
    const { email, password } = form;
    const newErrors: Record<string, string> = {};

    if (!email || email === '' || !validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Insira um email válido."
    if (!password || password === '' || !validateField(password, /^.{4,20}$/)) newErrors.password = "A senha deve ter entre 4 e 20 caracteres."

    return newErrors;
  }

  const validateField = (value: string, regex: RegExp): boolean => {
    return regex.test(value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {

      const res = signup(form.email, form.password);

      if (res) {
        setUserResponse(res);
        return
      }
      resetForm();
    }
  }

  const resetForm = () => {
    const resetFields = Object.keys(form).reduce((fieldForm, key) => {
      fieldForm[key as keyof FormState] = '';
      return fieldForm;
    }, {} as FormState);

    setForm(resetFields);
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center __container">
      <div className='container__content'>
        <Form className='content__form border' onSubmit={handleSubmit}>
          <h1 className='h3 text-center'>Cadastro</h1>
          <p className='text-center'>Preencha os dados abaixo para realizar o cadastro.</p>

          <Divider />

          <Form.Group className="mb-3 w-100" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email"
              value={form.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setField('email', e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite a senha"
              value={form.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setField('password', e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" className='w-100' type="submit">
            Cadastrar
          </Button>
          <span className='span--error'>{userResponse}</span>
        </Form>

        <Divider><h5>Já tem conta?</h5></Divider>

        <Button href='/login' variant='success' className='w-100'>Acessar</Button>
      </div>
    </div>
  )
}