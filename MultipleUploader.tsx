import { FormGroup } from '@material-ui/core'
import * as React from 'react'
import { IFieldProps } from './IField'
import Uploader from './Uploader'

/**
 * マルチ画像アップローダーのプロパティのインターフェース
 */
interface IMultipleUploaderProps extends IFieldProps {
    imageCount: number
}

/**
 * マルチ画像アップローダー
 */
const MultipleUploader = React.memo<IMultipleUploaderProps>(props => {
    const { imageCount, field, readonly, setFieldValue } = props
    const items = []
    for (let i = 0; i < imageCount; i++) {
        const filePath =
            field.value && field.value[i] ? field.value[i].file_path : ''
        const oneField = {
            name: `${field.name}[${i}]`,
            value: filePath || ''
        }

        items.push(
            <Uploader
                field={oneField}
                readonly={readonly}
                key={i}
                setFieldValue={setFieldValue}
            />
        )
    }

    return (
        <div>
            <FormGroup row>{items}</FormGroup>
        </div>
    )
})

export default MultipleUploader
