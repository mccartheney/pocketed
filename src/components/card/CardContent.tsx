"use client"
import { useState } from "react"
import CardActions from "./CardActions"
import CardEconomies from "./CardEconomies"
import CardMensalExpenses from "./CardMensalExpenses"
import CardStats from "./CardStats"
import CardUniqueExpenses from "./CardUniqueExpenseGraph"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const CardContent = () => {

    const placeholderLayout = [
        [
            {
                item: CardUniqueExpenses,
                name: "Card unique expenses",
                size: 75,
                height : 75
            },
            {
                item: CardMensalExpenses,
                name: "Card Mensal Expenses",
                size: 25,
                height: 75

            }
        ],
        [
            {
                item: CardStats,
                name: "Card status",
                size: 25,
                height: 25

            },
            {
                item: CardEconomies,
                name: "Card Economies",
                size: 75,
                height: 25

            }
        ]
    ]

    return (
        <div className=" flex flex-col w-full h-full">
            <CardActions />

            <PanelGroup direction="vertical" className="py-2">
                {placeholderLayout.map((row, index) =>
                    <>
                        <Panel key={index} maxSize={row[0].height} minSize={row[0].height}>
                            <PanelGroup key={index} direction="horizontal">
                                {
                                    row.map((column, colIndex) => (
                                        <>
                                            <Panel key={colIndex} maxSize={column.size} minSize={column.size}>
                                                <column.item />
                                            </Panel>
                                            {colIndex < row.length - 1 && (
                                                <PanelResizeHandle>
                                                    <div className="w-2"></div>
                                                </PanelResizeHandle>
                                            )}
                                        </>
                                    ))
                                }
                            </PanelGroup>
                        </Panel>
                        {index < placeholderLayout.length - 1 && (
                            <PanelResizeHandle>
                                <div className="h-2"></div>
                            </PanelResizeHandle>
                        )}
                    </>
                )}
            </PanelGroup>
        </div>


    )
}

export default CardContent