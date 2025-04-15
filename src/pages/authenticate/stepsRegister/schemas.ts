import * as yup from "yup";

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

export const schemaStepRegister = yup.object().shape({
  email: yup
    .string()
    .email("O email precisa ser valido.")
    .required("O email é obrigatório."),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .matches(/[0-9]/, "A senha precisa ter pelo menos um número.")
    .matches(/[a-z]/, "A senha precisa ter pelo menos uma letra minúscula.")
    .matches(/[A-Z]/, "A senha precisa ter pelo menos uma letra maiúscula.")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha precisa ter pelo menos um caractere especial."
    )
    .required("A senha é obrigatória."),
});

export const schemaStepFinal = yup.object().shape({
    firstName: yup.string().required("O nome é obrigatório."),
    lastName: yup.string().required("O sobrenome é obrigatório."),
    cpf: yup
      .string()
      .matches(
        /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        "Formato inválido. Use XXX.XXX.XXX-XX."
      )
      .required("O CPF é obrigatório."),
    gender: yup.string().required("O gênero é obrigatório."),
    birthDate: yup
      .date()
      .max(eighteenYearsAgo, "Você deve ter pelo menos 18 anos.")
      .required("A data de nascimento é obrigatória."),
    phone: yup
      .string()
      .matches(
        /^\(\d{2}\) \d{4,5}-\d{4}$/,
        "Formato inválido. Use (XX) XXXXX-XXXX."
      )
      .required("O telefone é obrigatório."),
    email: yup.string().required("O email é obrigatório."),
    password: yup.string().required("A senha é obrigatória."),
});

export const schemaStepAddress = yup.object().shape({
    cep: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "Formato inválido. Use XXXXX-XXX.")
      .required("O CEP é obrigatório."),
    street: yup.string().required("O endereço é obrigatório."),
    neighborhood: yup.string().required("O bairro é obrigatório."),
    city: yup.string().required("A cidade é obrigatória."),
    state: yup.string().required("O estado é obrigatório."),
});
