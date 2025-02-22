"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    rectSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface Item {
    id: string;
    width: number;
    height: number;
}

const initialItems: Item[] = Array.from({ length: 20 }, (_, i) => ({
    id: `Item ${i + 1}`,
    width: (i % 4 + 1) * 100, // Define larguras variadas
    height: ((i % 3) + 1) * 100, // Define alturas variadas
}));

export default function DragAndDropPage() {
    const [items, setItems] = useState<Item[]>(initialItems);

    // Sensores para detectar arrasto via mouse ou teclado
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    // Função chamada ao soltar um item
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((prev) => {
                const oldIndex = prev.findIndex(item => item.id === active.id);
                const newIndex = prev.findIndex(item => item.id === over?.id);
                return arrayMove(prev, oldIndex, newIndex); // Reorganiza os itens
            });
        }
    };

    // Função chamada ao redimensionar um item
    const handleResize = (id: string, width: number, height: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, width, height } : item
            )
        );
    };

    return (
        <div className="flex flex-col items-center w-screen h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Drag, Drop e Resize</h1>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-4 gap-4 w-full h-full auto-rows-[minmax(100px,_1fr)]"> {/* Define um layout de grade responsivo */}
                        {items.map((item) => (
                            <SortableItem key={item.id} id={item.id} width={item.width} height={item.height} onResize={handleResize} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

// Componente para cada item "arrastável e redimensionável"
interface SortableItemProps {
    id: string;
    width: number;
    height: number;
    onResize: (id: string, width: number, height: number) => void;
}

function SortableItem({ id, width, height, onResize }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <ResizableBox
            width={width}
            height={height}
            axis="both"
            minConstraints={[100, 100]}
            maxConstraints={[400, 400]}
            onResizeStop={(e, data) => onResize(id, data.size.width, data.size.height)}
        >
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-blue-500 text-white rounded-lg cursor-pointer shadow-md text-center flex items-center justify-center w-full h-full"
            >
                {id}
            </div>
        </ResizableBox>
    );
}
