function onChange(executionContext) {
  // get formContext
  let formContext = executionContext.getFormContext();
  // get attribute
  var stdButtonAttr = formContext.getAttribute("bids_standardbutton");
  // get control value
  var stdValue = stdButtonAttr.getValue();

  if (stdValue == "Approve" || stdValue == "Clicked") {
    // alert scripts for demo
    var alertStrings = {
      confirmButtonLabel: "Yes",
      text: "You have Clicked, Primary Button",
      title: "On Click",
    };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
  }
  // prevent the value to be stored in the field.
  // otherwise it wont trigger onchange event,
  // bcoz the trigger value from control and field value remains same
  stdButtonAttr.setValue(null);
  stdButtonAttr.setSubmitMode("never");
}
