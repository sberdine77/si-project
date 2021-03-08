import React, {useState, useEffect} from 'react';
import {Graph} from 'react-d3-graph';
import Grafo from '../../../Models/Grafo';

function MainPage() {
	// graph payload (with minimalist structure)

	
	//const [nodes, setNodes] = useState([]);
	//const [links, setLinks] = useState([]);

	const [data, setData] = useState({});

	var graph = new Grafo();
	graph.addNode(1);
	graph.addNode(2);
	graph.addNode(3);
	graph.addNode(4);
	graph.addNode(5);
	graph.addNode(6);
	graph.addNode(7);
	graph.addNode(8);
	graph.addNode(9);
	graph.addNode(10);

	graph.addLink(1, 2);
	graph.addLink(1, 3);
	graph.addLink(2, 4);
	graph.addLink(2, 5);
	graph.addLink(3, 6);
	graph.addLink(3, 7);
	graph.addLink(4, 8);
	graph.addLink(5, 9);
	graph.addLink(8, 9);
	graph.addLink(9, 10);
	graph.addLink(6, 10);

	useEffect(() => {
		async function load() {
			const nodesTemp = [];
			const linksTemp = [];

			for(var key in graph.adjacencyList) {
				if(graph.adjacencyList.hasOwnProperty(key)){
					nodesTemp.push({ id: key })
					graph.adjacencyList[key].forEach(child => {
						linksTemp.push({ source: `${key}`, target: `${child}` })
					})
				}
			}

			// await setNodes(nodesTemp);
			// await setLinks(linksTemp);

			setData({
				nodes: nodesTemp,
				links: linksTemp
			});
		}
		load();
	}, []);

	// the graph configuration, just override the ones you need
	const myConfig = {
		nodeHighlightBehavior: true,
		directed: true,
		node: {
		color: "lightgreen",
		size: 120,
		highlightStrokeColor: "blue",
		},
		link: {
		highlightColor: "lightblue",
		},
	};

	function sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
		  currentDate = Date.now();
		} while (currentDate - date < milliseconds);
	}
	
	const onClickNode = function(nodeId) {
		window.alert(`Clicked node ${nodeId}`);
	};
	
	const onClickLink = function(source, target) {
		window.alert(`Clicked link between ${source} and ${target}`);
	};
	
	const onClickDFS = async () => {
		const path = graph.dfs(1);
		console.log(path);
		var tempNodes = data.nodes;
		for(var i in path) {
			for (var j in data.nodes) {
				console.log(data.nodes[j])
				console.log("------")
				if(parseInt(data.nodes[j].id) === path[i]) {
					tempNodes[j] = {
						...data.nodes[j],
						color: "red"
					}
				} else {
					tempNodes[j] = data.nodes[j]
				}
			}
			// tempNodes.push(data.nodes.map(node => {
			// 	if((parseInt(node.id)) === path[i]) {
			// 		console.log((parseInt(node.id)))
			// 		console.log(path[i])
			// 		tempNodes[i] = {
			// 			...node,
			// 			color: "red"
			// 		}
			// 		return {
			// 			...node,
			// 			color: "red"
			// 		}
			// 	} else {
			// 		tempNodes[i] = node
			// 		return node
			// 	}
			// }))

			//await setNodes(tempNodes)

			// setNodes((prev) => ({...prev, nodes: tempNodes}))

			// setData((prev) => ({...prev, nodes: tempNodes}))

			// await setData((prev) => ({...prev, nodes: prev.nodes.map(object => {
			// 	if(path[i] === (parseInt(object.id))) {
			// 		console.log("red")
			// 		return {
			// 			...object,
			// 			color: "red"
			// 		}
			// 	} else {
			// 		return object;
			// 	}
			// }) }));
		}

		setData(
			((prev) => ({...prev, nodes: data.nodes})),
			() => {
				const context = {
					tempNodes,
					nodes: data.nodes
				}
				runRecursively(context.nodes, context)
			}
		);
		
	}

	const runRecursively = (newNodes, context) => {
		const { processing } = context.tempNodes
		setData((prev) => ({...prev, nodes: newNodes}), async () => {
			const item = processing.shift()
			context.nodes = await delay(item, context)
			if(processing.length > 0) {
				runRecursively(context.nodes, context);
			} else {
				finalizeProcess(context)
			}
		})
	}

	const delay = async (item, context) => {
		return new Promise((resolve) => {
			context.nodes.map(node => {
				if(node.id === item.id) {
					return {
						...node,
						color: "red"
					}
				} else {
					return node
				}
			})
			setTimeout(() => {
			  resolve(context.nodes);
			}, 3000);
		});
	}

	const finalizeProcess = (context) => {
		setData((prev) => ({...prev, nodes: context.nodes}))
	}

	const onClickBFS = () => {
		
	}

	return(
		<>
			<button onClick={onClickDFS}>DFS</button>
			<button onClick={onClickBFS}>BFS</button>
			<Graph
				id="graph-id" // id is mandatory
				data={data}
				config={myConfig}
				onClickNode={onClickNode}
				onClickLink={onClickLink}
			/>
		</>
	);
}

export default MainPage;