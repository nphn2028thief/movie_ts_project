import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
} from "@mui/material";
import { isNumber, isString } from "lodash";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<any, any>;
  name: string;
  label: string;
  size?: "small" | "medium";
  disabled?: boolean;
  variant?: "standard" | "filled" | "outlined";
  margin?: "none" | "dense" | "normal";
  type?: "text" | "password" | "number";
  showClearable?: boolean;
  required?: boolean;
  sx?: SxProps;
  notSpacing?: boolean;
  handleChange?: (name: string, value: any) => void;
  InputProps?:
    | React.ReactElement<any, any>
    | {
        endAdornment: JSX.Element | null;
      }
    | { readOnly: true | false };
}

function FormInput(props: IProps, ref: React.Ref<any>) {
  const {
    control,
    sx,
    name,
    label,
    size = "small",
    disabled = false,
    variant = "outlined",
    margin = "dense",
    type = "text",
    showClearable = false,
    required = false,
    notSpacing = false,
    handleChange,
    InputProps,
  } = props;

  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: "Vui lòng nhập trường này!",
        },
      }}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error, invalid },
      }) => (
        <FormControl
          required={required}
          fullWidth
          size={size}
          margin={margin}
          sx={sx}
        >
          <TextField
            inputRef={ref}
            fullWidth
            size={size}
            type={isShowPassword ? "text" : type}
            variant={variant}
            disabled={disabled}
            label={label}
            error={invalid}
            helperText={error ? error.message : null}
            onChange={(e) => {
              const value = notSpacing
                ? e.target.value.replace(/ /g, "")
                : e.target.value;

              onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            value={
              isString(value) ? value : "" || isNumber(value) ? value : null
            }
            InputProps={
              InputProps
                ? InputProps
                : {
                    endAdornment:
                      type === "password" ? (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {isShowPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ) : showClearable && Boolean(value) ? (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              onChange("");
                              if (handleChange) {
                                handleChange(name, "");
                              }
                            }}
                            edge="end"
                          >
                            <Clear />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                  }
            }
          />
        </FormControl>
      )}
    />
  );
}

export default React.forwardRef(FormInput);
