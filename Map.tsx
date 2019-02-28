import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import * as React from 'react'
import ReactGoogleMap from 'react-google-map'
import ReactGoogleMapLoader from 'react-google-maps-loader'
import { IFieldProps } from './IField'

/**
 * API KEY
 *
 * @type {string}
 */
const API_KEY = {API_KEY}

/**
 * 地図の倍率（大きいほど狭い）
 * @type {number}
 */
const ZOOM = 16

/**
 * 地図のスタイル
 * @returns {StyleRules<string>}
 */
const styles = () =>
    createStyles({
        map: {
            height: 350,
            width: 600
        }
    })

/**
 * マップの状態インターフェース
 */
interface IMapState {
    lat: number
    lng: number
}

/**
 * Google Map
 */
class Map extends React.PureComponent<
    IFieldProps & WithStyles<typeof styles>,
    IMapState
> {
    /**
     * コンストラクタ
     */
    public constructor(props: IFieldProps & WithStyles<typeof styles>) {
        super(props)
        this.state = {
            lat: props.field.value.lat,
            lng: props.field.value.lng
        }
    }

    /**
     * レンダリング
     */
    public render() {
        const { classes, field, readonly } = this.props
        const { lat, lng } = this.state
        return (
            <div className={classes.map}>
                <ReactGoogleMapLoader
                    params={{
                        key: API_KEY
                    }}
                    render={(googleMaps: any) => {
                        return (
                            googleMaps && (
                                <ReactGoogleMap
                                    googleMaps={googleMaps}
                                    center={field.value}
                                    zoom={ZOOM}
                                    coordinates={[
                                        {
                                            position: field.value,
                                            onLoaded: (
                                                googleMap: any,
                                                map: google.maps.Map,
                                                marker: google.maps.Marker
                                            ) => {
                                                this.handleMapClick(
                                                    googleMap,
                                                    map,
                                                    marker
                                                )
                                            }
                                        }
                                    ]}
                                />
                            )
                        )
                    }}
                />
                {readonly ? (
                    <>
                        緯度
                        <label>{lat}</label>
                        経度
                        <label>{lng}</label>
                    </>
                ) : (
                    <>
                        緯度
                        <TextField
                            value={lat}
                            onChange={this.handleLatitudeChange}
                        />
                        経度
                        <TextField
                            value={lng}
                            onChange={this.handleLongitudeChange}
                        />
                    </>
                )}
            </div>
        )
    }

    /**
     * マップクリック時に座標を設定する
     */
    private handleMapClick = (
        googleMap: any,
        map: google.maps.Map,
        marker: google.maps.Marker
    ) => {
        googleMap.event.addListener(map, 'click', (e: any) => {
            if (this.props.readonly) {
                return
            }

            // クリックした位置にマーカを移動
            marker.setPosition(e.latLng)

            // 小数点第6までに丸める
            const lat = Math.round(e.latLng.lat() * 1000000) / 1000000
            const lng = Math.round(e.latLng.lng() * 1000000) / 1000000

            // 座標更新
            this.setState({ lat, lng })
            if (this.props.setFieldValue) {
                this.props.setFieldValue(this.props.field.name, { lat, lng })
            }
        })
    }

    /**
     * テキストボックスから緯度の値が変わった時実行
     */
    private handleLatitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const lat = Number(event.currentTarget.value)

        this.setState({
            lat
        })
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, {
                lat,
                lng: this.state.lng
            })
        }
    }

    /**
     * テキストボックスから経度の値が変わった時実行
     */
    private handleLongitudeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const lng = Number(event.currentTarget.value)

        this.setState({
            lng
        })
        if (this.props.setFieldValue) {
            this.props.setFieldValue(this.props.field.name, {
                lat: this.state.lat,
                lng
            })
        }
    }
}

export default withStyles(styles)(Map)
