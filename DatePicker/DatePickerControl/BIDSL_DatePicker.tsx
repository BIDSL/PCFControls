import * as React from "react";
import {
  DatePicker,
  IDatePickerStrings,
  defaultDatePickerStrings,
  addDays,
  IDatePickerStyles,
  IDatePickerProps,
  IBaseProps,
} from "@fluentui/react";
import { useConst } from "@fluentui/react-hooks";

const datePickerStyles: Partial<IDatePickerStyles> = {
  root: { maxWidth: 300, marginTop: 15 },
};

export interface IDatePickerControlProps extends IBaseProps<IDatePickerProps> {
  disabled?: boolean;
  minDate?: number;
  maxDate?: number;
  enableDefault?: boolean;
  setDefault: number;
  inputDate?: Date;
  inputDateChanged: (newDate: Date | undefined) => void;
}

export const BIDSLDatePickerBounded: React.FunctionComponent<
  IDatePickerControlProps
> = (props) => {
  // initialize the state variables
  const [Value, setValue] = React.useState<Date | undefined>(() => {
    return props.inputDate != undefined
      ? props.inputDate
      : props.enableDefault
      ? useConst(addDays(new Date(Date.now()), props.setDefault))
      : undefined;
  });

  React.useEffect(() => {
    if (props.inputDate !== undefined) {
      setValue(props.inputDate);
    } else {
      setValue(undefined);
    }
  }, [props.inputDate]);

  React.useEffect(() => {
    props.inputDateChanged(Value);
  }, [Value]);

  const onSelectDate = (selectedDate: Date): void => {
    setValue(selectedDate);
  };

  // manipulated the properties based on the input
  const { disabled, minDate, maxDate } = props;

  const today = useConst(new Date(Date.now()));
  // const defaultValue =
  const minimumDate = minDate ? useConst(addDays(today, minDate)) : undefined;
  const maximumDate = maxDate ? useConst(addDays(today, maxDate)) : undefined;

  const strings: IDatePickerStrings = useConst(() => ({
    ...defaultDatePickerStrings,
    isOutOfBoundsErrorMessage: `Date must be between ${minimumDate?.toLocaleDateString()} and ${maximumDate?.toLocaleDateString()}`,
  }));

  return (
    <DatePicker
      styles={datePickerStyles}
      // DatePicker uses English strings by default. For localized apps, you must override this prop.
      strings={strings}
      placeholder=""
      ariaLabel=""
      minDate={minimumDate}
      maxDate={maximumDate}
      value={Value}
      disabled={disabled}
      onSelectDate={onSelectDate as (date: Date | null | undefined) => void}
      formatDate={(date) => {
        return date
          ? date.toLocaleDateString(
              navigator.languages && navigator.languages[0]
            )
          : "";
      }}
    />
  );
};
