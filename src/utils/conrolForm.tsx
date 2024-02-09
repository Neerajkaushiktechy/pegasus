

export interface fieldInterFace {
    id: number,
    title: string;
    fieldform?: any
    inputType?: string
}


export const selectField: fieldInterFace[] = [
    {
        id: 1,
        inputType: "text",
        title: "Text Input",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        }
    },
    {
        id: 2,
        inputType: "textarea",
        title: "TextArea",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        }
    },
    {
        id: 3,
        inputType: "select",
        title: "Single Select",
        fieldform: {
            Label: "Enter label",
            Placeholder: "Place Holder",
            OptionLabel: "Options"
        }
    },
    {
        id: 4,
        inputType: "checkbox",
        title: "Single checkbox",
        fieldform: {
            Label: "Enter label",
            Placeholder: "Place Holder",
            OptionLabel: "Options"
        }
    },
    {
        id: 5,
        inputType: "multicheckbox",
        title: "Multi Checkbox",
        fieldform: {
            Label: "Enter label",
            Placeholder: "Place Holder",
            OptionLabel: "Options"
        }
    },
    {
        id: 6,
        inputType: "radiogroup",
        title: "Radio Buttons",
        fieldform: {
            Label: "Enter label",
            Placeholder: "Place Holder",
            OptionLabel: "Options"
        }
    },
    {
        id: 7,
        inputType: "file",
        title: "File Upload",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        }
    },
    {
        id: 8,
        inputType: "date",
        title: "Date",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        }
    },
];