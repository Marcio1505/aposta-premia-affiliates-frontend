import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { FieldErrors, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

interface TextFieldProps extends InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  mask?: string;
}

export const TextField = ({
  label,
  type = "text",
  name,
  placeholder,
  mask,
  ...rest
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldErrors;
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize="xs" htmlFor={name}>
        {label}
      </FormLabel>
      {mask ? (
        <InputMask mask={mask} {...register(name)}>
          {(inputProps: object) => (
            <Input
              {...inputProps}
              id={name}
              variant="filled"
              type={type}
              borderRadius={"12px"}
              py={6}
              _focus={{ border: "1px solid #491474", bgColor: "#cfcfcf" }}
              placeholder={placeholder}
            />
          )}
        </InputMask>
      ) : (
        <Input
          id={name}
          type={type}
          variant="filled"
          borderRadius={"12px"}
          py={6}
          _focus={{ border: "2px solid #491474" }}
          {...register(name)}
          {...rest}
          placeholder={placeholder}
        />
      )}
      <FormErrorMessage>
        {(error?.message as unknown as string) || ""}
      </FormErrorMessage>
    </FormControl>
  );
};
