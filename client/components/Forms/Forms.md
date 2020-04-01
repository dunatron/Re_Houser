---
name: Forms
menu: Components
---

import { Playground, Props } from 'docz'
import FormCreator from "./FormCreator"
import InputFieldType from './InputFieldType'
import INSULATION_FORM_CONF from './InsulationStatementForm/fieldsConf'

# Forms

## Form Creator

This is the base component, all it needs is a `config` of field types and an `onSubmit` to recieve the submitted form data which will be formmatted =)
ToDo

- consider onSave and onCreate
- or let the outer wrapper handle onSubmit?
- the second. It should just submit the data to its container. its container can work out if its create or update
- Side note. We are creatting these containers like `Components/Forms/InsulationForm` is a wrapper to handle all this

<Props of={FormCreator} />
as stated above the most important prop is the config which is an array of InputFieldType config objects, 
they all take unique properties for there type
- config is an array of objects, not react class components, wasnt cleat in PropTypes to pass in an array of instancOf for config objects
- maybe I dont and just manually code the config props for FormCreator... Seems gross and an anti pattern

### InputFieldType props

<Props of={InputFieldType} />

## Basic usage

<Playground>

<FormCreator isNew={true} config={[{
"type": "CheckReason",
"key": "meetsMinCeilingReq",
"fieldProps": {
"name": "meetsMinCeilingReq",
"label": "Does insulation meet the minimum requirements for ceiling insulation?",
"defaultValue": "Test"
},
"refConf": {
"required": {
"value": true,
"message": "You must select an option for mmeeting minnimum ceiling requirements"
}
},
"inners": [
{
"type": "String",
"key": "meetsMinCeilingReqReason",
"fieldProps": {
"name": "meetsMinCeilingReqReason",
"label": "Explain what exception applies and which room(s) it applies to.",
"placeholder": "(e.g. professional installer cannot access skillion ceiling above bedroom 2)",
"multiline": true,
"rowsMax": 6,
"margin": "dense",
"style": {
"marginTop": 0
}
},
"refConf": {
"required": {
"value": true,
"message": "You must have a reson when selecting no"
}
}
}
]
}]} onSubmit={(data) => alert(JSON.stringify(data, 0, null))} />

</Playground>

## field Types

- Header
- Subheader
- String
- CheckReason
- CheckboxText
- SelectOneWithText
- CheckMultipleWithText
- Boolean
- Int
- Float
- DateTime
- AcceptTerms

## Header

<Playground >
  <InputFieldType config={{
    type: 'Header',
    fieldProps: {
      label: 'INSULATION STATEMENT FORM',
    },
  }} />
</Playground>

## Subheader

<Playground >
  <InputFieldType config={{
    type: 'Subheader',
    fieldProps: {
      label:
        'Landlords must complete the insulation statement for a property before it can go on the market',
    },
  }} />
</Playground>

## CheckReason

<Playground >
  <InputFieldType config={{
  "type": "CheckReason",
  "key": "meetsMinCeilingReq",
  "fieldProps": {
    "name": "meetsMinCeilingReq",
    "label": "Does insulation meet the minimum requirements for ceiling insulation?",
    "defaultValue": "Test"
  },
  "refConf": {
    "required": {
      "value": true,
      "message": "You must select an option for mmeeting minnimum ceiling requirements"
    }
  },
  "inners": [
    {
      "type": "String",
      "key": "meetsMinCeilingReqReason",
      "fieldProps": {
        "name": "meetsMinCeilingReqReason",
        "label": "Explain what exception applies and which room(s) it applies to.",
        "placeholder": "(e.g. professional installer cannot access skillion ceiling above bedroom 2)",
        "multiline": true,
        "rowsMax": 6,
        "margin": "dense",
        "style": {
          "marginTop": 0
        }
      },
      "refConf": {
        "required": {
          "value": true,
          "message": "You must have a reson when selecting no"
        }
      }
    }
  ]
}} />
</Playground>

## SelectOneWithText

<Playground >
  <InputFieldType config={{
    type: 'SelectOneWithText',
    key: 'ceilingCoverage',
    fieldProps: {
      name: 'ceilingCoverage',
      label: 'Location/Coverage?',
      options: [
        {
          name: 'COMPLETE',
          label: 'Complete (all rooms)',
        },
        {
          name: 'PARTIAL',
          label: 'Partial (specify areas not insulated)',
        },
        {
          name: 'NONE',
          label: 'None',
        },
        {
          name: 'UNKNOWN',
          label:
            'I don’t know as ceiling space is not accessible in the following areas (specify)',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Ceiling Coverage must be specified',
      },
    },
    inners: [
      {
        type: 'String',
        key: 'ceilingCoverageReason',
        showOn: {
          key: 'ceilingCoverage',
          values: ['PARTIAL', 'UNKNOWN'],
        },
        fieldProps: {
          name: 'ceilingCoverageReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'Please provide details for your ceiling coverage location choice',
          },
        },
      },
    ],
  }} />
</Playground>

## CheckMultipleWithText

<Playground >
  <InputFieldType config={{
    type: 'CheckMultipleWithText',
    key: 'ceilingConditions',
    fieldProps: {
      name: 'ceilingConditions',
      label: 'Condition',
      options: [
        {
          name: 'REASONABLE',
          label: 'Insulation is in at least a reasonable condition',
        },
        {
          name: 'NOT_REASONABLE',
          label: 'Insulation not in a reasonable condition',
        },
        {
          name: 'NO_GAPS',
          label:
            'Insulation has no gaps other than clearances where required (e.g. around older style downlights and chimney flues)',
        },
        {
          name: 'NOT_ACCESSIBLE',
          label: 'Ceiling space is not accessible',
        },
      ],
    },
    refConf: {
      required: {
        value: true,
        message: 'Celiling type must have at least one option checked',
      },
    },
    inners: [
      {
        type: 'String',
        key: 'ceilingConditionReason',
        showOn: {
          key: 'ceilingTypes',
          values: ['NOT_REASONABLE'],
        },
        fieldProps: {
          name: 'ceilingConditionReason',
          label: '(specify):',
          placeholder: '',
          multiline: true,
          rowsMax: 6,
          margin: 'dense',
          style: {
            marginTop: 0,
          },
        },
        refConf: {
          required: {
            value: true,
            message:
              'You must explain why ceiling insualtion is not in a resoanable condition',
          },
        },
      },
    ],
  }} />
</Playground>

## CheckboxText

ToDo: While we can set a type for this, i actually havnt implemenmted this yet

## putting it all together

is frodo =)

<Playground>

<FormCreator
config={[...INSULATION_FORM_CONF]}
onSubmit={(d) => alert(d ? JSON.stringify(d): d)}
/>

</Playground>
