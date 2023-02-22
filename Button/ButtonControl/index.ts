import React = require("react");
import ReactDOM = require("react-dom");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { BIDSLButtonControl, IButtonControlProps } from "./BIDSL_ButtonControl";

export class ButtonControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private buttonText: string;
  private buttonValue: string;
  private buttonType: number;
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
    this.buttonText = context.parameters.buttonLabel.raw ?? "";
    this.buttonType = context.parameters.buttonType.raw ?? 0;
  }

  private GenerateControl(context: ComponentFramework.Context<IInputs>): void {
    let buttonProps: IButtonControlProps = {
      disabled: context.mode.isControlDisabled,
      btnChoice: this.buttonType,
      btnText:
        this.buttonType != 3 && this.buttonText == ""
          ? "BIDSL"
          : this.buttonText,
      btnIcon:
        context.parameters.buttonIcon.raw ??
        (this.buttonType == 3 ? "Add" : ""),
      checked: false,
      onClick: () => {
        this.notifyOutputChanged();
      },
    };
    ReactDOM.render(
      React.createElement(BIDSLButtonControl, buttonProps),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.GenerateControl(context);
    this.buttonValue = this.buttonText != "" ? this.buttonText : "Clicked";
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    // TODO use the checked feature, dynamically set value from code
    return {
      buttonField: this.buttonValue,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
