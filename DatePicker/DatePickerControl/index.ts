import React = require("react");
import { createRoot, Root } from "react-dom/client";
import {
  BIDSLDatePickerBounded,
  IDatePickerControlProps,
} from "./BIDSL_DatePicker";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DatePickerControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private root: Root;

  private datePickerProps: IDatePickerControlProps = {
    disabled: false,
    minDate: undefined,
    maxDate: undefined,
    enableDefault: false,
    setDefault: 0,
    inputDate: undefined,
    inputDateChanged: this.inputDateChanged.bind(this),
  };

  private inputDateChanged(newValue: Date | undefined) {
    if (this.datePickerProps.inputDate !== newValue) {
      this.datePickerProps.inputDate = newValue;
      this.notifyOutputChanged();
    }
  }
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    // initialize the control parameters with control config
    this.datePickerProps.setDefault = context.parameters.SetDefault.raw ?? 0;
    this.datePickerProps.minDate = context.parameters.MinDate.raw ?? undefined;
    this.datePickerProps.maxDate = context.parameters.MaxDate.raw ?? undefined;
    this.datePickerProps.enableDefault = context.parameters.EnableDefault.raw
      ? context.parameters.EnableDefault.raw == 1
      : false;
    this.datePickerProps.inputDate =
      context.parameters.DateField.raw ?? undefined;

    this.root = createRoot(this.container); // createRoot(container!)
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    if (
      this.datePickerProps.inputDate?.setUTCHours(0, 0, 0, 0) !=
      context.parameters.DateField.raw?.setUTCHours(0, 0, 0, 0)
    ) {
      this.datePickerProps.inputDate =
        context.parameters.DateField.raw ?? undefined;
    }

    this.datePickerProps.disabled = context.mode.isControlDisabled;
    this.root.render(
      React.createElement(BIDSLDatePickerBounded, this.datePickerProps)
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      DateField: this.datePickerProps.inputDate,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    this.root.unmount();
  }
}
