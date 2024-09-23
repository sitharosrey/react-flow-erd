'use client'

import React, { useCallback, useState } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define the ERD elements (tables and relationships as nodes and edges)
// Each node will have columns displayed under the table name
const initialNodes = [
    {
        id: '1',
        data: {
            label: (
                <div>
                    <strong>Users</strong>
                    <ul>
                        <li className="text-left">id: int</li>
                        <li className="text-left">name: varchar</li>
                        <li className="text-left">email: varchar</li>
                        <li className="text-left">created_at: timestamp</li>
                    </ul>
                </div>
            )
        },
        position: { x: 250, y: 5 }
    },
    {
        id: '2',
        data: {
            label: (
                <div>
                    <strong>Orders</strong>
                    <ul className="text-left">
                        <li>id: int</li>
                        <li>user_id: int</li>
                        <li>product_id: int</li>
                        <li>order_date: date</li>
                    </ul>
                </div>
            )
        },
        position: { x: 100, y: 100 }
    },
    {
        id: '3',
        data: {
            label: (
                <div>
                    <strong>Products</strong>
                    <ul className="text-left">
                        <li>id: int</li>
                        <li>name: varchar</li>
                        <li>price: decimal</li>
                        <li>stock: int</li>
                    </ul>
                </div>
            )
        },
        position: { x: 400, y: 100 }
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: false, label: '1:n' },
    { id: 'e2-3', source: '2', target: '3', animated: false, label: 'n:m' },
];

function Page() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default Page;