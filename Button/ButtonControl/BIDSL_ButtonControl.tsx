import * as React from "react";
import {
  Stack,
  IStackTokens,
  IIconProps,
  IButtonStyles,
} from "@fluentui/react";
import {
  ActionButton,
  DefaultButton,
  PrimaryButton,
  IconButton,
  IBaseButtonProps,
} from "@fluentui/react/lib/Button";

export interface IButtonControlProps extends IBaseButtonProps {
  disabled?: boolean;
  checked?: boolean;
  btnIcon?: string;
  btnChoice: number;
  btnText: string;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const BIDSLButtonControl: React.FunctionComponent<
  IButtonControlProps
> = (props) => {
  const { disabled, checked, btnChoice, btnText } = props;
  let iconProps: IIconProps = { iconName: props.btnIcon ?? "" };
  switch (btnChoice) {
    // default button
    case 0:
      return (
        <DefaultButton
          text={btnText}
          onClick={props.onClick}
          disabled={disabled}
          checked={checked}
          iconProps={iconProps}
        />
      );
    // primary button
    case 1:
      return (
        <PrimaryButton
          iconProps={iconProps}
          text={btnText}
          onClick={props.onClick}
          disabled={disabled}
          checked={checked}
        />
      );
    // primary button
    case 2:
      return (
        <ActionButton
          text={btnText}
          iconProps={iconProps}
          onClick={props.onClick}
          disabled={disabled}
          checked={checked}
        />
      );

    case 3:
      return (
        <IconButton
          iconProps={iconProps}
          title={btnText}
          ariaLabel={btnText}
          disabled={disabled}
          checked={checked}
          onClick={props.onClick}
        />
      );
    // default button
    default:
      return (
        <DefaultButton
          text="BIDSL"
          iconProps={iconProps}
          onClick={props.onClick}
          allowDisabledFocus
          disabled={disabled}
          checked={checked}
        />
      );
  }
};
