// import React, { useState, useCallback, useEffect } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   removeElements,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
// } from 'react-flow-renderer';
// import ELK from 'elkjs/lib/elk.bundled.js';

// const elk = new ELK();
// export function GetLayoutedElements(nodes, edges, direction = 'DOWN') {
//   const elkOptions = {
//     'elk.algorithm': 'layered',
//     'elk.direction': direction,
//     'elk.spacing.nodeNodeBetweenLayers': '50',
//     'elk.spacing.nodeNode': '50',
//     'elk.layered.spacing.nodeNode': '50',
//     'elk.spacing.edgeNode': '20',
//   };

//   const graph = {
//     id: 'root',
//     layoutOptions: elkOptions,
//     children: nodes.map((node) => ({ id: node.id, width: node.width || 150, height: node.height || 50 })),
//     edges: edges.map((e) => ({ id: e.id, sources: [e.source], targets: [e.target] })),
//   };

//   return elk.layout(graph).then((layoutedGraph) => {
//     const layoutedNodes = layoutedGraph.children.map((n) => {
//       const matched = nodes.find((nd) => nd.id === n.id);
//       return { ...matched, position: { x: n.x, y: n.y } };
//     });
//     return { nodes: layoutedNodes, edges };
//   });
// }

// export default function ExactLinkFlow() {
//   const [tool, setTool] = useState('email');
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [rfInstance, setRfInstance] = useState(null);

//   useEffect(() => {
//     if (nodes.length > 0) {
//       getLayoutedElements(nodes, edges).then(({ nodes: ln, edges: le }) => {
//         setNodes(ln);
//         setEdges(le);
//       });
//     }
//   }, [nodes.length, edges.length]);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

//   const onCanvasClick = useCallback(
//     (event) => {
//       if (!rfInstance) return;
//       const point = rfInstance.project({ x: event.clientX, y: event.clientY });
//       const id = `node_${+new Date()}`;
//       const newNode = {
//         id,
//         type: 'default',
//         data: { label: tool === 'email' ? 'Email' : tool === 'contact' ? 'Contact' : 'Node' },
//         position: { x: point.x, y: point.y },
//         width: 150,
//         height: 50,
//       };
//       setNodes((nds) => [...nds, newNode]);
//     },
//     [tool, rfInstance]
//   );

//   const removeNode = (id) => {
//     setNodes((nds) => nds.filter((n) => n.id !== id));
//     setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
//   };

//   const clearAll = () => {
//     setNodes([]);
//     setEdges([]);
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
//       {/* Sidebar */}
//       <aside style={{ width: 220, background: '#f9fafb', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, borderRight: '1px solid #e5e7eb' }}>
//         <h3 style={{ fontWeight: 600 }}>Tools</h3>
//         {['email', 'contact', 'node'].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTool(t)}
//             style={{
//               padding: '8px',
//               background: tool === t ? '#dbeafe' : '#fff',
//               borderRadius: 6,
//               border: '1px solid #cbd5e1',
//               cursor: 'pointer',
//               textAlign: 'left',
//             }}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//         <button onClick={clearAll} style={{ marginTop: 'auto', padding: '8px', background: '#fee2e2', color: '#b91c1c', borderRadius: 6, border: '1px solid #fca5a5', cursor: 'pointer' }}>Clear All</button>
//       </aside>

//       {/* Canvas */}
//       <div style={{ flexGrow: 1, background: '#f3f4f6' }} onClick={onCanvasClick}>
//         <ReactFlowProvider>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onLoad={setRfInstance}
//             fitView
//             connectionLineStyle={{ stroke: '#60a5fa', strokeWidth: 2 }}
//             nodeTypes={{
//               default: ({ data }) => (
//                 <div style={{ padding: 10, borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', fontSize: 14 }}>
//                   {data.label}
//                 </div>
//               )
//             }}
//           >
//             <Background color="#e5e7eb" gap={20} />
//             <Controls />
//           </ReactFlow>
//         </ReactFlowProvider>
//       </div>
//     </div>
//   );
// }
