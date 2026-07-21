export type GraphNodeShape = {
  id: string;
  x: number;
  y: number;
  hub?: boolean;
  leaf?: boolean;
};

export type GraphNode = GraphNodeShape & {
  label: string;
  path: string;
  body: string;
  caption: string;
};

export type GraphEdge = [source: string, target: string];

// Real vault node names, two levels deep — mirrors the approved mockup 1:1.
// Structural layout only; label/path/body/caption come from translations
// (messages/*.json, "Graph" namespace) so the example vault reads naturally
// in each locale.
export const graphNodeShapes: GraphNodeShape[] = [
  { id: "mind", x: 210, y: 215, hub: true },
  { id: "projetos", x: 95, y: 130 },
  { id: "tarefas", x: 335, y: 115 },
  { id: "estudos", x: 55, y: 275 },
  { id: "pessoal", x: 345, y: 300 },
  { id: "conhecimentos", x: 214, y: 100 },
  { id: "hobby", x: 25, y: 70, leaf: true },
  { id: "empresa", x: 130, y: 30, leaf: true },
];

export const graphEdges: GraphEdge[] = [
  ["mind", "projetos"],
  ["mind", "tarefas"],
  ["mind", "estudos"],
  ["mind", "pessoal"],
  ["mind", "conhecimentos"],
  ["projetos", "hobby"],
  ["projetos", "empresa"],
  ["empresa", "tarefas"],
];
