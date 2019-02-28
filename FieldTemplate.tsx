import { ErrorMessage } from 'formik'
import * as React from 'react'
import { FormSteps } from '../IForm'
import { IFieldProps } from './IField'

/**
 * IFieldPropsから不要なpropsを削除した型
 */
type PartialProps = Pick<
    IFieldProps,
    Exclude<keyof IFieldProps, 'field' | 'readonly'>
>

/**
 * フィールドテンプレートPropsのインターフェース
 */
interface IFieldTemplateProps extends PartialProps {
    label: string
    name: string
    required?: boolean
    step?: number
    noSeparator?: boolean
}

/**
 * フィールドのテンプレートコンポーネント
 */
const FieldTemplate = React.memo<IFieldTemplateProps>(props => {
    const {
        children,
        label,
        name,
        noSeparator,
        required,
        setFieldValue,
        step
    } = props

    return (
        <>
            <div className="field">
                <div className="field__label">
                    <label>{label}</label>
                </div>
                <div className="field__required">
                    {required && step === FormSteps.INPUT && (
                        <span className="field__required-button">必須</span>
                    )}
                </div>
                <div className="field__input">
                    {React.cloneElement(children as React.ReactElement<any>, {
                        name,
                        readonly: step !== FormSteps.INPUT,
                        setFieldValue
                    })}
                    <div className="field__error">
                        <ErrorMessage name={name} />
                    </div>
                </div>
            </div>
            {!noSeparator && <hr className="field-separator" />}
        </>
    )
})

export default FieldTemplate
