import * as React from 'react'
import Dropzone from 'react-dropzone'
import { IFieldProps } from './IField'

/**
 *  画像プレビューのスタイル
 */
const imageStyle = {
    display: 'block',
    margin: 10,
    width: 160,
    height: 'auto'
}

/**
 * 画像アップローダーの状態のインターフェース
 */
interface IUploaderState {
    imgSrc: string
}

/**
 * 画像アップローダー
 */
export default class Uploader extends React.PureComponent<
    IFieldProps,
    IUploaderState
> {
    /**
     * コンストラクタ
     */
    public constructor(props: IFieldProps) {
        super(props)
        this.state = {
            imgSrc: props.field.value
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
                        accept="image/*"
                        name={this.props.field.name}
                    >
                        <div>画像をドラックまたはクリック</div>
                        <img src={this.state.imgSrc} style={imageStyle} />
                    </Dropzone>
                ) : (
                    <img src={this.state.imgSrc} style={imageStyle} />
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
                imgSrc: URL.createObjectURL(file)
            })
        })
    }
}
