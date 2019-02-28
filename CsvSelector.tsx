import * as React from 'react'
import Dropzone from 'react-dropzone'
import { IFieldProps } from './IField'

/**
 *  csvプレビューのスタイル
 */
const imageStyle = {
    display: 'block',
    margin: 10,
    width: 160,
    height: 'auto'
}

/**
 * csvアップローダーの状態のインターフェース
 */
interface ICsvSelectorState {
    csvSrc: string
}

/**
 * csvアップローダー
 */
export default class CsvSelector extends React.Component<
    IFieldProps,
    ICsvSelectorState
> {
    /**
     * コンストラクタ
     */
    public constructor(props: IFieldProps) {
        super(props)
        this.state = {
            csvSrc: props.field.value
        }
    }

    /**
     * レンダリング
     */
    public render() {
        return (
            <div>
                {!this.props.readonly ? (
                    <Dropzone
                        onDrop={this.handleDrop}
                        accept="text/csv, application/vnd.ms-excel"
                        name={this.props.field.name}
                    >
                        <div>csvファイルをドラックまたはクリック</div>
                        <img src={this.state.csvSrc} style={imageStyle} />
                    </Dropzone>
                ) : (
                    <img src={this.state.csvSrc} style={imageStyle} />
                )}
            </div>
        )
    }

    /**
     * dropZoneに画像がD&D、もしくはダイアログから選択された時に発火
     * formikにvalueを渡す＋画像プレビューに表示するためにstateにセット
     *
     * @param {File[]} files
     */
    private handleDrop = (files: File[]) => {
        files.map(file => {
            if (this.props.setFieldValue) {
                this.props.setFieldValue(this.props.field.name, file)
            }
            this.setState({
                csvSrc: URL.createObjectURL(file)
            })
        })
    }
}
