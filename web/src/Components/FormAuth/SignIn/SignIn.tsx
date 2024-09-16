import { ChangeEvent, FormEventHandler, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../..//Hooks';

import { Divider } from '../../Divider';

// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface FormState {
  email: string;
  password: string;
}

export function SignIn() {

  const { signin } = useAuth();
  const navigate = useNavigate();

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
    const fieldErrors: Record<string, string> = {};

    if (!email || email === '' || !validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)) fieldErrors.email = "Insira um email válido."
    if (!password || password === '' || !validateField(password, /^.{4,20}$/)) fieldErrors.password = "A senha deve ter entre 4 e 20 caracteres."

    return fieldErrors;
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

      const res = signin(form.email, form.password);

      if (res) {
        setUserResponse(res)
      } else {
        navigate('/management');
      }
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center __container">
      <div className='container__content'>
        <Form className='content__form border' onSubmit={handleSubmit}>
          <h1 className='h3 text-center'>Entrar</h1>
          <p className='text-center'>Preencha os dados abaixo para o acesso.</p>

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
            Acessar
          </Button>
          <span className='span--error'>{userResponse}</span>
        </Form>

        <Divider><h5>Novo usuário?</h5></Divider>

        <Button href='/register' variant="success" className='w-100'>Cadastrar</Button>
      </div>
    </div>
  )
}