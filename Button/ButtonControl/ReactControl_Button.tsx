import * as React from "react";
import { Stack, IStackTokens, IIconProps } from "@fluentui/react";
import {
  ActionButton,
  DefaultButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
  btnIcon?: IIconProps;
  btnChoice: number;
  btnText: string;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export const ButtonDefaultExample: React.FunctionComponent<
  IButtonExampleProps
> = (props) => {
  const { disabled, checked, btnIcon, btnChoice, btnText } = props;
  switch (btnChoice) {
    // default button
    case 0:
      return (
        <DefaultButton
          text={btnText}
          onClick={btnClicked}
          disabled={disabled}
          checked={checked}
        />
      );
    // primary button
    case 1:
      return (
        <PrimaryButton
          iconProps={btnIcon}
          text={btnText}
          onClick={btnClicked}
          disabled={disabled}
          checked={checked}
        />
      );
    // primary button
    case 2:
      return (
        <ActionButton
          text={btnText}
          iconProps={btnIcon}
          onClick={btnClicked}
          disabled={disabled}
          checked={checked}
        />
      );
    // default button
    default:
      return (
        <DefaultButton
          text="Standard"
          iconProps={btnIcon}
          onClick={btnClicked}
          allowDisabledFocus
          disabled={disabled}
          checked={checked}
        />
      );
  }
};

function btnClicked(): void {
  alert("Clicked");
}
