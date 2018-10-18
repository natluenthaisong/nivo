/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { TransitionMotion, spring } from 'react-motion'
import setDisplayName from 'recompose/setDisplayName'
import { Container, SvgWrapper, Grid, CartesianMarkers } from '@nivo/core'
import { Axes } from '@nivo/axes'
import { BoxLegendSvg } from '@nivo/legends'
import enhance from './enhance'
import { ScatterPlotPropTypes } from './props'
import ScatterPlotItem from './ScatterPlotItem'

const ScatterPlot = ({
    data,

    computedData,

    margin,
    width,
    height,
    outerWidth,
    outerHeight,

    axisTop,
    axisRight,
    axisBottom,
    axisLeft,

    enableGridX,
    enableGridY,

    markers,

    theme,
    getColor,

    getSymbolSize,

    animate,
    motionStiffness,
    motionDamping,

    isInteractive,
    tooltipFormat,
    tooltip,
    onClick,
    onMouseEnter,
    onMouseLeave,

    legends,
}) => {
    const { xScale, yScale } = computedData

    const motionProps = {
        animate,
        motionDamping,
        motionStiffness,
    }
    const springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    const legendData = data.map(serie => ({
        id: serie.id,
        label: serie.id,
        color: getColor(serie),
    }))

    const symbols = computedData.series.reduce(
        (agg, serie) => [
            ...agg,
            ...serie.data.map((d, i) => ({
                id: `${serie.id}.${i}`,
                x: d.position.x,
                y: d.position.y,
                color: getColor(serie),
                data: { ...d.data, serie: serie.id, id: `${serie.id}.${i}` },
            })),
        ],
        []
    )

    return (
        <Container isInteractive={isInteractive} theme={theme}>
            {({ showTooltip, hideTooltip }) => (
                <SvgWrapper width={outerWidth} height={outerHeight} margin={margin} theme={theme}>
                    <Grid
                        theme={theme}
                        width={width}
                        height={height}
                        xScale={enableGridX ? xScale : null}
                        yScale={enableGridY ? yScale : null}
                        {...motionProps}
                    />
                    <Axes
                        xScale={xScale}
                        yScale={yScale}
                        width={width}
                        height={height}
                        theme={theme}
                        top={axisTop}
                        right={axisRight}
                        bottom={axisBottom}
                        left={axisLeft}
                        {...motionProps}
                    />
                    {!animate &&
                        symbols.map(symbol => (
                            <ScatterPlotItem
                                key={symbol.id}
                                x={symbol.x}
                                y={symbol.y}
                                size={getSymbolSize(symbol.data)}
                                color={symbol.color}
                                data={symbol.data}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                tooltipFormat={tooltipFormat}
                                tooltip={tooltip}
                                onClick={onClick}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                theme={theme}
                            />
                        ))}
                    {animate === true && (
                        <TransitionMotion
                            styles={symbols.map(symbol => ({
                                key: symbol.id,
                                data: symbol,
                                style: {
                                    x: spring(symbol.x, springConfig),
                                    y: spring(symbol.y, springConfig),
                                },
                            }))}
                        >
                            {interpolatedStyles => (
                                <g>
                                    {interpolatedStyles.map(({ key, style, data: symbol }) => (
                                        <ScatterPlotItem
                                            key={key}
                                            x={style.x}
                                            y={style.y}
                                            size={getSymbolSize(symbol.data)}
                                            color={symbol.color}
                                            data={symbol.data}
                                            showTooltip={showTooltip}
                                            hideTooltip={hideTooltip}
                                            tooltipFormat={tooltipFormat}
                                            tooltip={tooltip}
                                            onClick={onClick}
                                            onMouseEnter={onMouseEnter}
                                            onMouseLeave={onMouseLeave}
                                            theme={theme}
                                        />
                                    ))}
                                </g>
                            )}
                        </TransitionMotion>
                    )}
                    <CartesianMarkers
                        markers={markers}
                        width={width}
                        height={height}
                        xScale={xScale}
                        yScale={yScale}
                        theme={theme}
                    />
                    {legends.map((legend, i) => (
                        <BoxLegendSvg
                            key={i}
                            {...legend}
                            containerWidth={width}
                            containerHeight={height}
                            data={legendData}
                            theme={theme}
                        />
                    ))}
                </SvgWrapper>
            )}
        </Container>
    )
}

ScatterPlot.propTypes = ScatterPlotPropTypes

export default setDisplayName('ScatterPlot')(enhance(ScatterPlot))
