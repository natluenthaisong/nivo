import * as React from 'react'
import { Dimensions, Box, Theme, MotionProps, ColorProps } from '@nivo/core'
import { LegendProps } from '@nivo/legends'
import { Scale } from '@nivo/scales'
import { Axis } from '@nivo/axes'

declare module '@nivo/line' {
    export interface LineDatum {
        x?: string | number | Date | null
        y?: string | number | Date | null
        [key: string]: any
    }

    export interface LineSerieData {
        id: string | number
        data: LineDatum[]
        [key: string]: any
    }

    export interface LineComputedSerieData {
        id: string | number
        data: Array<{
            position: {
                x: number
                y: number
            }
            data: LineDatum
        }>
        color?: string
        [key: string]: any
    }

    export interface LineProps extends ColorProps<LineComputedSerieData> {
        data: LineSerieData[]

        xScale?: Scale
        yScale?: Scale

        margin?: Box

        curve?: 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'stepBefore' | 'step' | 'stepAfter'
        lineWidth?: number

        theme?: Theme

        axisTop?: Axis
        axisRight?: Axis
        axisBottom?: Axis
        axisLeft?: Axis

        enableGridX?: boolean
        enableGridY?: boolean

        enableDots?: boolean
        dotSize?: number
        dotColor?: any
        dotBorderWidth?: number
        dotBorderColor?: any
        enableDotLabel?: boolean

        enableArea?: boolean
        areaOpacity?: number
        areaBaselineValue?: number | string | Date

        markers?: Array<{
            axis: 'x' | 'y'
            value: string | number | Date
            legend?: string
            lineStyle?: object
            textStyle?: object
        }>

        isInteractive?: boolean
        enableStackTooltip?: boolean

        legends?: LegendProps[]
    }

    export interface LineSvgProps extends LineProps, MotionProps {}

    export class Line extends React.Component<LineSvgProps & Dimensions> {}
    export class ResponsiveLine extends React.Component<LineSvgProps> {}
}
