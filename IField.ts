/**
 * formikフィールドのPropsインターフェース
 */
export interface IFieldProps {
    field: { [value: string]: any }
    readonly: boolean
    setFieldValue?: (
        arg1: string,
        arg2: number | string | object | File
    ) => void
}

/**
 *  マスターデータのインタフェース
 */
export interface IItem {
    id: number
    name: string
}
