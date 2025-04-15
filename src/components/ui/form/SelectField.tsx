import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { FieldErrors, useFormContext } from "react-hook-form";

interface SelectFieldProps extends SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
}

export const SelectField = ({
  label,
  name,
  options,
  ...rest
}: SelectFieldProps) => {
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
      <Select
        variant="filled"
        placeholder="Selecione"
        borderRadius={"12px"}
        h={"3.1rem"}
        bg={"gray.100"}
        {...register("gender")}
        {...rest}
      >
        {options.map((option) => (
          <option
            key={option.value}
            style={{ color: "black" }}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {(error?.message as unknown as string) || ""}
      </FormErrorMessage>
    </FormControl>
  );
};
