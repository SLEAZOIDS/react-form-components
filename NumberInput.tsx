import * as React from 'react'
import { IFieldProps } from './IField'
import TextInput from './TextInput'

/**
 * 数字入力のプロパティのインターフェース
 */
interface INumberInputProps extends IFieldProps {
    suffix: string
}

/**
 * 数字入力
 */
const NumberInput = React.memo<INumberInputProps>(props => {
    const { field, readonly, setFieldValue, suffix } = props
    return (
        <>
            <TextInput
                field={field}
                readonly={readonly}
                setFieldValue={setFieldValue}
                type="number"
            />
            <span>{suffix}</span>
        </>
    )
})

export default NumberInput
