
export interface TopoSortOptions<T> {
	/**
	 * Node to start on. @todo support multiple starting nodes.
	 */
	start: T;

	/**
	 * Returns a list of all neighbors of the given node.
	 * @todo support hashing to determine same node.
	 */
	neighbors: (node: T) => T[];
}

/**
 * Returns a topologically sorted list of nodes that can
 * be reached from the given starting node. Kahn's algorithm.
 */
export function topoSort<TNode>(options: TopoSortOptions<TNode>) {
	const L: TNode[] = [];
	const tempMarks = new Set<TNode>();
	const permMarks = new Set<TNode>();
	const discoveredNodes: Set<TNode> = new Set();
	function visit(node: TNode) {
		if (permMarks.has(node)) {
			return;
		} else if (tempMarks.has(node)) {
			throw new Error("Not a DAG, can't topo-sort");
		}
		tempMarks.add(node);
		const neighbors = options.neighbors(node);
		for (const n of neighbors) {
			visit(n);
		}
		tempMarks.delete(node);
		permMarks.add(node);
		discoveredNodes.delete(node);
		L.unshift(node);
	}
	const nodes = bfTraverse({ start: options.start, neighbors: options.neighbors });
	let nextNode = nodes.next().value;
	while (nextNode != undefined) {
		discoveredNodes.add(nextNode.node);
		const noMarks = discoveredNodes.values();
		let noMark = noMarks.next().value;
		while (noMark != undefined) {
			visit(noMark);
			noMark = noMarks.next().value;
		}
		nextNode = nodes.next().value;
	}
	return L;
}

export interface BFTraverseOptions<T> {
	/**
	 * Starting node for graph traversal
	 */
	start: T;

	/**
	 * Gets a list of all neighbors of the given node.
	 * @todo support hashing to determine same node.
	 */
	neighbors: (node: T) => T[];

	/**
	 * If true, populate all paths for each discovered node. This
	 * Option can be considerably more expensive and requires the
	 * graph to be acyclic.
	 */
	allPaths?: boolean;
}
/**
 * Stores the path to a single node. If allPaths was enabled, also
 * includes a list of all possible paths.
 */
export interface BFTraverseResult<T> {
	/**
	 * Shortest path to the node
	 */
	shortestPath: T[];

	/**
	 * All possible paths to the node
	 */
	allPaths: T[][];

	/**
	 * The node
	 */
	node: T;
}

/**
 * Returns a generator that traverses a graph lazily,
 * generating each discoverable node and the shortest
 * path to that node
 * @param options 
 */
export function* bfTraverse<TNode>(options: BFTraverseOptions<TNode>): Generator<BFTraverseResult<TNode>> {
	function reconstructAllPaths(node: TNode | undefined): TNode[][] {
		if (node == undefined) {
			return [];
		}
		const parents = allParents.get(node) ?? [];
		if (parents.length === 0) {
			return [[node]];
		} else {
			const parents = allParents.get(node) ?? [];
			const newPaths: TNode[][] = [];
			for (const parent of parents) {
				const parentPaths = reconstructAllPaths(parent);
				newPaths.push(...parentPaths.map(pp => pp.concat([node])));
			}
			return newPaths;
		}
	}
	function reconstructPath(node: TNode) {
		let nextNode: TNode | undefined = node;
		const allPaths = options.allPaths ? reconstructAllPaths(node) : [];
		const shortestPath: TNode[] = [];
		while (nextNode != undefined) {
			shortestPath.unshift(nextNode);
			nextNode = currentParents.get(nextNode);
		}
		return { shortestPath, allPaths, node };
	}
	const q: TNode[] = [];
	const visited: Set<TNode> = new Set();
	q.push(options.start);
	const currentParents: Map<TNode, TNode | undefined> = new Map();
	const allParents: Map<TNode, TNode[]> = new Map();
	currentParents.set(options.start, undefined);
	allParents.set(options.start, []);
	while (q.length > 0) {
		const x = q.shift()!;
		if (!visited.has(x)) {
			visited.add(x);
			yield reconstructPath(x);
			const neighbors = options.neighbors(x);
			for (const neighbor of neighbors) {
				q.push(neighbor);
				if (!currentParents.has(neighbor)) {
					allParents.set(neighbor, [x]);
					currentParents.set(neighbor, x);
				} else {
					allParents.get(neighbor)?.push(x);
				}
			}
		}
	}
}
export interface BFSOptions<T> {
	/**
	 * Returns true if the given node is a target node
	 */
	isEnd: (node: T) => boolean;

	/**
	 * The starting node
	 */
	start: T;

	/**
	 * Give a node, return a list of all its neighbors.
	 * @todo Support hashing to determine same node
	 */
	neighbors: (node: T) => T[];

	/**
	 * If true, discover all paths to target node. May
	 * take significantly longer to compute and requires
	 * the graph to be acyclic.
	 */
	allPaths?: boolean;
}

/**
 * Performs a breadth-first search on the graph defined
 * by the starting node and neighbors functions, looking
 * for the end node. Once found, the node is returned
 * along with the shortest path to reach it.
 * @param options 
 */
export function bfSearch<TNode>(options: BFSOptions<TNode>): BFTraverseResult<TNode> | undefined {
	const traversal = bfTraverse({ start: options.start, neighbors: options.neighbors, allPaths: options.allPaths });
	let endNode: BFTraverseResult<TNode> | undefined = undefined;
	for (const n of traversal) {
		if (options.isEnd(n.node)) {
			if (!options.allPaths) {
				return n;
			} else {
				endNode = n;
			}
		}
	}
	return endNode;
}

// Run tests if this file is executed directly.
if (require.main === module) {
	function getNeighbors(n: number) {
		switch (n) {
			case 5:
				return [7, 3, 11];
			case 7:
				return [11, 8];
			case 3:
				return [8, 10];
			case 11:
				return [2, 9, 10];
			case 8:
				return [9];
			case 2:
				return [];
			case 9:
				return [];
			case 10:
				return [];
		}
		throw new Error("unknown node");
	}
	const nodes = Array.from(
		bfTraverse({
			start: 5,
			neighbors: getNeighbors,
			allPaths: true,
		})
	);
	console.log(
		Array.from(nodes)
			.map(n => n.node)
			.join(", ")
	);
	const sorted = topoSort({ start: 5, neighbors: getNeighbors });
	console.log(sorted.join(", "));
}
