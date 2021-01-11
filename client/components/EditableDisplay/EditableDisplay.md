---
name: EditableDisplay
menu: Components
---

import { Playground, Props } from 'docz'
import EditableDisplay from "./index"
import PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF from '../../lib/configs/editableDisplays/propertyDetails'

# EditableDisplay

- There are two components to use. `EditableDisplay` for single use, and `EditableDisplayItems` for multiple items in a config

## EditableDisplay (single)

<Playground>
    <EditableDisplay
        item={{
            type: 'Money',
            key: 'rent',
            value: 420.00,
            label: 'Created At',
            editable: false,
            fieldProps: {},
        }}
    />
</Playground>

## EditableDisplayItems (multiple)

<Playground>
    <EditableDisplayItems
        __typename="Property"
        data={{
            rent: 420.00
        }}
        items={PROPERTY_DETAILS_EDITABLE_DISPLAY_CONF}
        where={{ id: "some-property-id" }}
    />
</Playground>
