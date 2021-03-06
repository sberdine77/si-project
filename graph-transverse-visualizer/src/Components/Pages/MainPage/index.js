import React, {useState, useEffect} from 'react';
import {Graph} from 'react-d3-graph';
import Grafo from '../../../Models/Grafo';

function MainPage() {
	// graph payload (with minimalist structure)

	const [data, setData] = useState({});

	useEffect(() => {
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

		const nodes = [];
		const links = [];

		for(var key in graph.adjacencyList) {
			if(graph.adjacencyList.hasOwnProperty(key)){
				nodes.push({ id: key })
				graph.adjacencyList[key].forEach(child => {
					links.push({ source: `${key}`, target: `${child}` })
				})
			}
		}

		console.log(nodes)
		console.log(links)

		setData({
			nodes: nodes,
			links: links
		});

	}, []);

	// const data = {
	// 	nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
	// 	links: [
	// 	{ source: "Harry", target: "Sally" },
	// 	{ source: "Harry", target: "Alice" },
	// 	],
	// };
	
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
	
	const onClickNode = function(nodeId) {
		window.alert(`Clicked node ${nodeId}`);
	};
	
	const onClickLink = function(source, target) {
		window.alert(`Clicked link between ${source} and ${target}`);
	};

	return(
		<>
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